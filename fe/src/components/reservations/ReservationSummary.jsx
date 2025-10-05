import React from "react";

/**
 * Componente de resumen de reservación
 * Muestra los detalles de una reservación específica
 * @param {object} reservation - Datos de la reservación
 */
const ReservationSummary = ({ reservation }) => {
  if (!reservation) {
    return (
      <div>
        <p>No hay información de reservación disponible</p>
      </div>
    );
  }

  return (
    <div>
      <h5>
        <i className="fas fa-info-circle"></i> Resumen de Reservación
      </h5>
      <div>
        <div>
          <strong>Pasajero:</strong>
          <span>{reservation.passengerName || reservation.name}</span>
        </div>

        <div>
          <strong>Email:</strong>
          <span>{reservation.email}</span>
        </div>

        <div>
          <strong>Origen:</strong>
          <span>{reservation.origin}</span>
        </div>

        <div>
          <strong>Destino:</strong>
          <span>{reservation.destination}</span>
        </div>

        <div>
          <strong>Fecha:</strong>
          <span>{reservation.date}</span>
        </div>

        <div>
          <strong>Horario:</strong>
          <span>{reservation.schedule}</span>
        </div>

        {reservation.hotel && (
          <div>
            <strong>Hotel:</strong>
            <span>{reservation.hotel}</span>
          </div>
        )}

        <div>
          <strong>Estado:</strong>
          <span>{reservation.status || "Pendiente"}</span>
        </div>
      </div>
    </div>
  );
};

export default ReservationSummary;
