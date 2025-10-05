import React from "react";
import { TextInput, FieldError } from "../common";

/**
 * Sección del formulario para información del pasajero
 * @param {object} formData - Datos del formulario
 * @param {object} fieldErrors - Errores de validación
 * @param {function} onChange - Manejador de cambios
 */
const PassengerInfoSection = ({ formData, fieldErrors, onChange }) => {
  return (
    <fieldset style={{ border: "none", padding: 0 }}>
      <legend className="sr-only">Datos del pasajero</legend>

      <div>
        <TextInput
          id="name"
          label="Nombre completo"
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
          placeholder="Tu nombre completo"
          required
        />
        <FieldError error={fieldErrors.name} />
      </div>

      <div>
        <TextInput
          id="email"
          label="Correo electrónico"
          type="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          placeholder="tu@email.com"
          required
        />
        <FieldError error={fieldErrors.email} />
      </div>
    </fieldset>
  );
};

export default PassengerInfoSection;
