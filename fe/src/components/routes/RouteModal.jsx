import React from "react";
import RouteForm from "./RouteForm";

/**
 * Modal reutilizable para agregar o editar rutas
 * @param {boolean} isOpen - Si el modal está abierto
 * @param {function} onClose - Función para cerrar el modal
 * @param {string} mode - Modo del modal: 'add' o 'edit'
 * @param {object} routeData - Datos de la ruta (solo para modo edit)
 * @param {function} onSave - Función callback cuando se guarda la ruta
 */
const RouteModal = ({
  isOpen,
  onClose,
  mode = "add",
  routeData = null,
  onSave,
}) => {
  if (!isOpen) return null;

  const handleSave = (formData) => {
    onSave(formData);
    onClose();
  };

  return (
    <div>
      <div>
        <div>
          <div>
            <h5>{mode === "add" ? "Agregar Nueva Ruta" : "Editar Ruta"}</h5>
            <button onClick={onClose} type="button">
              <span>&times;</span>
            </button>
          </div>
          <div>
            <RouteForm
              initialData={routeData}
              onSubmit={handleSave}
              onCancel={onClose}
              mode={mode}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteModal;
