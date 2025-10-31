import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { USER_TYPES, ROUTES } from "../utils/constants";
// import { useSaveUsuario } from "../hooks/useUsuarios";
import { useRegister } from "../hooks/useAuth";
import useFormValidation from "../hooks/useFormValidation";
import { validateRegisterForm } from "../utils/validators";
import { PasswordInput } from "../components/common";

const Register = () => {
  const navigate = useNavigate();
  const { mutate: saveUsuario, isLoading } = useRegister();
  const { fieldErrors, validate, clearFieldError } =
    useFormValidation(validateRegisterForm);
  const [apiError, setApiError] = useState("");

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
      usuario: formData.email,
      contrasena: formData.password,
      rol: formData.userType,
      ...(formData.userType === USER_TYPES.HOTEL
        ? { nombre: formData.hotelName }
        : { nombre: formData.boatName }),
        new_item: true
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
  }

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

              <PasswordInput
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Tu contraseña"
                required
                disabled={isLoading}
                error={fieldErrors.password}
              />

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
