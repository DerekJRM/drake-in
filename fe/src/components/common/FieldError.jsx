import React from "react";

/**
 * Componente para mostrar errores de validación en formularios
 * @param {string} error - Mensaje de error a mostrar
 */
const FieldError = ({ error }) => {
  if (!error) return null;

  return (
    <small
      role="alert"
      style={{ color: "#b00020", display: "block", marginTop: "0.25rem" }}
    >
      {error}
    </small>
  );
};

export default FieldError;
