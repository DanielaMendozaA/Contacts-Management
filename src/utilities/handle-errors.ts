import axios, { AxiosError } from 'axios';

function handleAxiosError(error: unknown) {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
      return `Error de servidor: ${error.response.data.message || "Error desconocido"}`;
    } else if (error.request) {
      console.error("Request data:", error.request);
      return "No se recibió respuesta del servidor. Verifica tu conexión de red.";
    } else {
      console.error("Error al configurar la solicitud:", error.message);
      return `Error al configurar la solicitud: ${error.message}`;
    }
  } else {
    console.error("Error desconocido:", error);
    return "Ocurrió un error inesperado.";
  }
}


export default handleAxiosError