import { useState, useCallback } from "react";

/**
 * Hook personalizado para manejar validación de formularios
 * @param {function} validationFunction - Función que valida el formulario
 * @returns {object} - Objeto con fieldErrors y funciones de validación
 */
const useFormValidation = (validationFunction) => {
  const [fieldErrors, setFieldErrors] = useState({});

  /**
   * Valida el formulario completo
   * @param {object} formData - Datos del formulario a validar
   * @returns {boolean} - True si el formulario es válido
   */
  const validate = useCallback(
    (formData) => {
      const errors = validationFunction(formData);
      setFieldErrors(errors);
      return Object.keys(errors).length === 0;
    },
    [validationFunction]
  );

  /**
   * Limpia el error de un campo específico
   * @param {string} fieldName - Nombre del campo
   */
  const clearFieldError = useCallback((fieldName) => {
    setFieldErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  }, []);

  /**
   * Limpia todos los errores
   */
  const clearAllErrors = useCallback(() => {
    setFieldErrors({});
  }, []);

  /**
   * Establece un error específico en un campo
   * @param {string} fieldName - Nombre del campo
   * @param {string} errorMessage - Mensaje de error
   */
  const setFieldError = useCallback((fieldName, errorMessage) => {
    setFieldErrors((prev) => ({
      ...prev,
      [fieldName]: errorMessage,
    }));
  }, []);

  return {
    fieldErrors,
    validate,
    clearFieldError,
    clearAllErrors,
    setFieldError,
  };
};

export default useFormValidation;
