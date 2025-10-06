import { useQuery } from "@tanstack/react-query";
import apiRest from "../services/api";

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