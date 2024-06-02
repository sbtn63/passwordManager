import axios from 'axios';

// Configurar interceptor para capturar errores de respuesta
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // Error en la respuesta del servidor (código de estado no 2xx)
      console.log('Response error:', error.response.data);
    } else if (error.request) {
      // No se recibió respuesta del servidor
      console.log('Request error:', error.request);
    } else {
      // Error durante la configuración de la solicitud
      console.log('Request setup error:', error.message);
    }
    console.log('Error config:', error.config);
    return Promise.reject(error);
  }
);

export default axios;

