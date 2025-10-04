import React, { useState } from "react";
import { VIEW_TYPES } from "../utils/constants";

const Reservations = () => {
  const [date, setDate] = useState("");
  const [viewType, setViewType] = useState(VIEW_TYPES.HOTEL);

  const handleSearch = () => {
    console.log("Buscando reservaciones para:", date, viewType);
  };

  return (
    <div>
      <h2>Reservaciones Realizadas</h2>

      <div>
        <div>
          <div>
            <label>Seleccionar fecha</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label>Vista como:</label>
            <select
              value={viewType}
              onChange={(e) => setViewType(e.target.value)}
            >
              <option value={VIEW_TYPES.HOTEL}>Hotel</option>
              <option value={VIEW_TYPES.OPERATOR}>Operador de Bote</option>
            </select>
          </div>
          <div>
            <button onClick={handleSearch}>Buscar</button>
          </div>
        </div>
      </div>

      <div>
        {viewType === VIEW_TYPES.HOTEL && (
          <div>
            <div>
              <h5>Llegadas por Horario - Drake Bay Resort</h5>
            </div>
            <div>
              <div>
                <h6>08:00 AM - 3 personas</h6>
                <ul>
                  <li>María González</li>
                  <li>Carlos Rodríguez</li>
                  <li>Ana López</li>
                </ul>
              </div>
              <div>
                <h6>10:00 AM - 2 personas</h6>
                <ul>
                  <li>Juan Pérez</li>
                  <li>Laura Martínez</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {viewType === VIEW_TYPES.OPERATOR && (
          <div>
            <div>
              <h5>Reservaciones por Ruta</h5>
            </div>
            <div>
              <div>
                <h6>Sierpe → Bahía Drake (08:00 AM) - 5 personas</h6>
                <ul>
                  <li>María González - Drake Bay Resort</li>
                  <li>Carlos Rodríguez - La Paloma Lodge</li>
                  <li>Ana López - Drake Bay Resort</li>
                  <li>Juan Pérez - Aguila de Osa</li>
                  <li>Laura Martínez - Copa de Árbol</li>
                </ul>
              </div>
              <div>
                <h6>Bahía Drake → Puerto Jiménez (10:00 AM) - 3 personas</h6>
                <ul>
                  <li>Pedro Fernández</li>
                  <li>Sofía Castro</li>
                  <li>Miguel Álvarez</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservations;
