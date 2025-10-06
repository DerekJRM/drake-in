/**
 * Validaciones para formularios de la aplicación
 */

import { USER_TYPES, VALIDATION_RULES } from "./constants";

/**
 * Valida formato de email
 * @param {string} email - Email a validar
 * @returns {boolean} - True si el email es válido
 */
export const isValidEmail = (email) => {
  if (!email) return false;
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
};

/**
 * Valida que un nombre contenga solo caracteres válidos
 * Permite: letras (con tildes), espacios, guiones, puntos y apóstrofes
 * No valida longitud, solo caracteres
 * @param {string} name - Nombre a validar
 * @returns {boolean} - True si el nombre contiene solo caracteres válidos
 */
export const isValidName = (name) => {
  if (!name || typeof name !== "string") return false;
  // Permite letras (incluyendo acentos/tildes), espacios, guiones, apóstrofes y puntos
  // pero previene números y caracteres especiales problemáticos
  const validNameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s.'-]+$/;
  return validNameRegex.test(name.trim());
};

/**
 * Valida que un texto contenga solo caracteres válidos para nombres
 * Permite: letras (con tildes), números, espacios, guiones, puntos y apóstrofes
 * No permite: caracteres especiales problemáticos (@, #, $, %, &, *, etc.)
 * @param {string} text - Texto a validar
 * @returns {boolean} - True si el texto contiene solo caracteres válidos
 */
export const isValidTextString = (text) => {
  if (!text || typeof text !== "string") return false;
  // Permite letras (incluyendo acentos/tildes), espacios, guiones, apóstrofes, puntos y números
  // pero previene caracteres especiales problemáticos como @, #, $, %, &, *, etc.
  const validTextRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s.'-]+$/;
  return validTextRegex.test(text.trim());
};

/**
 * Valida que un campo no esté vacío
 * @param {string|number} value - Valor a validar
 * @returns {boolean} - True si el valor no está vacío
 */
export const isRequired = (value) => {
  if (typeof value === "string") {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined && value !== "";
};

/**
 * Valida el formulario de reservación completo
 * @param {object} formData - Datos del formulario
 * @returns {object} - Objeto con errores de validación (vacío si no hay errores)
 */
export const validateReservationForm = (formData) => {
  const errors = {};

  // Validar origen
  if (!isRequired(formData.origin)) {
    errors.origin = "Selecciona un origen.";
  }

  // Validar destino
  if (!isRequired(formData.destination)) {
    errors.destination = "Selecciona un destino.";
  } else if (
    formData.origin &&
    formData.destination &&
    formData.origin === formData.destination
  ) {
    errors.destination = "El destino no puede ser igual al origen.";
  }

  // Validar fecha
  if (!isRequired(formData.date)) {
    errors.date = "Selecciona una fecha.";
  }

  // Validar horario
  if (!isRequired(formData.schedule)) {
    errors.schedule = "Selecciona un horario.";
  }

  // Validar nombre
  if (!isRequired(formData.name)) {
    errors.name = "Ingresa tu nombre completo.";
  } else if (!isValidName(formData.name)) {
    errors.name =
      "El nombre contiene caracteres no válidos. Solo se permiten letras, espacios, guiones y puntos.";
  }

  // Validar email
  if (!isRequired(formData.email)) {
    errors.email = "Ingresa tu correo.";
  } else if (!isValidEmail(formData.email)) {
    errors.email = "Correo inválido.";
  }

  // Validar hotel
  if (!isRequired(formData.hotel)) {
    errors.hotel = "Selecciona un hotel.";
  }

  return errors;
};

/**
 * Valida formulario de login
 * @param {object} formData - Datos del formulario (email/username, password)
 * @returns {object} - Objeto con errores de validación
 */
export const validateLoginForm = (formData) => {
  const errors = {};

  // Validar email o nombre de usuario (campo único)
  if (!isRequired(formData.email)) {
    errors.email = "Ingresa tu correo o nombre de usuario.";
  }
  // Si tiene formato de email, validar que sea válido
  // Si no tiene @, asumimos que es nombre de usuario (no validamos formato)
  else if (formData.email.includes("@") && !isValidEmail(formData.email)) {
    errors.email = "El formato del correo no es válido.";
  }

  if (!isRequired(formData.password)) {
    errors.password = "Ingresa tu contraseña.";
  } else if (formData.password.length < VALIDATION_RULES.MIN_PASSWORD_LENGTH) {
    errors.password = `La contraseña debe tener al menos ${VALIDATION_RULES.MIN_PASSWORD_LENGTH} caracteres.`;
  }

  return errors;
};

/**
 * Valida formulario de registro
 * @param {object} formData - Datos del formulario
 * @returns {object} - Objeto con errores de validación
 */
export const validateRegisterForm = (formData) => {
  const errors = {};

  // Validar tipo de usuario
  if (!isRequired(formData.userType)) {
    errors.userType = "Selecciona el tipo de usuario.";
  }

  // Validar nombre del hotel si es tipo hotel
  if (formData.userType === USER_TYPES.HOTEL) {
    if (!isRequired(formData.hotelName)) {
      errors.hotelName = "Ingresa el nombre del hotel.";
    } else if (!isValidName(formData.hotelName)) {
      errors.hotelName =
        "El nombre del hotel contiene caracteres no válidos. Solo se permiten letras, espacios, guiones y puntos.";
    }
  }

  // Validar nombre del bote si es tipo operador
  if (formData.userType === USER_TYPES.OPERATOR) {
    if (!isRequired(formData.boatName)) {
      errors.boatName = "Ingresa el nombre del bote.";
    } else if (!isValidName(formData.boatName)) {
      errors.boatName =
        "El nombre del bote contiene caracteres no válidos. Solo se permiten letras, espacios, guiones y puntos.";
    }
  }

  // Validar email
  if (!isRequired(formData.email)) {
    errors.email = "Ingresa tu correo electrónico.";
  } else if (!isValidEmail(formData.email)) {
    errors.email = "El correo electrónico no es válido.";
  }

  // Validar contraseña
  if (!isRequired(formData.password)) {
    errors.password = "Ingresa tu contraseña.";
  } else if (formData.password.length < VALIDATION_RULES.MIN_PASSWORD_LENGTH) {
    errors.password = `La contraseña debe tener al menos ${VALIDATION_RULES.MIN_PASSWORD_LENGTH} caracteres.`;
  } else if (formData.password.length > VALIDATION_RULES.MAX_PASSWORD_LENGTH) {
    errors.password = `La contraseña no puede tener más de ${VALIDATION_RULES.MAX_PASSWORD_LENGTH} caracteres.`;
  }

  return errors;
};
