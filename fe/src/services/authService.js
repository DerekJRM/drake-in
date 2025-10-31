import axios from "axios";

const authApi = axios.create({
  baseURL: "http://localhost:8080/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

const authRest = {
  register: async (usuario) => {
    const res = await authApi.post(`/register/${usuario.nombre}`, usuario);
    return res.data; // token
  },

  login: async (usuario) => {
    const res = await authApi.post("/login", usuario);
    return res.data; // token
  },
};

export default authRest;
