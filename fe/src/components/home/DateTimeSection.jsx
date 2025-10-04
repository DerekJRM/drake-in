import React from "react";
import { DateInput, SelectField, FieldError } from "../common";

/**
 * Sección del formulario para fecha y horario
 * @param {object} formData - Datos del formulario
 * @param {object} fieldErrors - Errores de validación
 * @param {function} onChange - Manejador de cambios
 * @param {array} horarios - Opciones de horarios disponibles
 * @param {boolean} loadingHorarios - Estado de carga de horarios
 * @param {boolean} errorHorarios - Error al cargar horarios
 * @param {boolean} canPickSchedule - Si se puede seleccionar horario
 */
const DateTimeSection = ({
  formData,
  fieldErrors,
  onChange,
  horarios,
  loadingHorarios,
  errorHorarios,
  canPickSchedule,
}) => {
  const schedulePlaceholder = canPickSchedule
    ? "Selecciona un horario"
    : "Selecciona origen, destino y fecha primero";

  return (
    <fieldset style={{ border: "none", padding: 0 }}>
      <legend className="sr-only">Fecha y horario</legend>

      <div>
        <DateInput
          id="date"
          label="Fecha de viaje"
          name="date"
          value={formData.date}
          onChange={onChange}
          required
          disablePastDates={true}
        />
        <FieldError error={fieldErrors.date} />
      </div>

      <div>
        <SelectField
          id="schedule"
          label="Horario"
          name="schedule"
          value={formData.schedule}
          onChange={onChange}
          required
          disabled={!canPickSchedule || loadingHorarios}
          placeholder={schedulePlaceholder}
          loading={loadingHorarios}
          error={errorHorarios}
          options={horarios}
          getOptionValue={(h) => h.id}
          getOptionLabel={(h) => h.hora}
        />
        <FieldError error={fieldErrors.schedule} />
      </div>
    </fieldset>
  );
};

export default DateTimeSection;
