import React, { useState, useCallback } from "react";
import { TextInput, FieldError, SubmitButton } from "../common";
import { validateLoginForm } from "../../utils/validators";
import useFormValidation from "../../hooks/useFormValidation.js";

/**
 * Formulario de inicio de sesión
 */
const LoginForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Hook de validación
  const { fieldErrors, validate, clearFieldError } =
    useFormValidation(validateLoginForm);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      clearFieldError(name);
    },
    [clearFieldError]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!validate(formData)) {
        return;
      }

      try {
        setIsSubmitting(true);
        await onSubmit(formData);
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, validate, onSubmit]
  );

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <TextInput
          id="email"
          label="Correo electrónico"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="tu@email.com"
          required
        />
        <FieldError error={fieldErrors.email} />
      </div>

      <div>
        <TextInput
          id="password"
          label="Contraseña"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Tu contraseña"
          required
        />
        <FieldError error={fieldErrors.password} />
      </div>

      <SubmitButton
        isSubmitting={isSubmitting}
        label="Iniciar Sesión"
        loadingLabel="Iniciando sesión..."
      />
    </form>
  );
};

export default LoginForm;
