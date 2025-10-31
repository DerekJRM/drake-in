import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin, useRegister } from "../../hooks/useAuth";
import { ROUTES, OPERATOR_TYPES, USER_TYPES } from "../../utils/constants"; // <-- Importar USER_TYPES
import { utils } from "../utils";
import apiRest from "../../services/api";

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
  const [operatorType, setOperatorType] = useState(null);
  const [operadorId, setOperadorId] = useState(null); // <-- NUEVO ESTADO
  const [operadorName, setOperadorName] = useState(null); // <-- NUEVO ESTADO
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { mutate: loginMutation } = useLogin();
  const { mutate: registerMutation } = useRegister();

  // Verificar si hay una sesión activa al cargar la app
  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchOperatorInfo = async (userId) => {
    try {
      const storedOperatorType = localStorage.getItem("operatorType");
      const storedOperadorId = localStorage.getItem("operadorId"); // <-- NUEVO
      const storedOperadorName = localStorage.getItem("operadorName"); // <-- NUEVO

      if (storedOperatorType && storedOperadorId && storedOperadorName) {
        setOperatorType(storedOperatorType);
        setOperadorId(storedOperadorId); // <-- NUEVO
        setOperadorName(storedOperadorName); // <-- NUEVO
        return storedOperatorType;
      }

      const operador = await apiRest.getOperadorByUsuarioId(userId); // <-- NUEVO ENDPOINT
      if (operador && operador.tipo) {
        localStorage.setItem("operatorType", operador.tipo);
        localStorage.setItem("operadorId", operador.id); // <-- NUEVO
        localStorage.setItem("operadorName", operador.nombre); // <-- NUEVO
        setOperatorType(operador.tipo);
        setOperadorId(operador.id); // <-- NUEVO
        setOperadorName(operador.nombre); // <-- NUEVO
        return operador.tipo;
      }
    } catch (error) {
      console.error("Error al obtener tipo de operador:", error);
    }
    return null;
  };

  const checkAuth = async () => {
    try {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken) {
        setToken(storedToken);

        // Si hay usuario guardado, usarlo
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);

          // Si es operador, obtener su tipo
          if ((parsedUser.rol === USER_TYPES.OPERATOR || parsedUser.rol === USER_TYPES.HOTEL) && parsedUser.id) {
            await fetchOperatorInfo(parsedUser.id);
          }
        } else {
          // Si no hay usuario pero sí token, decodificar el token
          const decodedToken = utils.decodeToken(storedToken);
          const userData = utils.extractUserFromToken(decodedToken);
          if (userData) {
            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);

            // Si es operador, obtener su tipo
            if ((userData.rol === USER_TYPES.OPERATOR || userData.rol === USER_TYPES.HOTEL) && userData.id) {
              await fetchOperatorInfo(userData.id); // <-- MODIFICADO
            }
          }
        }
      }
    } catch (error) {
      console.error("Error al verificar autenticación:", error);
      // Si hay error al parsear, limpiar localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("operatorType");
      localStorage.removeItem("operadorId"); // <-- NUEVO
    localStorage.removeItem("operadorName"); // <-- NUEVO
    } finally {
      setIsLoading(false);
    }
  };

  const login = (credentials, options = {}) => {
    loginMutation(credentials, {
      onSuccess: async (data) => {
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
          userData = data.user;
        }

        // Si es operador, obtener su tipo
        if (userData && (userData.rol === USER_TYPES.OPERATOR || userData.rol === USER_TYPES.HOTEL) && userData.id) {
          await fetchOperatorInfo(userData.id); // <-- MODIFICADO
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
    setOperatorType(null);
    setOperadorId(null); // <-- NUEVO
    setOperadorName(null); // <-- NUEVO

    // Limpiar localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("operatorType");
    localStorage.removeItem("operadorId"); // <-- NUEVO
    localStorage.removeItem("operadorName"); // <-- NUEVO

    // Navegar al login
    navigate(ROUTES.LOGIN);
  };

  // Función helper para obtener la ruta de reservaciones según el tipo de operador
  const getReservationsRoute = () => {
    if (operatorType === OPERATOR_TYPES.BOTE) {
      return ROUTES.RESERVACIONES;
    } else if (operatorType === OPERATOR_TYPES.HOTEL) {
      return ROUTES.RESERVACIONES_HOTEL; // Vista de Hotel
    }
    return ROUTES.RESERVACIONES; // Default
  };

  const value = {
    user,
    token,
    operatorType,
    operadorId, // <-- NUEVO (Lo exponemos al resto de la app)
    operadorName, // <-- NUEVO (Lo exponemos al resto de la app)
    isAuthenticated: !!token && !!user,
    isLoading,
    login,
    register,
    logout,
    getReservationsRoute,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
