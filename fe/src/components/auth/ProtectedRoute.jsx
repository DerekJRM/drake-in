import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Loading } from "../common";
import { ROUTES } from "../../utils/constants";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
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

  // Si está autenticado, mostrar el contenido protegido
  return children;
}
