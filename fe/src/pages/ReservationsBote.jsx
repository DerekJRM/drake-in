import React, { useState, useEffect } from "react";
import ReservationFilters from "../components/reservations/ReservationFilters";
import OperatorView from "../components/reservations/OperatorView";

const ReservationsBote = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [error] = useState(""); // TODO: Add error handling when connecting to API

  useEffect(() => {
    // TODO: Replace with actual API call
    // fetchReservations(selectedDate);
    loadMockData();
  }, [selectedDate]);

  const loadMockData = () => {
    setLoading(true);
    setTimeout(() => {
      const mockReservations = [
        {
          id: 1,
          passengerName: "Juan Pérez",
          email: "juan@example.com",
          origin: "Bocas del Toro",
          destination: "Almirante",
          date: "2024-01-15",
          schedule: "08:00 AM",
          hotel: "Hotel Paradise",
          status: "confirmed",
        },
        {
          id: 2,
          passengerName: "María García",
          email: "maria@example.com",
          origin: "Almirante",
          destination: "Bocas del Toro",
          date: "2024-01-15",
          schedule: "10:00 AM",
          hotel: "Hotel Tropical",
          status: "pending",
        },
        {
          id: 3,
          passengerName: "Carlos Rodríguez",
          email: "carlos@example.com",
          origin: "Bocas del Toro",
          destination: "Almirante",
          date: "2024-01-15",
          schedule: "08:00 AM",
          hotel: "Hotel Paradise",
          status: "confirmed",
        },
        {
          id: 4,
          passengerName: "Ana Martínez",
          email: "ana@example.com",
          origin: "Almirante",
          destination: "Bocas del Toro",
          date: "2024-01-15",
          schedule: "02:00 PM",
          hotel: "Hotel Beach",
          status: "confirmed",
        },
        {
          id: 5,
          passengerName: "Luis Hernández",
          email: "luis@example.com",
          origin: "Bocas del Toro",
          destination: "Almirante",
          date: "2024-01-15",
          schedule: "10:00 AM",
          hotel: "Hotel Sunset",
          status: "cancelled",
        },
      ];
      setReservations(mockReservations);
      setLoading(false);
    }, 500);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSearch = () => {
    // TODO: Implementar búsqueda real
    console.log("Buscando reservaciones para:", selectedDate);
    loadMockData();
  };

  return (
    <div className="reservations-bote-container">
      <h1>Reservaciones de Bote</h1>

      <ReservationFilters
        date={selectedDate}
        onDateChange={handleDateChange}
        onSearch={handleSearch}
        showViewTypeSelector={false}
      />

      {loading && <p>Cargando reservaciones...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && <OperatorView reservations={reservations} />}
    </div>
  );
};

export default ReservationsBote;
