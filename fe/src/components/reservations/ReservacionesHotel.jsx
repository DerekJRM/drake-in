import React, { useState, useMemo } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
  Alert,
  Accordion, // <-- 1. Importar Accordion
} from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext"; // Importar Auth
import { useHorarios } from "../../hooks/useHorarios"; // Importar Horarios
import { useReservasByFechaAndHotel } from "../../hooks/useReservas"; // Importar NUEVO hook

const ReservacionesHotel = () => {
  // --- 1. ESTADO ---
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [displayDate, setDisplayDate] = useState(today);

  // --- 2. CONTEXTO DE AUTH (CORREGIDO) ---
  const { operadorName, operadorId, user, isLoading: isAuthLoading } = useAuth();

  // --- 3. DATA FETCHING (REACT QUERY) ---
  const { data: horariosData, isLoading: isLoadingHorarios } = useHorarios();
  const {
    data: reservations,
    isLoading: isLoadingReservas,
    isError: isErrorReservas,
    error: errorReservas,
  } = useReservasByFechaAndHotel(displayDate, operadorId); // <-- Usamos el hook nuevo

  // --- CORRECCIÓN DE ESTADO DE CARGA ---
  const loading = isAuthLoading || isLoadingHorarios || isLoadingReservas;
  const error = isErrorReservas ? errorReservas.message : null;

  // --- 4. PROCESAMIENTO DE DATOS ---
  const horariosMap = useMemo(() => {
    if (!horariosData) return {};
    return horariosData.reduce((map, horario) => {
      map[horario.id] = horario.hora;
      return map;
    }, {});
  }, [horariosData]);

  // --- 5. LÓGICA DE AGRUPACIÓN (Más simple) ---
  const groupedBySchedule = useMemo(() => {
    if (!reservations || !Object.keys(horariosMap).length) {
      return {};
    }

    // Agrupamos solo por horario
    const schedules = reservations.reduce((schedules, res) => {
      const scheduleTime =
        horariosMap[res.horario_id] || `ID: ${res.horario_id}`;

      if (!schedules[scheduleTime]) {
        schedules[scheduleTime] = {
          totalPassengers: 0,
          passengers: [],
        };
      }

      schedules[scheduleTime].passengers.push(res);
      schedules[scheduleTime].totalPassengers += 1; // Asumiendo 1 reserva = 1 persona

      return schedules;
    }, {});

    return schedules;
  }, [reservations, horariosMap]);

  const handleSearch = () => {
    setDisplayDate(selectedDate);
  };

  // --- 6. RENDERIZADO ---
  return (
    <Row className="mb-3">
      <Col xs={12}>
        <Card className="shadow-sm">
          <Card.Body className="p-lg-4 p-3"> {/* Padding responsivo */}
            {/* Título */}
            <div className="d-flex flex-wrap align-items-center gap-3 mb-4"> {/* flex-wrap para responsive */}
              <div
                className="d-flex align-items-center justify-content-center rounded"
                style={{
                  backgroundColor: "#6a92b2",
                  width: "50px",
                  height: "50px",
                  color: "white",
                  fontSize: "24px",
                }}
              >
                <i className="bi bi-door-open-fill"></i>
              </div>
              <div>
                <h2
                  className="mb-0 fw-bold"
                  style={{ color: "#6a92b2", fontSize: "28px" }}
                >
                  Ingresos al Hotel 
                  {user && operadorName && (
                  <span className="ms-2">
                     {operadorName}
                  </span>
                )}
                </h2>
                
              </div>
            </div>
            <hr className="my-4" />

            {/* Filtros */}
            <Row className="g-3 align-items-end mb-4">
              <Col md={7} xs={12}>
                <Form.Group>
                  <Form.Label className="fw-medium">
                    <i className="bi bi-calendar3 text-info me-2"></i>
                    Seleccionar fecha de llegada
                  </Form.Label>
                  <Form.Control
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={5} xs={12}>
                <Button
                  variant="info"
                  className="w-100 text-white fw-medium"
                  onClick={handleSearch}
                  disabled={loading}
                >
                  {loading ? (
                    <Spinner as="span" animation="border" size="sm" />
                  ) : (
                    <i className="bi bi-search me-2"></i>
                  )}
                  {loading ? " Buscando..." : " Buscar"}
                </Button>
              </Col>
            </Row>
            <hr className="my-4" />

            {/* Estados de Carga y Error */}
            {error && (
              <Alert variant="danger" dismissible>
                <i className="bi bi-exclamation-triangle me-2"></i>
                {error}
              </Alert>
            )}
            {loading && (
              <div className="text-center py-5">
                <Spinner
                  animation="border"
                  variant="primary"
                  style={{ width: "3rem", height: "3rem" }}
                />
              </div>
            )}

            {/* Header de Resultados */}
            {!loading && !error && (
              <Card.Header className="mb-2 bg-info text-white d-flex flex-wrap align-items-center gap-2 py-3 rounded">
                <i className="bi bi-calendar-check fs-5"></i>
                <span className="fw-semibold">Llegadas programadas</span>
                {displayDate && (
                  <span className="ms-md-auto fw-medium"> {/* ms-md-auto para responsive */}
                    {new Date(displayDate + "T00:00:00").toLocaleDateString(
                      "es-ES",
                      { day: "2-digit", month: "2-digit", year: "numeric" }
                    )}
                  </span>
                )}
              </Card.Header>
            )}

            {/* Resultados (Simple y Compacto) */}
            {!loading && !error && (
              <Row>
                <Col xs={12}>
                  {Object.keys(groupedBySchedule)
                    .sort() // Ordenamos por hora
                    .map((scheduleTime, index) => {
                      const groupData = groupedBySchedule[scheduleTime];
                      return (
                        <Card key={scheduleTime} className="mb-3 shadow-sm">
                          {/* Cabecera del Horario */}
                          <Card.Header className="d-flex flex-wrap justify-content-between align-items-center fw-bold bg-light p-3 gap-2">
                            <div>
                              <i className="bi bi-clock-fill text-info me-2"></i>
                              Hora de Salida: {scheduleTime}
                            </div>
                            <div className="text-info">
                              <i className="bi bi-people-fill me-2"></i>
                              {groupData.totalPassengers} Personas
                            </div>
                          </Card.Header>

                          {/* --- 2. ACORDEÓN PARA PASAJEROS --- */}
                          <Accordion flush>
                            <Accordion.Item eventKey={String(index)}>
                              <Accordion.Header>
                                <span className="fw-medium text-secondary">
                                  <i className="bi bi-list-ul me-2"></i>
                                  Ver/Ocultar Lista de Pasajeros
                                </span>
                              </Accordion.Header>
                              <Accordion.Body className="p-3">
                                <div className="d-flex flex-column gap-2">
                                  {groupData.passengers.map((reservation) => (
                                    <div
                                      key={reservation.id}
                                      // flex-wrap para que en móvil el correo baje
                                      className="bg-light p-2 px-3 rounded d-flex flex-wrap align-items-center gap-2"
                                    >
                                      <i className="bi bi-person-fill text-secondary"></i>
                                      <span
                                        style={{ fontSize: "14px" }}
                                        className="fw-medium"
                                      >
                                        {reservation.nombre}
                                      </span>
                                      <span
                                        // ms-auto en pantallas grandes, nada en pequeñas
                                        className="text-muted ms-md-auto"
                                        style={{ fontSize: "12px" }}
                                      >
                                        {reservation.correo}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </Card>
                      );
                    })}

                  {/* Estado Vacío */}
                  {Object.keys(groupedBySchedule).length === 0 &&
                    displayDate && (
                      <Alert
                        variant="info"
                        className="d-flex align-items-center"
                      >
                        <i className="bi bi-info-circle me-2"></i>
                        No hay llegadas programadas para esta fecha.
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

export default ReservacionesHotel;

