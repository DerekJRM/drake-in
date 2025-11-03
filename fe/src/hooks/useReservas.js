import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import apiRest from "../services/api";

// Hook para OBTENER todos los puertos
export const useSaveReserva = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiRest.saveReserva,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reservas"] });
    },
  });
};

// Hook para OBTENER reservaciones por fecha
export const useReservasByFecha = (fecha) => {
  return useQuery({
    queryKey: ["reservas", fecha], // La queryKey incluye la fecha
    queryFn: () => apiRest.getReservasByFecha(fecha),
    // 'enabled: !!fecha' asegura que la query solo se ejecute si 'fecha' no es nulo/undefined
    enabled: !!fecha, 
  });
};

// Hook para OBTENER reservaciones por fecha y hotel (PARA VISTA HOTEL)
export const useReservasByFechaAndHotel = (fecha, hotelId) => {
  return useQuery({
    queryKey: ["reservas", fecha, "hotel", hotelId],
    queryFn: () => apiRest.getReservasByFechaAndHotel(fecha, hotelId),
    enabled: !!fecha && !!hotelId, // Solo se activa si tenemos ambos datos
  });
};



