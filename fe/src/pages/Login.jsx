import React, { useState } from "react";
import { ROUTES } from "../utils/constants";
import { PasswordInput } from "../components/common";
import { useAuth } from "../components/contexts/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Limpiar error al escribir
    if (error) setError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    login(
      {
        usuario: formData.email,
        contrasena: formData.password,
      },
      {
        onSuccess: () => {
          setIsLoading(false);
        },
        onError: (err) => {
          setIsLoading(false);
          setError(
            err?.response?.data?.message ||
              err?.message ||
              "Error al iniciar sesión"
          );
        },
      }
    );
  };

  return (
    <div>
      <div>
        <div>
          <h4>Iniciar Sesión</h4>
        </div>
        <div>
          <div>
            <div>
              <h5>DrakeIn</h5>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div>
              <label>Correo electrónico</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                required
              />
            </div>

            <PasswordInput
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Tu contraseña"
              required
            />

            <div>
              <input
                type="checkbox"
                name="rememberMe"
                id="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label htmlFor="rememberMe">Recordarme</label>
            </div>

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </button>

            {error && (
              <div style={{ color: "red", marginTop: "10px" }}>
                Error: {error}
              </div>
            )}

            <div>
              <button
                type="button"
                onClick={() =>
                  alert("Funcionalidad de recuperación de contraseña")
                }
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </form>
        </div>
      </div>

      <div>
        <p>
          ¿No tienes cuenta?
          <a href={ROUTES.REGISTRO}>Regístrate aquí</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
