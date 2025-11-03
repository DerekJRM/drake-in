import React, { useState, useMemo } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
  Alert,
  Accordion,
} from "react-bootstrap";
import { usePuertos } from "../../hooks/usePuertos";
import { useHorarios } from "../../hooks/useHorarios";
import { useReservasByFechaAndHotel } from "../../hooks/useReservas";
import { useOperadorByUsuarioId } from "../../hooks/useOperadores";
import { useAuth } from "../contexts/AuthContext";

const ReservacionesHotel = () => {
  // --- ESTADO Y DATA FETCHING ---
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [displayDate, setDisplayDate] = useState(today);

  const { data: puertosData, isLoading: isLoadingPuertos } = usePuertos();
  const { data: horariosData, isLoading: isLoadingHorarios } = useHorarios();
  const { user } = useAuth();
  const { data: hotelData, isLoading: isLoadingHotel } = useOperadorByUsuarioId(user?.id);
  const {
    data: reservations,
    isLoading: isLoadingReservas,
    isError: isErrorReservas,
    error: errorReservas,
  } = useReservasByFechaAndHotel(displayDate, hotelData?.id);

  const loading = isLoadingPuertos || isLoadingHorarios || isLoadingReservas || isLoadingHotel;
  const error = isErrorReservas ? errorReservas.message : null;

  // --- MAPEO DE IDs ---
  const puertosMap = useMemo(() => {
    if (!puertosData) return {};
    return puertosData.reduce((map, puerto) => {
      map[puerto.id] = puerto.nombre;
      return map;
    }, {});
  }, [puertosData]);

  const horariosMap = useMemo(() => {
    if (!horariosData) return {};
    return horariosData.reduce((map, horario) => {
      map[horario.id] = horario.hora;
      return map;
    }, {});
  }, [horariosData]);

  // --- LÓGICA DE AGRUPACIÓN (Agrupa solo por Horario, ya que todas son del mismo hotel) ---
  const groupedBySchedule = useMemo(() => {
    if (
      !reservations ||
      !Object.keys(horariosMap).length
    ) {
      return {};
    }

    const schedules = reservations.reduce((schedules, res) => {
      const scheduleTime =
        horariosMap[res.horario_id] || `ID: ${res.horario_id}`;

      // 1. Inicializar el grupo de horario si no existe
      if (!schedules[scheduleTime]) {
        schedules[scheduleTime] = {
          passengers: [],
          totalPassengers: 0,
        };
      }

      // 2. Añadir pasajero al horario
      schedules[scheduleTime].passengers.push(res);
      
      // 3. Incrementar el total de pasajeros
      schedules[scheduleTime].totalPassengers += 1;

      return schedules;
    }, {});

    return schedules;
  }, [reservations, horariosMap]);

  const handleSearch = () => {
    setDisplayDate(selectedDate);
  };

  // --- RENDERIZADO ---
  return (
    <Row className="mb-3">
      <Col xs={12}>
        <Card className="shadow-sm">
          <Card.Body className="p-4">
            {/* Título y Filtros */}
            <div className="d-flex align-items-center gap-3 mb-4">
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
                <i className="bi bi-calendar-plus"></i>
              </div>
              <div>
                <h2
                  className="mb-0 fw-bold"
                  style={{ color: "#6a92b2", fontSize: "28px" }}
                >
                  Mis Reservaciones
                </h2>
                {hotelData?.nombre && (
                  <p className="text-muted mb-0 mt-1">
                    <i className="bi bi-building me-2"></i>
                    {hotelData.nombre}
                  </p>
                )}
              </div>
            </div>
            <hr className="my-4" />
            <Row className="g-3 align-items-end mb-4">
              <Col md={7} xs={12}>
                <Form.Group>
                  <Form.Label className="fw-medium">
                    <i className="bi bi-calendar3 text-info me-2"></i>
                    Seleccionar fecha
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
                  disabled={loading || !hotelData?.id}
                >
                  {loading ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
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
            {!hotelData?.id && !isLoadingHotel && (
              <Alert variant="warning">
                <i className="bi bi-exclamation-triangle me-2"></i>
                No se pudo identificar el hotel asociado a tu usuario.
              </Alert>
            )}
            {loading && (
              <div className="text-center py-5">
                <Spinner
                  animation="border"
                  variant="primary"
                  style={{ width: "3rem", height: "3rem" }}
                >
                  <span className="visually-hidden">Cargando...</span>
                </Spinner>
              </div>
            )}

            {/* Header de Resultados */}
            {!loading && !error && hotelData?.id && (
              <Card.Header className="mb-3 bg-info text-white d-flex align-items-center gap-2 py-3 rounded">
                <i className="bi bi-clock fs-5"></i>
                <span className="fw-semibold">Reservaciones por Horario</span>
                {displayDate && (
                  <span className="ms-auto fw-medium">
                    {new Date(displayDate + "T00:00:00").toLocaleDateString(
                      "es-ES",
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }
                    )}
                  </span>
                )}
              </Card.Header>
            )}

            {/* SECCIÓN DE RESULTADOS - ACORDEÓN */}
            {!loading && !error && hotelData?.id && (
              <Row>
                <Col xs={12}>
                  <Accordion>
                    {Object.keys(groupedBySchedule)
                      .sort()
                      .map((scheduleTime, index) => {
                        const groupData = groupedBySchedule[scheduleTime];
                        const passengers = groupData.passengers;

                        return (
                          <Accordion.Item 
                            eventKey={String(index)} 
                            key={scheduleTime}
                            className="mb-2"
                          >
                            {/* Cabecera del Acordeón - Horario */}
                            <Accordion.Header>
                              <div className="d-flex justify-content-between w-100 pe-3">
                                <div className="fw-bold">
                                  <i className="bi bi-clock-fill text-info me-2"></i>
                                  {scheduleTime}
                                </div>
                                <div className="fw-semibold text-info">
                                  <i className="bi bi-people-fill me-2"></i>
                                  {groupData.totalPassengers} {groupData.totalPassengers === 1 ? 'Persona' : 'Personas'}
                                </div>
                              </div>
                            </Accordion.Header>

                            {/* Cuerpo del Acordeón - Lista de pasajeros */}
                            <Accordion.Body className="p-3">
                              <div className="d-flex flex-column gap-2">
                                {passengers.map((reservation) => (
                                  <div
                                    key={reservation.id}
                                    className="bg-light p-3 rounded d-flex align-items-center gap-3 border"
                                  >
                                    <div className="d-flex align-items-center justify-content-center rounded-circle bg-info text-white" style={{ width: "40px", height: "40px", minWidth: "40px" }}>
                                      <i className="bi bi-person-fill"></i>
                                    </div>
                                    <div className="flex-grow-1">
                                      <div className="fw-semibold" style={{ fontSize: "15px" }}>
                                        {reservation.nombre}
                                      </div>
                                      <div className="text-muted" style={{ fontSize: "13px" }}>
                                        <i className="bi bi-envelope me-1"></i>
                                        {reservation.correo}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                        );
                      })}
                  </Accordion>

                  {/* Estado Vacío */}
                  {Object.keys(groupedBySchedule).length === 0 &&
                    displayDate && (
                      <Alert
                        variant="info"
                        className="d-flex align-items-center"
                      >
                        <i className="bi bi-info-circle me-2"></i>
                        No hay reservaciones para la fecha seleccionada.
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