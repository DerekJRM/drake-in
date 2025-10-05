import React from "react";
import { useOperadorById } from "../../hooks/useOperadores";

/**
 * Componente individual para mostrar una ruta
 * @param {object} route - Datos de la ruta
 * @param {function} onEdit - Función para editar la ruta
 * @param {function} onDelete - Función para eliminar la ruta
 */
const RouteItem = ({ route, onEdit, onDelete }) => {
  // Cargar información del operador dinámicamente
  const { data: operadorData } = useOperadorById(route.operatorId);

  const handleDelete = () => {
    if (
      window.confirm(
        `¿Estás seguro de que quieres eliminar la ruta ${route.origin} → ${route.destination}?`
      )
    ) {
      onDelete(route.id);
    }
  };

  // Obtener nombre del operador desde los datos cargados
  const getOperatorName = () => {
    if (operadorData) {
      return `${operadorData.nombre} - ${operadorData.nombreBote || "Bote"}`;
    }
    return "Cargando...";
  };

  return (
    <div>
      <div>
        <div>
          <h6>
            {route.origin} → {route.destination}
            {route.isActive ? (
              <span
                style={{
                  color: "green",
                  marginLeft: "10px",
                  fontSize: "0.9em",
                }}
              >
                ✓ Activa
              </span>
            ) : (
              <span
                style={{ color: "red", marginLeft: "10px", fontSize: "0.9em" }}
              >
                ✗ Inactiva
              </span>
            )}
          </h6>
          <p>
            <strong>Operador:</strong> {getOperatorName()}
          </p>
          <p>
            <strong>Precio por persona:</strong> ${route.pricePerPerson}
          </p>
          <p>
            <strong>Fecha:</strong> {route.calendarDate}
          </p>
          <p>
            <strong>Horario:</strong> {route.schedule}
          </p>
        </div>
        <div>
          <button onClick={() => onEdit(route)}>
            <i className="fas fa-edit"></i> Editar
          </button>
          <button onClick={handleDelete}>
            <i className="fas fa-trash"></i> Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default RouteItem;
