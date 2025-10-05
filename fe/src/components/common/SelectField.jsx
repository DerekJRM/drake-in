import React from "react";

/**
 * Componente reutilizable para campos <select> con estados de carga/error
 * @param {string} id - ID único del select
 * @param {string} label - Etiqueta del campo
 * @param {string} name - Nombre del campo para el formulario
 * @param {string|number} value - Valor seleccionado actual
 * @param {function} onChange - Manejador de cambios
 * @param {boolean} disabled - Si el campo está deshabilitado
 * @param {boolean} required - Si el campo es requerido
 * @param {string} placeholder - Texto placeholder
 * @param {boolean} loading - Estado de carga
 * @param {boolean} error - Si hay error al cargar datos
 * @param {Array} options - Array de opciones para el select
 * @param {function} getOptionValue - Función para obtener el valor de cada opción
 * @param {function} getOptionLabel - Función para obtener la etiqueta de cada opción
 */
const SelectField = ({
  id,
  label,
  name,
  value,
  onChange,
  disabled,
  required = true,
  placeholder,
  loading,
  error,
  options = [],
  getOptionValue = (o) => o.value,
  getOptionLabel = (o) => o.label,
}) => {
  const computedPlaceholder = loading
    ? `Cargando ${label.toLowerCase()}...`
    : error
    ? `Error al cargar ${label.toLowerCase()}`
    : placeholder;

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled || loading || !!error}
        aria-invalid={!!error}
      >
        <option value="">{computedPlaceholder}</option>
        {options.map((opt) => {
          const val = getOptionValue(opt);
          return (
            <option key={val} value={val}>
              {getOptionLabel(opt)}
            </option>
          );
        })}
      </select>
      {error && (
        <small role="alert" style={{ color: "#b00020" }}>
          Ocurrió un problema. Intenta recargar.
        </small>
      )}
    </div>
  );
};

export default SelectField;
