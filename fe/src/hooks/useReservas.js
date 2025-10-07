import { useMutation, useQueryClient } from "@tanstack/react-query";
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