import React from "react";
import { SubmitButton } from "../common";
import useRouteForm from "../../hooks/useRouteForm";
import BasicInfoSection from "./RouteFormSections/BasicInfoSection";
import PricingSection from "./RouteFormSections/PricingSection";
import ScheduleSection from "./RouteFormSections/ScheduleSection";
import StatusSection from "./RouteFormSections/StatusSection";

/**
 * Formulario para crear/editar rutas
 * @param {object} initialData - Datos iniciales de la ruta (para edición)
 * @param {function} onSubmit - Función a ejecutar al enviar el formulario
 * @param {function} onCancel - Función a ejecutar al cancelar
 * @param {string} mode - Modo: 'add' o 'edit'
 */
const RouteForm = ({
  initialData = null,
  onSubmit,
  onCancel,
  mode = "add",
}) => {
  const {
    formData,
    fieldErrors,
    isSubmitting,
    locationOptions,
    destinationOptions,
    operatorOptions,
    scheduleOptions,
    loadingPuertos,
    loadingOperadores,
    loadingHorarios,
    handleChange,
    handleSubmit,
  } = useRouteForm(initialData, onSubmit, mode);

  return (
    <form onSubmit={handleSubmit}>
      <BasicInfoSection
        formData={formData}
        fieldErrors={fieldErrors}
        onChange={handleChange}
        locationOptions={locationOptions}
        destinationOptions={destinationOptions}
        operatorOptions={operatorOptions}
        loadingPuertos={loadingPuertos}
        loadingOperadores={loadingOperadores}
      />

      <PricingSection
        formData={formData}
        fieldErrors={fieldErrors}
        onChange={handleChange}
      />

      <ScheduleSection
        formData={formData}
        fieldErrors={fieldErrors}
        onChange={handleChange}
        scheduleOptions={scheduleOptions}
        loadingHorarios={loadingHorarios}
      />

      <StatusSection formData={formData} onChange={handleChange} />

      <div>
        <SubmitButton
          isSubmitting={isSubmitting}
          label={mode === "add" ? "Agregar Ruta" : "Guardar Cambios"}
          loadingLabel="Guardando..."
        />
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default RouteForm;
