import React from "react";
import { SelectField, FieldError } from "../common";

/**
 * Sección del formulario para origen y destino
 * @param {object} formData - Datos del formulario
 * @param {object} fieldErrors - Errores de validación
 * @param {function} onChange - Manejador de cambios
 * @param {array} originOptions - Opciones de origen
 * @param {array} destinationOptions - Opciones de destino
 * @param {boolean} loadingPuertos - Estado de carga de puertos
 * @param {boolean} errorPuertos - Error al cargar puertos
 */
const TravelDetailsSection = ({
  formData,
  fieldErrors,
  onChange,
  originOptions,
  destinationOptions,
  loadingPuertos,
  errorPuertos,
}) => {
  return (
    <fieldset style={{ border: "none", padding: 0 }}>
      <legend className="sr-only">Datos del viaje</legend>

      <div>
        <SelectField
          id="origin"
          label="Origen"
          name="origin"
          value={formData.origin}
          onChange={onChange}
          required
          disabled={loadingPuertos}
          placeholder="Selecciona el origen"
          loading={loadingPuertos}
          error={errorPuertos}
          options={originOptions}
          getOptionValue={(p) => p.id}
          getOptionLabel={(p) => p.nombre}
        />
        <FieldError error={fieldErrors.origin} />
      </div>

      <div>
        <SelectField
          id="destination"
          label="Destino"
          name="destination"
          value={formData.destination}
          onChange={onChange}
          required
          disabled={loadingPuertos}
          placeholder="Selecciona el destino"
          loading={loadingPuertos}
          error={errorPuertos}
          options={destinationOptions}
          getOptionValue={(p) => p.id}
          getOptionLabel={(p) => p.nombre}
        />
        <FieldError error={fieldErrors.destination} />
      </div>
    </fieldset>
  );
};

export default TravelDetailsSection;
