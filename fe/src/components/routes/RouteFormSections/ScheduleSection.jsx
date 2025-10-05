import React from "react";
import { DateInput, SelectField } from "../../common";

/**
 * Sección de programación de la ruta
 * @param {object} formData - Datos del formulario
 * @param {object} fieldErrors - Errores de validación
 * @param {function} onChange - Manejador de cambios
 * @param {Array} scheduleOptions - Opciones de horarios
 * @param {boolean} loadingHorarios - Estado de carga de horarios
 */
const ScheduleSection = ({
  formData,
  fieldErrors,
  onChange,
  scheduleOptions,
  loadingHorarios,
}) => {
  return (
    <div>
      <h4>Programación</h4>

      <DateInput
        id="calendarDate"
        label="Fecha de la Ruta"
        name="calendarDate"
        value={formData.calendarDate}
        onChange={onChange}
        error={fieldErrors.calendarDate}
        required
        disablePastDates={true}
      />
      <small>Fecha en la que estará disponible esta ruta</small>

      <SelectField
        id="schedule"
        label="Horario de Salida"
        name="schedule"
        value={formData.schedule}
        onChange={onChange}
        options={scheduleOptions}
        error={fieldErrors.schedule}
        required
        loading={loadingHorarios}
      />
      <small>Seleccione el horario de salida de esta ruta</small>
    </div>
  );
};

export default ScheduleSection;
