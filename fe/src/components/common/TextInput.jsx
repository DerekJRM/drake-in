import React from "react";

/**
 * Componente reutilizable para campos de texto/email
 * @param {string} id - ID único del input
 * @param {string} label - Etiqueta del campo
 * @param {string} type - Tipo de input (text, email, etc.)
 * @param {string} name - Nombre del campo para el formulario
 * @param {string} value - Valor actual del campo
 * @param {function} onChange - Manejador de cambios
 * @param {string} placeholder - Texto placeholder
 * @param {boolean} required - Si el campo es requerido
 * @param {boolean} disabled - Si el campo está deshabilitado
 */
const TextInput = ({
  id,
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = true,
  disabled = false,
}) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />
    </div>
  );
};

export default TextInput;
