import * as nodemailer from "nodemailer";
import * as dotenv from "dotenv";
import { backendTG, backendPI } from "./apiCalls";
import * as express from "express";
import axios from "axios";

dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Servidor está funcionando");
});

app.listen(PORT, () => {
  console.log(
    `Servidor rodando em ${
      process.env.PING_API_URL || `http://localhost:${PORT}`
    }`
  );
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function ping() {
  try {
    // Pinga a própria API
    const response = await axios.get(
      process.env.PING_API_URL || `http://localhost:${PORT}/`
    );

    console.log(response.data);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: "Lembrete a cada 1 minuto",
      text: "Este é um lembrete automático enviado a cada 1 minuto.",
    };

    // Pinga a API do TG
    const tg = await backendTG();
    console.log("backendTG: ", tg);

    // Pinga a API do PI
    const pi = await backendPI();
    console.log("backendPI: ", pi);

    // Envia o email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email enviado:", info.response);
  } catch (error) {
    console.error("Erro:", error);
  }

  console.log(
    "--------------------------------------------------------------------------------------"
  );
}

console.log("Aplicação iniciada");

setInterval(ping, 1 * 60 * 1000);
ping(); // Envia o primeiro imediatamente
