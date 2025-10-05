import { useState, useCallback, useMemo } from "react";
import { HOTELS } from "../utils/constants";
import { useHorarios } from "./useHorarios";
import { usePuertos } from "./usePuertos";
import useFormValidation from "./useFormValidation.js";
import { validateReservationForm } from "../utils/validators";

/**
 * Hook personalizado para manejar toda la lógica del formulario de reservación
 * @returns {object} - Objeto con estado y funciones del formulario
 */
const useReservationForm = () => {
  // Hooks para datos externos
  const {
    data: horariosData,
    isLoading: loadingHorarios,
    isError: errorHorarios,
  } = useHorarios();

  const {
    data: puertosData,
    isLoading: loadingPuertos,
    isError: errorPuertos,
  } = usePuertos();

  // Estado del formulario
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    date: "",
    schedule: "",
    name: "",
    email: "",
    hotel: "",
  });

  // Hook de validación
  const { fieldErrors, validate, clearFieldError, clearAllErrors } =
    useFormValidation(validateReservationForm);

  // Normaliza opciones de puertos/hoteles/horarios
  const puertos = useMemo(() => puertosData ?? [], [puertosData]);
  const originOptions = useMemo(() => puertos, [puertos]);

  const destinationOptions = useMemo(() => {
    // Evita que destino sea igual a origen
    return puertos.filter((p) => String(p.id) !== String(formData.origin));
  }, [puertos, formData.origin]);

  const hotelOptions = useMemo(
    () => HOTELS.map((h) => ({ value: h.value, label: h.label })),
    []
  );

  const horarios = useMemo(() => horariosData ?? [], [horariosData]);

  // Reglas para habilitar horario: necesitamos origen, destino y fecha
  const canPickSchedule = useMemo(
    () => !!(formData.origin && formData.destination && formData.date),
    [formData.origin, formData.destination, formData.date]
  );

  /**
   * Maneja cambios en los campos del formulario
   */
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      setFormData((prev) => {
        // Si cambia origin, destination o date, invalida horario seleccionado
        if (name === "origin" || name === "destination" || name === "date") {
          return { ...prev, [name]: value, schedule: "" };
        }
        return { ...prev, [name]: value };
      });

      // Limpia error del campo si lo había
      clearFieldError(name);
    },
    [clearFieldError]
  );

  /**
   * Resetea el formulario a su estado inicial
   */
  const resetForm = useCallback(() => {
    setFormData({
      origin: "",
      destination: "",
      date: "",
      schedule: "",
      name: "",
      email: "",
      hotel: "",
    });
    clearAllErrors();
  }, [clearAllErrors]);

  /**
   * Maneja el envío del formulario
   */
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // Valida el formulario
      if (!validate(formData)) {
        return;
      }

      try {
        setIsSubmitting(true);

        // TODO: Llamar al endpoint de reservas
        // await createReservation(formData);

        // Simulación de envío
        await new Promise((resolve) => setTimeout(resolve, 1000));

        alert(
          "¡Reservación enviada exitosamente! Te contactaremos pronto para confirmar tu viaje."
        );

        resetForm();
      } catch (err) {
        console.error("Error al enviar reservación:", err);
        alert("No se pudo enviar la reservación. Intenta nuevamente.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, validate, resetForm]
  );

  return {
    // Estado del formulario
    formData,
    fieldErrors,
    isSubmitting,

    // Opciones para los selects
    originOptions,
    destinationOptions,
    hotelOptions,
    horarios,

    // Estados de carga y error
    loadingPuertos,
    errorPuertos,
    loadingHorarios,
    errorHorarios,

    // Reglas de negocio
    canPickSchedule,

    // Funciones
    handleChange,
    handleSubmit,
    resetForm,
  };
};

export default useReservationForm;
