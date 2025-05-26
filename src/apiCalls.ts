import axios from "axios";


export async function autenticarLoginTG() {
  try {
    const response = await axios.post(
      `${process.env.BACKENDTG_API_URL}/usuario/login`,
      { login: process.env.LOGIN, senha: process.env.SENHA }
    );
    return response.data; // já vem sem senha e _id
  } catch (error: any) {
    throw new Error("Erro ao autenticar usuario", error.message);
  }
}
