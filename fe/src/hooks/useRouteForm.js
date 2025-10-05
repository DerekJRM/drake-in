import { useState, useEffect } from "react";
import useFormValidation from "./useFormValidation";
import { usePuertos } from "./usePuertos";
import { useOperadores } from "./useOperadores";
import { useHorarios } from "./useHorarios";

const useRouteForm = (initialData, onSubmit, mode = "add") => {
  const [formData, setFormData] = useState({
    origin: initialData?.origin || "",
    destination: initialData?.destination || "",
    operatorId: initialData?.operatorId || "",
    pricePerPerson: initialData?.pricePerPerson || "",
    schedule: initialData?.schedule || "",
    calendarDate: initialData?.calendarDate || "",
    isActive: initialData?.isActive !== undefined ? initialData.isActive : true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cargar datos desde APIs
  const { data: puertosData, isLoading: loadingPuertos } = usePuertos();
  const { data: operadoresData, isLoading: loadingOperadores } =
    useOperadores();
  const { data: horariosData, isLoading: loadingHorarios } = useHorarios();

  // Validaciones
  const validateRouteForm = (data) => {
    const errors = {};

    // Validar origen
    if (!data.origin) {
      errors.origin = "El origen es requerido";
    }

    // Validar destino
    if (!data.destination) {
      errors.destination = "El destino es requerido";
    }

    // Validar que origen y destino sean diferentes
    if (data.origin && data.destination && data.origin === data.destination) {
      errors.destination = "El origen y destino no pueden ser iguales";
    }

    // Validar operador
    if (!data.operatorId) {
      errors.operatorId = "El operador es requerido";
    }

    // Validar precio
    if (!data.pricePerPerson) {
      errors.pricePerPerson = "El precio por persona es requerido";
    } else if (isNaN(data.pricePerPerson)) {
      errors.pricePerPerson = "El precio debe ser un número válido";
    } else if (parseFloat(data.pricePerPerson) <= 0) {
      errors.pricePerPerson = "El precio debe ser mayor a 0";
    } else if (parseFloat(data.pricePerPerson) > 10000) {
      errors.pricePerPerson =
        "El precio parece demasiado alto. Verifica el monto.";
    }

    // Validar horario
    if (!data.schedule) {
      errors.schedule = "El horario es requerido";
    }

    // Validar fecha
    if (!data.calendarDate) {
      errors.calendarDate = "La fecha es requerida";
    } else {
      const selectedDate = new Date(data.calendarDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // No permitir fechas pasadas
      if (selectedDate < today) {
        errors.calendarDate = "No se pueden crear rutas para fechas pasadas";
      }

      // Advertir si la fecha es muy lejana (más de 1 año)
      const oneYearFromNow = new Date();
      oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
      if (selectedDate > oneYearFromNow) {
        errors.calendarDate =
          "La fecha no puede ser mayor a 1 año en el futuro";
      }
    }

    return errors;
  };

  const { fieldErrors, validate, clearFieldError } =
    useFormValidation(validateRouteForm);

  // Actualizar formData si cambian los initialData
  useEffect(() => {
    if (initialData) {
      setFormData({
        origin: initialData.origin || "",
        destination: initialData.destination || "",
        operatorId: initialData.operatorId || "",
        pricePerPerson: initialData.pricePerPerson || "",
        schedule: initialData.schedule || "",
        calendarDate: initialData.calendarDate || "",
        isActive:
          initialData.isActive !== undefined ? initialData.isActive : true,
      });
    }
  }, [initialData]);

  // Preparar opciones para los selects
  const locationOptions = [
    { value: "", label: "Seleccione un puerto" },
    ...(puertosData?.map((puerto) => ({
      value: puerto.id || puerto.nombre,
      label: puerto.nombre,
    })) || []),
  ];

  // Filtrar destinos para excluir el origen seleccionado
  const destinationOptions = [
    { value: "", label: "Seleccione un puerto" },
    ...(puertosData
      ?.filter((puerto) => {
        const puertoValue = puerto.id || puerto.nombre;
        return String(puertoValue) !== String(formData.origin);
      })
      .map((puerto) => ({
        value: puerto.id || puerto.nombre,
        label: puerto.nombre,
      })) || []),
  ];

  const operatorOptions = [
    { value: "", label: "Seleccione un operador" },
    ...(operadoresData?.map((operador) => ({
      value: operador.id,
      label: `${operador.nombre} - ${operador.nombreBote || "Bote"}`,
    })) || []),
  ];

  const scheduleOptions = [
    { value: "", label: "Seleccione un horario" },
    ...(horariosData?.map((horario) => {
      const horaFormateada = horario.hora
        ? horario.hora.substring(0, 5)
        : horario.hora;
      return {
        value: horario.id,
        label: horaFormateada,
      };
    }) || []),
  ];

  // Handlers
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => {
      // Si cambia el origen, resetear el destino si era igual al nuevo origen
      if (name === "origin" && String(value) === String(prev.destination)) {
        return {
          ...prev,
          [name]: type === "checkbox" ? checked : value,
          destination: "", // Resetear destino
        };
      }

      // Si cambia el destino a un valor igual al origen, prevenir
      if (name === "destination" && String(value) === String(prev.origin)) {
        return prev; // No actualizar
      }

      return {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
    });

    clearFieldError(name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate(formData)) {
      return;
    }

    setIsSubmitting(true);

    try {
      const processedData = {
        origenId: parseInt(formData.origin, 10),
        fecha: formData.calendarDate,
        horarioId: parseInt(formData.schedule, 10),
        operadorId: parseInt(formData.operatorId, 10),
        _localData: {
          destination: formData.destination,
          pricePerPerson: parseFloat(formData.pricePerPerson),
          isActive: formData.isActive,
        },
      };

      await onSubmit(processedData);
    } catch (error) {
      console.error("Error al guardar ruta:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    fieldErrors,
    isSubmitting,
    locationOptions,
    destinationOptions,
    operatorOptions,
    scheduleOptions,
    loadingPuertos,
    loadingOperadores,
    loadingHorarios,
    handleChange,
    handleSubmit,
  };
};

export default useRouteForm;
