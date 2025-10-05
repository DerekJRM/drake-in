import React from "react";

/**
 * Vista de reservaciones para hoteles
 * Muestra las llegadas agrupadas por horario
 * @param {Array} reservations - Lista de reservaciones
 * @param {string} hotelName - Nombre del hotel
 */
const HotelView = ({ reservations = [], hotelName = "Drake Bay Resort" }) => {
  // Agrupar reservaciones por horario
  const groupedBySchedule = reservations.reduce((acc, reservation) => {
    const schedule = reservation.schedule || "Sin horario";
    if (!acc[schedule]) {
      acc[schedule] = [];
    }
    acc[schedule].push(reservation);
    return acc;
  }, {});

  return (
    <div>
      <div>
        <h5>
          <i className="fas fa-hotel"></i> Llegadas por Horario - {hotelName}
        </h5>
      </div>
      <div>
        {Object.keys(groupedBySchedule).length === 0 ? (
          <div>
            <p>No hay reservaciones para esta fecha</p>
          </div>
        ) : (
          Object.entries(groupedBySchedule).map(([schedule, items]) => (
            <div key={schedule}>
              <h6>
                {schedule} - {items.length}{" "}
                {items.length === 1 ? "persona" : "personas"}
              </h6>
              <ul>
                {items.map((item, index) => (
                  <li key={index}>{item.passengerName || item.name}</li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HotelView;
