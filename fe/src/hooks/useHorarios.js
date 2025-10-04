import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiRest from "../components/service";

// Hook para OBTENER todos los horarios
export const useHorarios = () => {
  return useQuery({
    queryKey: ["horarios"],
    queryFn: () => apiRest.getHorarios(),
  });
};

// Hook para OBTENER un horario por ID
export const useHorarioById = (id) => {
  return useQuery({
    queryKey: ["horario", id],
    queryFn: () => apiRest.getHorarioById(id),
    enabled: !!id, // Solo ejecuta si hay un id
  });
};

// Hook para CREAR o ACTUALIZAR un horario
export const useSaveHorario = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiRest.saveHorario,
    onSuccess: () => {
      // Invalida el cache para refrescar la lista de horarios
      queryClient.invalidateQueries({ queryKey: ["horarios"] });
    },
  });
};

// Hook para ELIMINAR un horario
export const useDeleteHorario = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiRest.deleteHorario,
    onSuccess: () => {
      // Invalida el cache para refrescar la lista de horarios
      queryClient.invalidateQueries({ queryKey: ["horarios"] });
    },
  });
};
