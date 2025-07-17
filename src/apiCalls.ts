import axios from "axios";

export async function backendTG() {
  try {
    const response = await axios.get(`${process.env.BACKENDTG_API_URL}`);
    return response.data;
  } catch (erro: any) {
    console.log(erro.message);
  }
}

export async function backendPI() {
  try {
    const response = await axios.get(`${process.env.BACKENDPI_API_URL}`);
    return response.data;
  } catch (erro: any) {
    console.log(erro.message);
  }
}

export async function backendControleEstoqueLumegal() {
  try {
    const response = await axios.get(
      `${process.env.BACKEND_CONTROLE_ESTOQUE_LUMEGAL_API_URL}`
    );
    return response.data;
  } catch (erro: any) {
    console.log(erro.message);
  }
}
