import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Loading } from "../common";
import { ROUTES } from "../../utils/constants";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  // Mostrar loading mientras verifica la sesión
  if (isLoading) {
    return <Loading />;
  }

  // Si no está autenticado, redirigir al login
  // Guardamos la ruta actual para volver después del login
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />;
  }

  // Si se especificaron roles permitidos, verificar que el usuario tenga uno de ellos
  if (allowedRoles.length > 0 && user?.rol) {
    const hasPermission = allowedRoles.includes(user.rol);

    if (!hasPermission) {
      // Si no tiene permiso, redirigir al home con mensaje
      return (
        <Navigate
          to={ROUTES.HOME}
          replace
          state={{
            error: "No tienes permisos para acceder a esta página",
          }}
        />
      );
    }
  }

  // Si está autenticado y tiene permisos, mostrar el contenido protegido
  return children;
}
