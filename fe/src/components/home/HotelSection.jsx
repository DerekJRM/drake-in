import React from "react";
import { SelectField, FieldError } from "../common";

/**
 * Sección del formulario para selección de hotel
 * @param {object} formData - Datos del formulario
 * @param {object} fieldErrors - Errores de validación
 * @param {function} onChange - Manejador de cambios
 * @param {array} hotelOptions - Opciones de hoteles disponibles
 */
const HotelSection = ({ formData, fieldErrors, onChange, hotelOptions }) => {
  return (
    <div>
      <SelectField
        id="hotel"
        label="Hotel de destino"
        name="hotel"
        value={formData.hotel}
        onChange={onChange}
        required
        placeholder="Selecciona tu hotel"
        options={hotelOptions}
      />
      <FieldError error={fieldErrors.hotel} />
    </div>
  );
};

export default HotelSection;
