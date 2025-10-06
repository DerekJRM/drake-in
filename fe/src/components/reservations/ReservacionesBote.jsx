import React, { useState, useEffect } from "react";
import { Row, Col, Card, Form, Button, Spinner, Alert } from 'react-bootstrap';

const ReservacionesBote = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Establecer la fecha actual por defecto
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [displayDate, setDisplayDate] = useState(null); // Nueva variable para la fecha a mostrar

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // TODO: Implementar llamada al backend
      // const response = await fetch(`/api/reservations/operator?date=${selectedDate}`);
      // if (!response.ok) throw new Error('Error al cargar las reservaciones');
      // const data = await response.json();
      // setReservations(data);
      
      // Mock data temporal
      setTimeout(() => {
        const mockReservations = [
          {
            id: 1,
            passengerName: "María González",
            origin: "Sierpe",
            destination: "Drake Bay",
            schedule: "08:00 AM",
          },
          {
            id: 2,
            passengerName: "Carlos Rodríguez",
            origin: "Sierpe",
            destination: "Drake Bay",
            schedule: "08:00 AM",
          },
          {
            id: 3,
            passengerName: "Ana López",
            origin: "Drake Bay",
            destination: "Sierpe",
            schedule: "10:00 AM",
          },
          {
            id: 4,
            passengerName: "Juan Pérez",
            origin: "Drake Bay",
            destination: "Sierpe",
            schedule: "10:00 AM",
          },
        ];
        setReservations(mockReservations);
        setLoading(false);
      }, 500);
      
    } catch (err) {
      setError(err.message || 'Error al cargar las reservaciones');
      setLoading(false);
    }
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
    setDisplayDate(selectedDate); // Actualizar la fecha a mostrar
    fetchReservations();
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
                Reservaciones por Ruta
              </h2>
            </div>

            <hr className="my-4" />

            {/* Filters */}
            <Row className="g-3 align-items-end mb-4">
              <Col md={6} xs={12}>
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
              
              <Col md={6} xs={12}>
                <Button 
                  variant="info" 
                  className="w-100 text-white fw-medium"
                  onClick={handleSearch}
                  disabled={loading}
                >
                  <i className="bi bi-search me-2"></i>
                  Buscar
                </Button>
              </Col>
            </Row>

            <hr className="my-4" />

            {/* Error State */}
            {error && (
              <Alert variant="danger" className="d-flex align-items-center" onClose={() => setError(null)} dismissible>
                <i className="bi bi-exclamation-triangle me-2"></i>
                {error}
              </Alert>
            )}

            {/* Loading State */}
            {loading && (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }}>
                  <span className="visually-hidden">Cargando...</span>
                </Spinner>
              </div>
            )}

            {/* Schedule Header - Siempre visible */}
            <Card.Header className="mb-2 bg-info text-white d-flex align-items-center gap-2 py-3 rounded">
            <i className="bi bi-building fs-5"></i>
            <span className="fw-semibold">
                Reservaciones por Ruta
            </span>
            {displayDate && (
                <span className="ms-auto fw-medium">
                {new Date(displayDate + 'T00:00:00').toLocaleDateString('es-ES', { 
                    day: '2-digit', 
                    month: '2-digit', 
                    year: 'numeric' 
                })}
                </span>
            )}
            </Card.Header>

            {/* Resultados */}
            {!loading && !error && (
              <Row>
                <Col xs={12}>
                  {Object.entries(groupedReservations).map(([schedule, reservationsList]) => (
                    <Card key={schedule} className="mb-2 overflow-hidden">

                      {/* Time and Passengers */}
                      <Card.Body className="p-4">
                        {/* Route Info Badge */}
                        <div className="bg-light border-start border-info border-4 p-3 mb-3 rounded">
                          <div className="d-flex align-items-center gap-2 mb-2">
                            <i className="bi bi-geo-alt-fill text-info"></i>
                            <span className="fw-semibold">
                              {reservationsList[0]?.origin} → {reservationsList[0]?.destination}
                            </span>
                            <i className="bi bi-clock text-info ms-auto"></i>
                            <span className="fw-medium">({schedule})</span>
                          </div>
                          <div className="d-flex align-items-center gap-2">
                            <i className="bi bi-people-fill text-info"></i>
                            <span className="fw-medium">
                              {reservationsList.length} personas
                            </span>
                          </div>
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

                  {Object.keys(groupedReservations).length === 0 && displayDate && (
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

export default ReservacionesBote;