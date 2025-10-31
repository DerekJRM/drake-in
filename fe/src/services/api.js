import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

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

    saveOperador: async (operador) => {
        const res = await api.post("/saveOperador", operador);
        return res.data;
    },

    deleteOperador: async (id) => {
        const res = await api.delete("/deleteOperadorById", { params: { id } });
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

    // ================================= RUTAS =================================

    getRutas: async () => {
        const res = await api.get("/findAllRutas");
        return res.data;
    },

    getRutaById: async (id) => {
        const res = await api.get("/findRutaById", { params: { id } });
        return res.data;
    },

    saveRuta: async (ruta) => {
        const res = await api.post("/saveRuta", ruta);
        return res.data;
    },

    deleteRuta: async (id) => {
        const res = await api.delete("/deleteRutaById", { params: { id } });
        return res.data;
    },

    /**
     * Busca una ruta por fecha, horario_id y origen_id.
     * Si no existe, la crea y devuelve el ID.
     * @param {object} rutaRequest - { fecha: "YYYY-MM-DD", horario_id: 1, origen_id: 2 }
     * @returns {Promise<{ruta_id: number}>} - Devuelve un objeto con el ID de la ruta
     */
    findOrCreateRuta: async (rutaRequest) => {
        const res = await api.post("/findOrCreateRuta", rutaRequest);
        return res.data; // Espera recibir { "ruta_id": 123 }
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
