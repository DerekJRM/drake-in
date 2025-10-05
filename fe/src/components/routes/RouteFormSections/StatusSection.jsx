import React from "react";

/**
 * Sección de estado de la ruta (activa/inactiva)
 * @param {object} formData - Datos del formulario
 * @param {function} onChange - Manejador de cambios
 */
const StatusSection = ({ formData, onChange }) => {
  return (
    <div>
      <h4>Estado</h4>

      <label>
        <input
          type="checkbox"
          name="isActive"
          checked={formData.isActive}
          onChange={onChange}
        />{" "}
        <strong>Ruta Activa</strong>
      </label>
      <small style={{ display: "block", marginTop: "5px" }}>
        Desmarca esta opción para desactivar temporalmente la ruta
      </small>
    </div>
  );
};

export default StatusSection;
