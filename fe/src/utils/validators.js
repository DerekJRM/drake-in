/**
 * Validaciones para formularios de la aplicación
 */

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
 * Valida que un nombre tenga mínimo 3 caracteres
 * @param {string} name - Nombre a validar
 * @returns {boolean} - True si el nombre es válido
 */
export const isValidName = (name) => {
  return name && name.trim().length >= 3;
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
  if (!isValidName(formData.name)) {
    errors.name = "Ingresa tu nombre completo (mínimo 3 caracteres).";
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
 * @param {object} formData - Datos del formulario (email, password)
 * @returns {object} - Objeto con errores de validación
 */
export const validateLoginForm = (formData) => {
  const errors = {};

  if (!isRequired(formData.email)) {
    errors.email = "Ingresa tu correo.";
  } else if (!isValidEmail(formData.email)) {
    errors.email = "Correo inválido.";
  }

  if (!isRequired(formData.password)) {
    errors.password = "Ingresa tu contraseña.";
  } else if (formData.password.length < 6) {
    errors.password = "La contraseña debe tener al menos 6 caracteres.";
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

  if (!isValidName(formData.name)) {
    errors.name = "Ingresa tu nombre completo (mínimo 3 caracteres).";
  }

  if (!isRequired(formData.email)) {
    errors.email = "Ingresa tu correo.";
  } else if (!isValidEmail(formData.email)) {
    errors.email = "Correo inválido.";
  }

  if (!isRequired(formData.password)) {
    errors.password = "Ingresa tu contraseña.";
  } else if (formData.password.length < 6) {
    errors.password = "La contraseña debe tener al menos 6 caracteres.";
  }

  if (!isRequired(formData.confirmPassword)) {
    errors.confirmPassword = "Confirma tu contraseña.";
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Las contraseñas no coinciden.";
  }

  return errors;
};
