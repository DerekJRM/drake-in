import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiRest from "../components/service";

// Hook para OBTENER todas las rutas
export const useRutas = () => {
  return useQuery({
    queryKey: ["rutas"],
    queryFn: () => apiRest.getRutas(),
  });
};

// Hook para OBTENER una ruta por ID
export const useRutaById = (id) => {
  return useQuery({
    queryKey: ["ruta", id],
    queryFn: () => apiRest.getRutaById(id),
    enabled: !!id,
  });
};

// Hook para CREAR o ACTUALIZAR una ruta
export const useSaveRuta = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiRest.saveRuta,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rutas"] });
    },
  });
};

// Hook para ELIMINAR una ruta
export const useDeleteRuta = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiRest.deleteRuta,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rutas"] });
    },
  });
};
