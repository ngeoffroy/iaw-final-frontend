import axios from "axios";
import {
  denunciasURL,
  loginURL,
  logoutURL,
  changeStatusURL,
  changeAutorizadosURL,
} from "./urls";

export async function loadDenuncias(setDenuncias) {
  const response = await axios.get(denunciasURL);
  setDenuncias(response.data);
}

export const postLogin = async (email, password) => {
  try {
    const response = await axios.post(loginURL, {
      email: email,
      password: password,
    });
    return response;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
  }
};

export const postLogout = async () => {
  try {
    const response = await axios.post(logoutURL);
    return response;
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};

export const postDenuncia = async (data) => {
  try {
    const response = await axios.post(denunciasURL, data);
    return response;
  } catch (error) {
    console.error("Error al enviar una denuncia: ", error);
  }
};

export const changeStatus = async (data) => {
  try {
    const response = await axios.post(
      changeStatusURL(data["id"], data["status"], data)
    );
    return response;
  } catch (error) {
    console.error("Error al cambiar de estado la denuncia: ", error);
  }
};

export const changeAutorizado = async (data) => {
  try {
    const response = await axios.post(
      changeAutorizadosURL(data["id"], data["autorizado"], data)
    );
    return response;
  } catch (error) {
    console.error("Error al cambiar el autorizado de la denuncia: ", error);
  }
};
