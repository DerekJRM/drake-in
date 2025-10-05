import React from "react";
import { SelectField } from "../../common";

/**
 * Sección de información básica de la ruta
 * @param {object} formData - Datos del formulario
 * @param {object} fieldErrors - Errores de validación
 * @param {function} onChange - Manejador de cambios
 * @param {Array} locationOptions - Opciones de puertos para origen
 * @param {Array} destinationOptions - Opciones de puertos para destino (filtradas)
 * @param {Array} operatorOptions - Opciones de operadores
 * @param {boolean} loadingPuertos - Estado de carga de puertos
 * @param {boolean} loadingOperadores - Estado de carga de operadores
 */
const BasicInfoSection = ({
  formData,
  fieldErrors,
  onChange,
  locationOptions,
  destinationOptions,
  operatorOptions,
  loadingPuertos,
  loadingOperadores,
}) => {
  return (
    <div>
      <h4>Información Básica</h4>

      <SelectField
        id="origin"
        label="Puerto de Origen"
        name="origin"
        value={formData.origin}
        onChange={onChange}
        options={locationOptions}
        error={fieldErrors.origin}
        required
        loading={loadingPuertos}
      />

      <SelectField
        id="destination"
        label="Puerto de Destino"
        name="destination"
        value={formData.destination}
        onChange={onChange}
        options={destinationOptions}
        error={fieldErrors.destination}
        required
        loading={loadingPuertos}
        disabled={!formData.origin}
      />
      {!formData.origin && (
        <small style={{ color: "#666", marginTop: "5px", display: "block" }}>
          Primero selecciona un puerto de origen
        </small>
      )}

      <SelectField
        id="operatorId"
        label="Operador del Bote"
        name="operatorId"
        value={formData.operatorId}
        onChange={onChange}
        options={operatorOptions}
        error={fieldErrors.operatorId}
        required
        loading={loadingOperadores}
      />
    </div>
  );
};

export default BasicInfoSection;
