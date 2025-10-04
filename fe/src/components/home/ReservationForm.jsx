import React from "react";
import { SubmitButton } from "../common";
import TravelDetailsSection from "./TravelDetailsSection";
import DateTimeSection from "./DateTimeSection";
import PassengerInfoSection from "./PassengerInfoSection";
import HotelSection from "./HotelSection";
import useReservationForm from "../../hooks/useReservationForm";

const ReservationForm = () => {
  // Hook personalizado que maneja toda la lógica del formulario
  const {
    formData,
    fieldErrors,
    isSubmitting,
    originOptions,
    destinationOptions,
    hotelOptions,
    horarios,
    loadingPuertos,
    errorPuertos,
    loadingHorarios,
    errorHorarios,
    canPickSchedule,
    handleChange,
    handleSubmit,
  } = useReservationForm();

  return (
    <div>
      <h3>Reservar tu Viaje</h3>
      <form onSubmit={handleSubmit} noValidate>
        <TravelDetailsSection
          formData={formData}
          fieldErrors={fieldErrors}
          onChange={handleChange}
          originOptions={originOptions}
          destinationOptions={destinationOptions}
          loadingPuertos={loadingPuertos}
          errorPuertos={errorPuertos}
        />

        <DateTimeSection
          formData={formData}
          fieldErrors={fieldErrors}
          onChange={handleChange}
          horarios={horarios}
          loadingHorarios={loadingHorarios}
          errorHorarios={errorHorarios}
          canPickSchedule={canPickSchedule}
        />

        <PassengerInfoSection
          formData={formData}
          fieldErrors={fieldErrors}
          onChange={handleChange}
        />

        <HotelSection
          formData={formData}
          fieldErrors={fieldErrors}
          onChange={handleChange}
          hotelOptions={hotelOptions}
        />

        <SubmitButton
          isSubmitting={isSubmitting}
          label="Reservar Viaje"
          loadingLabel="Enviando..."
        />
      </form>
    </div>
  );
};

export default ReservationForm;
