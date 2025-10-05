import React, { useState, useCallback } from "react";
import { TextInput, FieldError, SubmitButton } from "../common";
import { validateRegisterForm } from "../../utils/validators";
import useFormValidation from "../../hooks/useFormValidation";

/**
 * Formulario de registro de usuario
 */
const RegisterForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Hook de validación
  const { fieldErrors, validate, clearFieldError } =
    useFormValidation(validateRegisterForm);

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
        console.error("Error al registrar usuario:", error);
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
          id="name"
          label="Nombre completo"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
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
          placeholder="Mínimo 6 caracteres"
          required
        />
        <FieldError error={fieldErrors.password} />
      </div>

      <div>
        <TextInput
          id="confirmPassword"
          label="Confirmar contraseña"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Repite tu contraseña"
          required
        />
        <FieldError error={fieldErrors.confirmPassword} />
      </div>

      <SubmitButton
        isSubmitting={isSubmitting}
        label="Registrarse"
        loadingLabel="Registrando..."
      />
    </form>
  );
};

export default RegisterForm;
