import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiRest from "../services/api";

// Hook para OBTENER todos los operadores
export const useOperadores = () => {
  return useQuery({
    queryKey: ["operadores"],
    queryFn: () => apiRest.getOperadores(),
  });
};

// Hook para OBTENER un operador por ID
export const useOperadorById = (id) => {
  return useQuery({
    queryKey: ["operador", id],
    queryFn: () => apiRest.getOperadorById(id),
    enabled: !!id,
  });
};

// Hook para OBTENER operadores por tipo (e.g., "BOTE", "HOTEL")
export const useOperadoresByTipo = (tipo) => {
  return useQuery({
    queryKey: ["operadores", tipo],
    queryFn: () => apiRest.getOperadoresByTipo(tipo),
    enabled: !!tipo,
  });
};

// Hook para CREAR o ACTUALIZAR un operador
export const useSaveOperador = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiRest.saveOperador,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["operadores"] });
    },
  });
};

// Hook para ELIMINAR un operador
export const useDeleteOperador = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiRest.deleteOperador,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["operadores"] });
    },
  });
};
