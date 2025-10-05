/*
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "../../supabase/client.js";
import { Loading } from "../common";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!isMounted) return;
      setSession(data?.session ?? null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        if (!isMounted) return;
        setSession(newSession);
        setLoading(false);
      }
    );

    return () => {
      isMounted = false;
      listener?.subscription?.unsubscribe();
    };
  }, []);

  // Mostrar loading mientras verifica la sesión
  if (loading) return <Loading />;

  if (!session) {
    //guardamos la ruta actual para volver después del login
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
*/
