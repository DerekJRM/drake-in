import React from "react";

/**
 * Vista de reservaciones para operadores de bote
 * Muestra las reservaciones agrupadas por ruta y horario
 * @param {Array} reservations - Lista de reservaciones
 */
const OperatorView = ({ reservations = [] }) => {
  // Agrupar reservaciones por ruta y horario
  const groupedByRoute = reservations.reduce((acc, reservation) => {
    const routeKey = `${reservation.origin || "Sin origen"} → ${
      reservation.destination || "Sin destino"
    } (${reservation.schedule || "Sin horario"})`;

    if (!acc[routeKey]) {
      acc[routeKey] = [];
    }
    acc[routeKey].push(reservation);
    return acc;
  }, {});

  return (
    <div>
      <div>
        <h5>
          <i className="fas fa-ship"></i> Reservaciones por Ruta
        </h5>
      </div>
      <div>
        {Object.keys(groupedByRoute).length === 0 ? (
          <div>
            <p>No hay reservaciones para esta fecha</p>
          </div>
        ) : (
          Object.entries(groupedByRoute).map(([route, items]) => (
            <div key={route}>
              <h6>
                {route} - {items.length}{" "}
                {items.length === 1 ? "persona" : "personas"}
              </h6>
              <ul>
                {items.map((item, index) => (
                  <li key={index}>
                    {item.passengerName || item.name}
                    {item.hotel && ` - ${item.hotel}`}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OperatorView;
