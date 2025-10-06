import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Card, Form, Button, Spinner, Alert } from 'react-bootstrap';

const Reservaciones = () => {
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
      <Row className="mb-3">
        <Col xs={12}>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              
              {/* Título */}
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="d-flex align-items-center justify-content-center rounded" 
                    style={{ backgroundColor: "#6a92b2", width: "50px", height: "50px", color: "white", fontSize: "24px" }}>
                  <i className="bi bi-calendar-plus"></i>
                </div>
                <h2 className="mb-0 fw-bold" style={{ color: "#6a92b2", fontSize: "28px" }}>
                  Reservaciones Realizadas
                </h2>
              </div>

              <hr className="my-4" />

              {/* Filters */}
              <Row className="g-3 align-items-end mb-4">
                <Col md={4} xs={12}>
                  <Form.Group>
                    <Form.Label className="fw-medium">
                      <i className="bi bi-calendar3 text-info me-2"></i>
                      Seleccionar fecha
                    </Form.Label>
                    <Form.Control
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      placeholder="dd/mm/aaaa"
                    />
                  </Form.Group>
                </Col>
                
                <Col md={4} xs={12}>
                  <Form.Group>
                    <Form.Label className="fw-medium">Vista como:</Form.Label>
                    <Form.Select
                      value={viewType}
                      onChange={(e) => setViewType(e.target.value)}
                    >
                      <option value="Hotel">Hotel</option>
                      <option value="Operador">Operador</option>
                      <option value="Pasajero">Pasajero</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                
                <Col md={4} xs={12}>
                  <Button 
                    variant="info" 
                    className="w-100 text-white fw-medium"
                    onClick={handleSearch}
                  >
                    <i className="bi bi-search me-2"></i>
                    Buscar
                  </Button>
                </Col>
              </Row>

              <hr className="my-4" />

              {/* Loading State */}
              {loading && (
                <div className="text-center py-5">
                  <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }}>
                    <span className="visually-hidden">Cargando...</span>
                  </Spinner>
                </div>
              )}

              {/* Resultados */}
              {!loading && (
                <Row>
                  <Col xs={12}>
                    {Object.entries(groupedReservations).map(([schedule, reservationsList]) => (
                      <Card key={schedule} className="mb-4 overflow-hidden">
                        {/* Schedule Header */}
                        <Card.Header className="bg-info text-white d-flex align-items-center gap-2 py-3">
                          <i className="bi bi-building fs-5"></i>
                          <span className="fw-semibold">
                            Llegadas por Horario - {reservationsList[0]?.hotel || "Hotel"}
                          </span>
                        </Card.Header>

                        {/* Time and Passengers */}
                        <Card.Body className="p-4">
                          {/* Time Badge */}
                          <div className="bg-light border-start border-info border-4 p-3 mb-3 rounded d-flex align-items-center gap-2">
                            <i className="bi bi-clock text-info fs-5"></i>
                            <span className="fw-medium">
                              {schedule} - {reservationsList.length} personas
                            </span>
                          </div>

                          {/* Passengers List */}
                          <div className="d-flex flex-column gap-2 ps-2">
                            {reservationsList.map((reservation) => (
                              <div 
                                key={reservation.id} 
                                className="bg-light p-2 px-3 rounded d-flex align-items-center gap-2"
                                style={{ transition: 'background-color 0.2s' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e9ecef'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                              >
                                <i className="bi bi-person-fill text-secondary"></i>
                                <span style={{ fontSize: '14px' }}>
                                  {reservation.passengerName}
                                </span>
                              </div>
                            ))}
                          </div>
                        </Card.Body>
                      </Card>
                    ))}

                    {Object.keys(groupedReservations).length === 0 && (
                      <Alert variant="info" className="d-flex align-items-center">
                        <i className="bi bi-info-circle me-2"></i>
                        No hay reservaciones para mostrar
                      </Alert>
                    )}
                  </Col>
                </Row>
              )}

            </Card.Body>
          </Card>
        </Col>
      </Row>
  );
};

export default Reservaciones;
