import React from "react";
import { TextInput } from "../../common";

/**
 * Sección de tarifa de la ruta
 * @param {object} formData - Datos del formulario
 * @param {object} fieldErrors - Errores de validación
 * @param {function} onChange - Manejador de cambios
 */
const PricingSection = ({ formData, fieldErrors, onChange }) => {
  return (
    <div>
      <h4>Tarifa</h4>

      <TextInput
        id="pricePerPerson"
        label="Precio por Persona ($)"
        name="pricePerPerson"
        type="number"
        value={formData.pricePerPerson}
        onChange={onChange}
        placeholder="Ej: 25.00"
        error={fieldErrors.pricePerPerson}
        required
        min="0"
        step="0.01"
      />
      <small>Precio en dólares por pasajero</small>
    </div>
  );
};

export default PricingSection;
