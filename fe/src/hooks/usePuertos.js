import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiRest from "../components/service";

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

// Hook para CREAR o ACTUALIZAR un puerto
export const useSavePuerto = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiRest.savePuerto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["puertos"] });
    },
  });
};

// Hook para ELIMINAR un puerto
export const useDeletePuerto = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiRest.deletePuerto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["puertos"] });
    },
  });
};
