import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ReservationsBoat = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [viewType, setViewType] = useState("Hotel");

  useEffect(() => {
    loadMockData();
  }, [selectedDate, viewType]);

  const loadMockData = () => {
    setLoading(true);
    setTimeout(() => {
      const mockReservations = [
        {
          id: 1,
          passengerName: "María González",
          email: "maria@example.com",
          origin: "Bocas del Toro",
          destination: "Almirante",
          date: "2024-01-15",
          schedule: "08:00 AM",
          hotel: "Drake Bay Resort",
          status: "confirmed",
        },
        {
          id: 2,
          passengerName: "Carlos Rodríguez",
          email: "carlos@example.com",
          origin: "Bocas del Toro",
          destination: "Almirante",
          date: "2024-01-15",
          schedule: "08:00 AM",
          hotel: "Drake Bay Resort",
          status: "confirmed",
        },
        {
          id: 3,
          passengerName: "Ana López",
          email: "ana@example.com",
          origin: "Bocas del Toro",
          destination: "Almirante",
          date: "2024-01-15",
          schedule: "08:00 AM",
          hotel: "Drake Bay Resort",
          status: "confirmed",
        },
        {
          id: 4,
          passengerName: "Juan Pérez",
          email: "juan@example.com",
          origin: "Almirante",
          destination: "Bocas del Toro",
          date: "2024-01-15",
          schedule: "10:00 AM",
          hotel: "Drake Bay Resort",
          status: "confirmed",
        },
        {
          id: 5,
          passengerName: "Laura Martínez",
          email: "laura@example.com",
          origin: "Almirante",
          destination: "Bocas del Toro",
          date: "2024-01-15",
          schedule: "10:00 AM",
          hotel: "Drake Bay Resort",
          status: "confirmed",
        },
      ];
      setReservations(mockReservations);
      setLoading(false);
    }, 500);
  };

  const groupReservationsBySchedule = () => {
    const grouped = {};
    reservations.forEach((reservation) => {
      const key = `${reservation.schedule}`;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(reservation);
    });
    return grouped;
  };

  const handleSearch = () => {
    loadMockData();
  };

  const groupedReservations = groupReservationsBySchedule();

  return (
    <div className="reservations-container">
      <div className="container-fluid">
        {/* Header */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="header-section">
              <div className="header-icon">
                <i className="bi bi-calendar-check"></i>
              </div>
              <h1 className="header-title">Reservaciones Realizadas</h1>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="filters-card">
              <div className="row g-3 align-items-end">
                <div className="col-md-4 col-12">
                  <label className="filter-label">
                    <i className="bi bi-calendar3"></i> Seleccionar fecha
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    placeholder="dd/mm/aaaa"
                  />
                </div>
                <div className="col-md-4 col-12">
                  <label className="filter-label">Vista como:</label>
                  <select
                    className="form-select"
                    value={viewType}
                    onChange={(e) => setViewType(e.target.value)}
                  >
                    <option value="Hotel">Hotel</option>
                    <option value="Operador">Operador</option>
                    <option value="Pasajero">Pasajero</option>
                  </select>
                </div>
                <div className="col-md-4 col-12">
                  <button
                    className="btn btn-search w-100"
                    onClick={handleSearch}
                  >
                    <i className="bi bi-search"></i> Buscar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        )}

        {/* Reservations List */}
        {!loading && (
          <div className="row">
            <div className="col-12">
              {Object.entries(groupedReservations).map(
                ([schedule, reservationsList]) => (
                  <div key={schedule} className="schedule-group mb-4">
                    {/* Schedule Header */}
                    <div className="schedule-header">
                      <i className="bi bi-building"></i>
                      <span className="schedule-title">
                        Llegadas por Horario -{" "}
                        {reservationsList[0]?.hotel || "Hotel"}
                      </span>
                    </div>

                    {/* Time and Passengers */}
                    <div className="time-section">
                      <div className="time-badge">
                        <i className="bi bi-clock"></i>
                        <span>
                          {schedule} - {reservationsList.length} personas
                        </span>
                      </div>
                      <div className="passengers-list">
                        {reservationsList.map((reservation) => (
                          <div key={reservation.id} className="passenger-item">
                            <i className="bi bi-person-fill"></i>
                            <span>{reservation.passengerName}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              )}

              {Object.keys(groupedReservations).length === 0 && (
                <div className="alert alert-info" role="alert">
                  <i className="bi bi-info-circle"></i> No hay reservaciones
                  para mostrar
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationsBoat;
