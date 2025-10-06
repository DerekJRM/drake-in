import { useQuery } from "@tanstack/react-query";
import apiRest from "../services/api";

// Hook para OBTENER todos los puertos
export const usePuertos = () => {
  return useQuery({
    queryKey: ["puertos"],
    queryFn: () => apiRest.getPuertos(),
  });
};

// Hook para OBTENER un puerto por ID
export const usePuertoById = (id) => {
  return useQuery({
    queryKey: ["puerto", id],
    queryFn: () => apiRest.getPuertoById(id),
    enabled: !!id,
  });
};