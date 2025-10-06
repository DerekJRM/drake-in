import { useMutation } from "@tanstack/react-query";
import authRest from "../services/authService";

// Hook para LOGIN
export const useLogin = () => {
  return useMutation({
    mutationFn: authRest.login,
  });
};

// Hook para REGISTRO
export const useRegister = () => {
  return useMutation({
    mutationFn: authRest.register,
  });
};
