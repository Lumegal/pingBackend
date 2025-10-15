import * as dotenv from "dotenv";
import {
  backendTG,
  backendPI,
  backendControleEstoqueLumegal,
} from "./apiCalls";
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

async function ping() {
  try {
    // Pinga a própria API
    const response = await axios.get(
      process.env.PING_API_URL || `http://localhost:${PORT}/`
    );

    console.log(response.data);

    // Pinga a API do TG
    const tg = await backendTG();
    console.log("backendTG: ", tg);

    // Pinga a API do PI
    const pi = await backendPI();
    console.log("backendPI: ", pi);

    // Pinga a API do Controle de Estoque Lumegal
    const controleEstoqueLumegal = await backendControleEstoqueLumegal();
    console.log("controleEstoqueLumegal: ", controleEstoqueLumegal);
  } catch (error) {
    console.error("Erro:", error);
  }

  console.log(
    "--------------------------------------------------------------------------------------"
  );
}

console.log("Aplicação iniciada");

setInterval(ping, 5 * 60 * 1000);
ping(); // Envia o primeiro imediatamente
