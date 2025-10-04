import React from "react";

const Routes = () => {
  const handleAddRoute = () => {
    alert("Aquí se abriría el modal para agregar una nueva ruta");
  };

  const handleEdit = (routeId) => {
    alert(`Editar ruta: ${routeId}`);
  };

  const handleDelete = (routeId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta ruta?")) {
      alert(`Ruta eliminada: ${routeId}`);
    }
  };

  return (
    <div>
      <div>
        <h2>Administración de Rutas</h2>
        <button onClick={handleAddRoute}>Nueva Ruta</button>
      </div>

      <div>
        <div>
          <h5>Rutas Disponibles</h5>
        </div>
        <div>
          <div>
            <div>
              <div>
                <h6>Sierpe → Bahía Drake</h6>
                <p>
                  <strong>Duración:</strong> 1.5 horas
                </p>
                <p>
                  <strong>Horarios:</strong> 06:00, 08:00, 10:00, 14:00, 16:00
                </p>
                <p>
                  <strong>Capacidad:</strong> 12 personas
                </p>
              </div>
              <div>
                <button onClick={() => handleEdit("sierpe-drake")}>
                  Editar
                </button>
                <button onClick={() => handleDelete("sierpe-drake")}>
                  Eliminar
                </button>
              </div>
            </div>
          </div>

          <div>
            <div>
              <div>
                <h6>Bahía Drake → Puerto Jiménez</h6>
                <p>
                  <strong>Duración:</strong> 2 horas
                </p>
                <p>
                  <strong>Horarios:</strong> 07:00, 10:00, 12:00, 15:00
                </p>
                <p>
                  <strong>Capacidad:</strong> 10 personas
                </p>
              </div>
              <div>
                <button onClick={() => handleEdit("drake-jimenez")}>
                  Editar
                </button>
                <button onClick={() => handleDelete("drake-jimenez")}>
                  Eliminar
                </button>
              </div>
            </div>
          </div>

          <div>
            <div>
              <div>
                <h6>Bahía Drake → Parque Corcovado</h6>
                <p>
                  <strong>Duración:</strong> 45 minutos
                </p>
                <p>
                  <strong>Horarios:</strong> 08:00, 14:00
                </p>
                <p>
                  <strong>Capacidad:</strong> 8 personas
                </p>
              </div>
              <div>
                <button onClick={() => handleEdit("drake-corcovado")}>
                  Editar
                </button>
                <button onClick={() => handleDelete("drake-corcovado")}>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Routes;
