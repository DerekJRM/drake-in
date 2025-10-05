import React, { useState } from "react";
import { VIEW_TYPES } from "../utils/constants";
import ReservationFilters from "../components/reservations/ReservationFilters";
import HotelView from "../components/reservations/HotelView";
import OperatorView from "../components/reservations/OperatorView";

const ReservationsHotel = () => {
  const [date, setDate] = useState("");
  const [viewType, setViewType] = useState(VIEW_TYPES.HOTEL);
  const [reservations, setReservations] = useState([]);

  const handleSearch = () => {
    console.log("Buscando reservaciones para:", date, viewType);

    // TODO: Llamar al servicio de reservaciones
    // const data = await getReservations(date, viewType);
    // setReservations(data);

    // Datos de ejemplo
    const mockReservations = [
      {
        id: 1,
        passengerName: "María González",
        email: "maria@example.com",
        origin: "Sierpe",
        destination: "Bahía Drake",
        date: date || "2025-10-05",
        schedule: "08:00 AM",
        hotel: "Drake Bay Resort",
        status: "Confirmada",
      },
      {
        id: 2,
        passengerName: "Carlos Rodríguez",
        email: "carlos@example.com",
        origin: "Sierpe",
        destination: "Bahía Drake",
        date: date || "2025-10-05",
        schedule: "08:00 AM",
        hotel: "La Paloma Lodge",
        status: "Confirmada",
      },
      {
        id: 3,
        passengerName: "Ana López",
        email: "ana@example.com",
        origin: "Sierpe",
        destination: "Bahía Drake",
        date: date || "2025-10-05",
        schedule: "08:00 AM",
        hotel: "Drake Bay Resort",
        status: "Pendiente",
      },
      {
        id: 4,
        passengerName: "Juan Pérez",
        email: "juan@example.com",
        origin: "Sierpe",
        destination: "Bahía Drake",
        date: date || "2025-10-05",
        schedule: "10:00 AM",
        hotel: "Aguila de Osa",
        status: "Confirmada",
      },
      {
        id: 5,
        passengerName: "Laura Martínez",
        email: "laura@example.com",
        origin: "Bahía Drake",
        destination: "Puerto Jiménez",
        date: date || "2025-10-05",
        schedule: "10:00 AM",
        hotel: "Copa de Árbol",
        status: "Confirmada",
      },
    ];

    setReservations(mockReservations);
  };

  return (
    <div>
      <h2>
        <i className="fas fa-calendar-check"></i> Reservaciones Realizadas
      </h2>

      <div>
        <ReservationFilters
          date={date}
          onDateChange={setDate}
          viewType={viewType}
          onViewTypeChange={setViewType}
          onSearch={handleSearch}
        />
      </div>


      <div>
        {viewType === VIEW_TYPES.HOTEL && (
          <HotelView reservations={reservations} hotelName="Drake Bay Resort" />
        )}

        {viewType === VIEW_TYPES.OPERATOR && (
          <OperatorView reservations={reservations} />
        )}
      </div>
    </div>
  );
};

export default ReservationsHotel;
