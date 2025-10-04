import React, { useMemo } from "react";

/**
 * Componente reutilizable para campos de fecha
 * @param {string} id - ID único del input
 * @param {string} label - Etiqueta del campo
 * @param {string} name - Nombre del campo para el formulario
 * @param {string} value - Valor actual del campo (formato yyyy-mm-dd)
 * @param {function} onChange - Manejador de cambios
 * @param {boolean} required - Si el campo es requerido
 * @param {boolean} disabled - Si el campo está deshabilitado
 * @param {string} minDate - Fecha mínima permitida (formato yyyy-mm-dd)
 * @param {string} maxDate - Fecha máxima permitida (formato yyyy-mm-dd)
 * @param {boolean} disablePastDates - Si true, deshabilita fechas pasadas
 */
const DateInput = ({
  id,
  label,
  name,
  value,
  onChange,
  required = true,
  disabled = false,
  minDate,
  maxDate,
  disablePastDates = true,
}) => {
  // Calcula la fecha de hoy en formato yyyy-mm-dd
  const todayStr = useMemo(() => {
    const d = new Date();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${d.getFullYear()}-${m}-${day}`;
  }, []);

  const computedMin = disablePastDates ? minDate || todayStr : minDate;

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="date"
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        min={computedMin}
        max={maxDate}
      />
    </div>
  );
};

export default DateInput;
