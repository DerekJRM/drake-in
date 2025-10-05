import React from "react";
import FieldError from "./FieldError";

/**
 * Componente reutilizable para inputs de tipo time
 * @param {string} id - ID del input
 * @param {string} label - Etiqueta del input
 * @param {string} name - Name del input
 * @param {string} value - Valor del input (formato HH:MM)
 * @param {function} onChange - Función de cambio
 * @param {string} error - Mensaje de error
 * @param {boolean} required - Si el campo es requerido
 * @param {string} min - Hora mínima (formato HH:MM)
 * @param {string} max - Hora máxima (formato HH:MM)
 */
const TimeInput = ({
  id,
  label,
  name,
  value = "",
  onChange,
  error = "",
  required = false,
  min = "",
  max = "",
}) => {
  return (
    <div>
      {label && (
        <label htmlFor={id}>
          {label}
          {required && <span style={{ color: "red" }}> *</span>}
        </label>
      )}
      <input
        type="time"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        min={min}
        max={max}
      />
      {error && <FieldError message={error} />}
    </div>
  );
};

export default TimeInput;
