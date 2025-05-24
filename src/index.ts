import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

function enviarEmail() {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_TO,
        subject: 'Lembrete a cada 1 minuto',
        text: 'Este é um lembrete automático enviado a cada 1 minuto.'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erro ao enviar email:', error);
        } else {
            console.log('Email enviado:', info.response);
        }
    });
}

setInterval(enviarEmail, 1 * 60 * 1000);
enviarEmail(); // Envia o primeiro imediatamente