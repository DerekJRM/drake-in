// src/components/reservations/AdministracionRutas.jsx
import React, { useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";

const AdministracionRutas = () => {
  const [routes, setRoutes] = useState([
    {
      id: 1,
      origin: "Sierpe",
      destination: "Bahía Drake",
      duration: "1.5 horas",
      schedules: ["06:00", "08:00", "10:00", "14:00", "16:00"],
      capacity: 12,
    },
    {
      id: 2,
      origin: "Bahía Drake",
      destination: "Puerto Jiménez",
      duration: "2 horas",
      schedules: ["07:00", "10:00", "12:00", "15:00"],
      capacity: 10,
    },
    {
      id: 3,
      origin: "Bahía Drake",
      destination: "Parque Corcovado",
      duration: "45 minutos",
      schedules: ["08:00", "14:00"],
      capacity: 8,
    },
  ]);

  const handleEdit = (id) => {
    alert(`Editar ruta con ID: ${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar esta ruta?")) {
      setRoutes(routes.filter((r) => r.id !== id));
    }
  };

  const handleAdd = () => {
    alert("Agregar nueva ruta");
  };

  return (
    <Row className="my-4">
      <Col xs={12}>
        <Card className="shadow-sm border-0">
          <Card.Body className="p-4">
            {/* Header */}
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className="d-flex align-items-center gap-2">
                <i
                  className="bi bi-geo-alt-fill fs-3"
                  style={{ color: "#007b8f" }}
                ></i>
                <h3 className="fw-bold mb-0" style={{ color: "#007b8f" }}>
                  Administración de Rutas
                </h3>
              </div>
              <Button
                variant="info"
                className="text-white fw-semibold"
                onClick={handleAdd}
              >
                <i className="bi bi-plus-lg me-2"></i> Nueva Ruta
              </Button>
            </div>

            {/* Subheader */}
            <Card.Header className="bg-info text-white fw-semibold py-3 rounded mb-3">
              <i className="bi bi-list-check me-2"></i>
              Rutas Disponibles
            </Card.Header>

            {/* Rutas */}
            <div className="d-flex flex-column gap-3">
              {routes.map((route) => (
                <Card key={route.id} className="shadow-sm border-0">
                  <Card.Body className="p-3">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h5 className="fw-bold text-dark mb-2">
                          <i className="bi bi-boat-fill text-info me-2"></i>
                          {route.origin} → {route.destination}
                        </h5>
                        <p className="mb-1">
                          <strong>Duración:</strong> {route.duration}
                        </p>
                        <p className="mb-1">
                          <strong>Horarios:</strong>{" "}
                          {route.schedules.join(", ")}
                        </p>
                        <p className="mb-0">
                          <strong>Capacidad:</strong> {route.capacity} personas
                        </p>
                      </div>
                      <div className="d-flex flex-column gap-2">
                        <Button
                          variant="outline-info"
                          size="sm"
                          onClick={() => handleEdit(route.id)}
                        >
                          <i className="bi bi-pencil-square"></i>
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(route.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>

            {routes.length === 0 && (
              <div className="text-center text-muted py-4">
                <i className="bi bi-info-circle me-2"></i>
                No hay rutas registradas.
              </div>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default AdministracionRutas;
