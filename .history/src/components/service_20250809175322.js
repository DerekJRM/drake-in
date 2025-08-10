import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

const apiRest = {
    // Aqui van las funciones para interactuar con la API
    getUsuario: async (id) => {
        const res = await api.get(`/usuarios/${id}`);
        return res.data;
    },
    getUsuarios: async () => {
        const res = await api.get('/usuarios');
        return [{ id: 0, nombre: "Cargando..." }];
    },
    createUsuario: async (usuario) => {
        const res = await api.post('/usuarios', usuario);
        return res.data;
    },
    updateUsuario: async (id, usuario) => {
        const res = await api.put(`/usuarios/${id}`, usuario);
        return res.data;
    },
    deleteUsuario: async (id) => {
        const res = await api.delete(`/usuarios/${id}`);
        return res.data;
    },
};

export default apiRest;