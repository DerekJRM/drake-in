import React from "react";

/**
 * Componente reutilizable para botones de envío de formularios
 * @param {boolean} isSubmitting - Si el formulario está siendo enviado
 * @param {string} label - Texto del botón en estado normal
 * @param {string} loadingLabel - Texto del botón en estado de carga
 * @param {boolean} disabled - Si el botón está deshabilitado
 * @param {string} type - Tipo de botón (submit, button, reset)
 */
const SubmitButton = ({
  isSubmitting = false,
  label = "Enviar",
  loadingLabel = "Enviando...",
  disabled = false,
  type = "submit",
}) => {
  return (
    <div>
      <button type={type} disabled={isSubmitting || disabled}>
        {isSubmitting ? loadingLabel : label}
      </button>
    </div>
  );
};

export default SubmitButton;
