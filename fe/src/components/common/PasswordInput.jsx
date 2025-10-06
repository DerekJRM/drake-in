import React, { useState } from "react";

/**
 * Input de contraseña sin estilos adicionales.
 * Solo agrega el ícono de visibilidad (bi-eye / bi-eye-slash).
 */
const PasswordInput = ({
  name = "password",
  value,
  onChange,
  placeholder = "Tu contraseña",
  required = false,
  disabled = false,
  label = "Contraseña",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label>{label}</label>
      <div>
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          disabled={disabled}
          aria-label={
            showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
          }
        >
          <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
