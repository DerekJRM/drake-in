import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // o el nombre exacto que uses
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const apiRest = {

    // ================================= HORARIOS =================================

    // Listar todos los horarios
    getHorarios: async () => {
        const res = await api.get("/findAllHorarios");
        return res.data;
    },

    // Obtener un horario por id
    getHorarioById: async (id) => {
        const res = await api.get("/findHorarioById", { params: { id } });
        return res.data;
    },

    // Crear o actualizar un horario (tu método save unifica ambos)
    saveHorario: async (horario) => {
        const res = await api.post("/saveHorario", horario);
        return res.data;
    },

    // Eliminar un horario por id
    deleteHorario: async (id) => {
        const res = await api.delete("/deleteHorarioById", { params: { id } });
        return res.data;
    },

    // ================================= OPERADORES =================================

    getOperadores: async () => {
        const res = await api.get("/findAllOperadores");
        return res.data;
    },

    getOperadoresByTipo: async (tipo) => {
        const res = await api.get("/findOperadoresByTipo", { params: { tipo } });
        return res.data;
    },

    getOperadorById: async (id) => {
        const res = await api.get("/findOperadorById", { params: { id } });
        return res.data;
    },

    findTipoOperadorByUsuarioId: async (usuarioId) => {
        const res = await api.get("/findTipoOperadorByUsuarioId", { params: { id: usuarioId } });
        return res.data;
    },

    saveOperador: async (operador) => {
        const res = await api.post("/saveOperador", operador);
        return res.data;
    },

    deleteOperador: async (id) => {
        const res = await api.delete("/deleteOperadorById", { params: { id } });
        
        return res.data;
    },

    getOperadorByUsuarioId: async (id) => {
        const res = await api.get("/findOperadorByUsuarioId", { params: { id } });
        return res.data; 
    },

    // ================================= RESERVAS =================================

    getReservas: async () => {
        const res = await api.get("/findAllReservas");
        return res.data;
    },

   getReservasByRuta: async (rutaId) => {
        const res = await api.get("/findReservasByRutaId", { params: { rutaId } });
        return res.data;
    },

    getReservaById: async (id) => {
        const res = await api.get("/findReservaById", { params: { id } });
        return res.data;
    },
    
    saveReserva: async (pasajero) => {
        const res = await api.post("/saveReserva", pasajero);
        return res.data;
    },

    deleteReserva: async (id) => {
        const res = await api.delete("/deleteReservaById", { params: { id } });
        return res.data;
    },

    // === NUEVA FUNCIÓN (Para Botes) ===
    getReservasByFecha: async (fecha) => {
        // 'fecha' debe ser un string "YYYY-MM-DD"
        const res = await api.get("/findReservasByFecha", { params: { fecha } });
        // console.log(res.data);
        return res.data;
    },

     // === NUEVA FUNCIÓN (Para Hoteles) ===
    getReservasByFechaAndHotel: async (fecha, hotelId) => {
        const res = await api.get("/findReservasByFechaAndHotel", { params: { fecha, hotelId } });
        return res.data;
    },
    
    // ================================= PUERTOS =================================

    getPuertos: async () => {
        const res = await api.get("/findAllPuertos");
        return res.data;
    },

    getPuertoById: async (id) => {
        const res = await api.get("/findPuertoById", { params: { id } });
        return res.data;
    },

    savePuerto: async (puerto) => {
        const res = await api.post("/savePuerto", puerto);
        return res.data;
    },

    deletePuerto: async (id) => {
        const res = await api.delete("/deletePuertoById", { params: { id } });
        return res.data;
    },

    // ================================= USUARIO =================================

    getUsuarios: async () => {
        const res = await api.get("/findAllUsuarios");
        return res.data;
    },

    getUsuarioById: async (id) => {
        const res = await api.get("/findUsuarioById", { params: { id } });
        return res.data;
    },

    saveUsuario: async (usuario) => {
        const res = await api.post("/saveUsuario", usuario);
        return res.data;
    },

    deleteUsuario: async (id) => {
        const res = await api.delete("/deleteUsuarioById", { params: { id } });
        return res.data;
    }
};

export default apiRest;
