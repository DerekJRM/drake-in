import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiRest from "../services/api";

// Hook para OBTENER todos los pasajeros
export const usePasajeros = () => {
  return useQuery({
    queryKey: ["pasajeros"],
    queryFn: () => apiRest.getPasajeros(),
  });
};

// Hook para OBTENER pasajeros por ruta
export const usePasajerosByRuta = (rutaId) => {
  return useQuery({
    queryKey: ["pasajeros", "ruta", rutaId],
    queryFn: () => apiRest.getPasajerosByRuta(rutaId),
    enabled: !!rutaId,
  });
};

// Hook para OBTENER un pasajero por ID
export const usePasajeroById = (id) => {
  return useQuery({
    queryKey: ["pasajero", id],
    queryFn: () => apiRest.getPasajeroById(id),
    enabled: !!id,
  });
};

// Hook para CREAR o ACTUALIZAR un pasajero
export const useSavePasajero = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiRest.savePasajero,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pasajeros"] });
    },
  });
};

// Hook para ELIMINAR un pasajero
export const useDeletePasajero = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiRest.deletePasajero,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pasajeros"] });
    },
  });
};
