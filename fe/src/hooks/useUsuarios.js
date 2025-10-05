import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiRest from "../components/service";

// Hook para OBTENER todos los usuarios
export const useUsuarios = () => {
  return useQuery({
    queryKey: ["usuarios"],
    queryFn: () => apiRest.getUsuarios(),
  });
};

// Hook para OBTENER un usuario por ID
export const useUsuarioById = (id) => {
  return useQuery({
    queryKey: ["usuario", id],
    queryFn: () => apiRest.getUsuarioById(id),
    enabled: !!id,
  });
};

// Hook para CREAR o ACTUALIZAR un usuario
export const useSaveUsuario = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiRest.saveUsuario,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
    },
  });
};

// Hook para ELIMINAR un usuario
export const useDeleteUsuario = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiRest.deleteUsuario,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
    },
  });
};
