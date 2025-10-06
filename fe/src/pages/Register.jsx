import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { USER_TYPES, ROUTES } from "../utils/constants";
import { useSaveUsuario } from "../hooks/useUsuarios";
import useFormValidation from "../hooks/useFormValidation";
import { validateRegisterForm } from "../utils/validators";

const Register = () => {
  const navigate = useNavigate();
  const { mutate: saveUsuario, isLoading } = useSaveUsuario();
  const { fieldErrors, validate, clearFieldError } =
    useFormValidation(validateRegisterForm);
  const [apiError, setApiError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    userType: "",
    hotelName: "",
    boatName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      // Si cambia el tipo de usuario, resetear los campos condicionales
      if (name === "userType") {
        return {
          ...prev,
          [name]: value,
          hotelName: "",
          boatName: "",
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });

    // Limpiar error del campo cuando el usuario empiece a escribir
    clearFieldError(name);

    // Si cambia el tipo de usuario, limpiar también errores de campos condicionales
    if (name === "userType") {
      clearFieldError("hotelName");
      clearFieldError("boatName");
    }

    setApiError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar formulario
    if (!validate(formData)) {
      return;
    }

    // Construir objeto usuario según el tipo
    const usuario = {
      email: formData.email,
      password: formData.password,
      tipo: formData.userType,
      ...(formData.userType === USER_TYPES.HOTEL
        ? { nombreHotel: formData.hotelName }
        : { nombreBote: formData.boatName }),
    };

    // Enviar al backend
    saveUsuario(usuario, {
      onSuccess: () => {
        alert("¡Usuario registrado exitosamente! Ahora puedes iniciar sesión.");
        navigate(ROUTES.LOGIN);
      },
      onError: (error) => {
        console.error("Error al registrar usuario:", error);
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data ||
          "Error al registrar usuario. Por favor, intenta nuevamente.";
        setApiError(errorMessage);
      },
    });
  };

  return (
    <div>
      <div>
        <div>
          <div>
            <h4>Registrar Nuevo Operador</h4>
          </div>
          <div>
            <form onSubmit={handleSubmit} noValidate>
              {/* Mostrar error de API si existe */}
              {apiError && (
                <div
                  style={{
                    color: "red",
                    marginBottom: "15px",
                    padding: "10px",
                    border: "1px solid red",
                    borderRadius: "4px",
                  }}
                >
                  {apiError}
                </div>
              )}

              <div>
                <label>Tipo de usuario</label>
                <select
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                >
                  <option value="">Selecciona el tipo de usuario</option>
                  <option value={USER_TYPES.HOTEL}>Hotel</option>
                  <option value={USER_TYPES.OPERATOR}>Operador de Bote</option>
                </select>
                {fieldErrors.userType && (
                  <small style={{ color: "red" }}>{fieldErrors.userType}</small>
                )}
              </div>

              {formData.userType === USER_TYPES.HOTEL && (
                <div>
                  <label>Nombre del Hotel</label>
                  <input
                    type="text"
                    name="hotelName"
                    value={formData.hotelName}
                    onChange={handleChange}
                    placeholder="Nombre del hotel"
                    required
                    disabled={isLoading}
                  />
                  {fieldErrors.hotelName && (
                    <small style={{ color: "red" }}>
                      {fieldErrors.hotelName}
                    </small>
                  )}
                </div>
              )}

              {formData.userType === USER_TYPES.OPERATOR && (
                <div>
                  <label>Nombre del Bote</label>
                  <input
                    type="text"
                    name="boatName"
                    value={formData.boatName}
                    onChange={handleChange}
                    placeholder="Nombre del bote"
                    required
                    disabled={isLoading}
                  />
                  {fieldErrors.boatName && (
                    <small style={{ color: "red" }}>
                      {fieldErrors.boatName}
                    </small>
                  )}
                </div>
              )}

              <div>
                <label>Correo electrónico</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  required
                  disabled={isLoading}
                />
                {fieldErrors.email && (
                  <small style={{ color: "red" }}>{fieldErrors.email}</small>
                )}
              </div>

              <div>
                <label>Contraseña</label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Tu contraseña"
                    required
                    disabled={isLoading}
                    style={{ paddingRight: "40px" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "5px",
                      display: "flex",
                      alignItems: "center",
                      color: "#666",
                    }}
                    aria-label={
                      showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                    }
                  >
                    {showPassword ? (
                      // Icono de ojo cerrado
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      // Icono de ojo abierto
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
                {fieldErrors.password && (
                  <small style={{ color: "red" }}>{fieldErrors.password}</small>
                )}
              </div>

              <div>
                <button type="submit" disabled={isLoading}>
                  {isLoading ? "Registrando..." : "Registrar Operador"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
