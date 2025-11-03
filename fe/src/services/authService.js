import axios from "axios";

const authApi = axios.create({
  baseURL: "http://localhost:8080/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

const authRest = {
  register: async (usuario) => {
    try {
      const res = await authApi.post(`/register/${usuario.nombre}`, usuario);
      return res.data; // token
    } catch (error) {
      if (error.response) {
        throw new Error("El correo electrónico ya está en uso. Por favor, utiliza otro correo.");
      } else if (error.request) {
        throw new Error("No se pudo conectar con el servidor. Verifica tu conexión a internet.");
      } else {
        throw new Error("Error al procesar la solicitud");
      }
    }
  },

  login: async (usuario) => {
    const res = await authApi.post("/login", usuario);
    return res.data; // token
  },
};

export default authRest;
