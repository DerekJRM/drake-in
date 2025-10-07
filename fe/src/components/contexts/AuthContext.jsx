import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin, useRegister } from "../../hooks/useAuth";
import { ROUTES } from "../../utils/constants";
import { utils } from "../utils";

// Crear el contexto
const AuthContext = createContext(null);

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { mutate: loginMutation } = useLogin();
  const { mutate: registerMutation } = useRegister();

  // Verificar si hay una sesión activa al cargar la app
  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAuth = () => {
    try {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken) {
        setToken(storedToken);

        // Si hay usuario guardado, usarlo
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          // Si no hay usuario pero sí token, decodificar el token
          const decodedToken = utils.decodeToken(storedToken);
          const userData = utils.extractUserFromToken(decodedToken);
          if (userData) {
            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);
          }
        }
      }
    } catch (error) {
      console.error("Error al verificar autenticación:", error);
      // Si hay error al parsear, limpiar localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      setIsLoading(false);
    }
  };

  const login = (credentials, options = {}) => {
    loginMutation(credentials, {
      onSuccess: (data) => {
        console.log("Login exitoso:", data);

        // El backend puede devolver solo el token (string) o un objeto { token, user }
        let tokenString = typeof data === "string" ? data : data.token;
        let userData = null;

        if (tokenString) {
          // Guardar el token
          localStorage.setItem("token", tokenString);
          setToken(tokenString);

          // Decodificar el token para obtener información del usuario
          const decodedToken = utils.decodeToken(tokenString);
          userData = utils.extractUserFromToken(decodedToken);
          if (userData) {
            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);
          }
        }

        // Si el backend envía datos de usuario explícitos, usarlos
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          setUser(data.user);
        }

        // Ejecutar callback de éxito personalizado si existe
        if (options.onSuccess) {
          options.onSuccess(data);
        }

        // Navegar al home por defecto
        navigate(ROUTES.HOME);
      },
      onError: (error) => {
        console.error("Error al iniciar sesión:", error);

        // Ejecutar callback de error personalizado si existe
        if (options.onError) {
          options.onError(error);
        }
      },
    });
  };

  const register = (userData, options = {}) => {
    registerMutation(userData, {
      onSuccess: (data) => {
        console.log("Registro exitoso:", data);

        // El backend puede devolver solo el token (string) o un objeto { token, user }
        let tokenString = typeof data === "string" ? data : data.token;
        let userDataFromResponse = null;

        if (tokenString) {
          // Guardar el token
          localStorage.setItem("token", tokenString);
          setToken(tokenString);

          // Decodificar el token para obtener información del usuario
          const decodedToken = utils.decodeToken(tokenString);
          userDataFromResponse = utils.extractUserFromToken(decodedToken);
          if (userDataFromResponse) {
            localStorage.setItem("user", JSON.stringify(userDataFromResponse));
            setUser(userDataFromResponse);
          }
        }

        // Si el backend envía datos de usuario explícitos, usarlos
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          setUser(data.user);
        }

        // Ejecutar callback de éxito personalizado si existe
        if (options.onSuccess) {
          options.onSuccess(data);
        }

        // Navegar al home por defecto
        navigate(ROUTES.HOME);
      },
      onError: (error) => {
        console.error("Error al registrarse:", error);

        // Ejecutar callback de error personalizado si existe
        if (options.onError) {
          options.onError(error);
        }
      },
    });
  };

  const logout = () => {
    
    // Limpiar estado
    setUser(null);
    setToken(null);

    // Limpiar localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Navegar al login
    navigate(ROUTES.LOGIN);
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
