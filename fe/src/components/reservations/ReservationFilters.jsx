import React from "react";
import { DateInput, SelectField } from "../common";

/**
 * Componente de filtros para reservaciones
 * @param {string} date - Fecha seleccionada
 * @param {function} onDateChange - Manejador de cambio de fecha
 * @param {string} viewType - Tipo de vista (hotel/operador)
 * @param {function} onViewTypeChange - Manejador de cambio de tipo de vista
 * @param {function} onSearch - Manejador de búsqueda
 * @param {boolean} showViewTypeSelector - Si debe mostrar el selector de tipo de vista
 */
const ReservationFilters = ({
  date,
  onDateChange,
  viewType,
  onViewTypeChange,
  onSearch,
  showViewTypeSelector = true,
}) => {
  const viewTypeOptions = [
    { value: "hotel", label: "Hotel" },
    { value: "operator", label: "Operador de Bote" },
  ];

  return (
    <div>
      <div>
        <div>
          <DateInput
            id="reservationDate"
            label="Seleccionar fecha"
            name="date"
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
            required={false}
            disablePastDates={false}
          />
        </div>

        {showViewTypeSelector && (
          <div>
            <SelectField
              id="viewType"
              label="Vista como:"
              name="viewType"
              value={viewType}
              onChange={(e) => onViewTypeChange(e.target.value)}
              options={viewTypeOptions}
              required={false}
            />
          </div>
        )}

        <div style={{ paddingTop: "2rem" }}>
          <button onClick={onSearch}>
            <i className="fas fa-search"></i> Buscar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationFilters;
