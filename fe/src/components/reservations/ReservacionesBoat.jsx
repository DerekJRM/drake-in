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
import { usePuertos } from "../../hooks/usePuertos";
import { useHorarios } from "../../hooks/useHorarios";
import { useReservasByFecha } from "../../hooks/useReservas";

const ReservacionesBoat = () => {
  // --- ESTADO Y DATA FETCHING (Sin cambios) ---
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [displayDate, setDisplayDate] = useState(today);

  const { data: puertosData, isLoading: isLoadingPuertos } = usePuertos();
  const { data: horariosData, isLoading: isLoadingHorarios } = useHorarios();
  const {
    data: reservations,
    isLoading: isLoadingReservas,
    isError: isErrorReservas,
    error: errorReservas,
  } = useReservasByFecha(displayDate);

  const loading = isLoadingPuertos || isLoadingHorarios || isLoadingReservas;
  const error = isErrorReservas ? errorReservas.message : null;

  // --- MAPEO DE IDs (Sin cambios) ---
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

  // --- 2. NUEVA LÓGICA DE AGRUPACIÓN (Agrupa por Horario) ---
  const groupedBySchedule = useMemo(() => {
    if (
      !reservations ||
      !Object.keys(puertosMap).length ||
      !Object.keys(horariosMap).length
    ) {
      return {};
    }

    // El objeto 'schedules' tendrá: { "08:00": { totalPassengers: 5, routes: { "Sierpe -> Drake": [...] } } }
    const schedules = reservations.reduce((schedules, res) => {
      const originName = puertosMap[res.origen_id] || `ID: ${res.origen_id}`;
      const destName = puertosMap[res.destino_id] || `ID: ${res.destino_id}`;
      const scheduleTime =
        horariosMap[res.horario_id] || `ID: ${res.horario_id}`;

      const routeKey = `${originName} → ${destName}`;

      // 1. Inicializar el grupo de horario si no existe
      if (!schedules[scheduleTime]) {
        schedules[scheduleTime] = {
          totalPassengers: 0,
          routes: {}, // Objeto para agrupar por ruta DENTRO del horario
        };
      }

      // 2. Inicializar el grupo de ruta si no existe
      if (!schedules[scheduleTime].routes[routeKey]) {
        schedules[scheduleTime].routes[routeKey] = [];
      }

      // 3. Añadir pasajero a la ruta específica
      schedules[scheduleTime].routes[routeKey].push(res);
      // 4. Incrementar el total de pasajeros para ESE HORARIO
      schedules[scheduleTime].totalPassengers += 1; // Asumiendo 1 reserva = 1 persona

      return schedules;
    }, {});

    return schedules;
  }, [reservations, puertosMap, horariosMap]);

  const handleSearch = () => {
    setDisplayDate(selectedDate);
  };

  // --- 3. RENDERIZADO (con Accordion y ordenado) ---
  return (
    <Row className="mb-3">
      <Col xs={12}>
        <Card className="shadow-sm">
          <Card.Body className="p-4">
            {/* Título y Filtros (Sin cambios) */}
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
              <h2
                className="mb-0 fw-bold"
                style={{ color: "#6a92b2", fontSize: "28px" }}
              >
                Reservaciones por Ruta
              </h2>
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
                  disabled={loading}
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

            {/* Estados de Carga y Error (Sin cambios) */}
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
                >
                  <span className="visually-hidden">Cargando...</span>
                </Spinner>
              </div>
            )}

            {/* Header de Resultados (Sin cambios) */}
            {!loading && !error && (
              <Card.Header className="mb-2 bg-info text-white d-flex align-items-center gap-2 py-3 rounded">
                <i className="bi bi-building fs-5"></i>
                <span className="fw-semibold">Reservaciones por Ruta</span>
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

            {/* --- 4. NUEVA SECCIÓN DE RESULTADOS (Ordenada y Compacta) --- */}
            {!loading && !error && (
              <Row>
                <Col xs={12}>
                  {/* Object.keys(groupedBySchedule) -> ["11:00", "08:00"]
                    .sort() -> ["08:00", "11:00"] (Ordena alfabéticamente, que funciona para horas)
                    .map(...) -> Itera en el orden correcto
                  */}
                  {Object.keys(groupedBySchedule)
                    .sort()
                    .map((scheduleTime) => {
                      const groupData = groupedBySchedule[scheduleTime];
                      const routesInGroup = groupData.routes;

                      return (
                        <Card key={scheduleTime} className="mb-3 shadow-sm">
                          {/* Cabecera del Horario (con el total) */}
                          <Card.Header className="d-flex justify-content-between align-items-center fw-bold bg-light p-3">
                            <div>
                              <i className="bi bi-clock-fill text-info me-2"></i>
                              {scheduleTime}
                            </div>
                            <div className="text-info">
                              <i className="bi bi-people-fill me-2"></i>
                              {groupData.totalPassengers} Personas (Total)
                            </div>
                          </Card.Header>

                          {/* Acordeón para las rutas DENTRO de este horario */}
                          <Accordion flush>
                            {Object.entries(routesInGroup).map(
                              ([routeKey, passengers], index) => (
                                <Accordion.Item
                                  eventKey={String(index)}
                                  key={routeKey}
                                >
                                  <Accordion.Header>
                                    {/* Título de cada ruta (compacto) */}
                                    <div className="d-flex justify-content-between w-100 pe-2">
                                      <span className="fw-semibold">
                                        <i className="bi bi-geo-alt-fill me-2"></i>
                                        {routeKey}
                                      </span>
                                      <span className="fw-medium text-muted">
                                        {passengers.length} personas
                                      </span>
                                    </div>
                                  </Accordion.Header>
                                  <Accordion.Body className="p-2">
                                    {/* Lista de pasajeros (compacta) */}
                                    <div className="d-flex flex-column gap-1">
                                      {passengers.map((reservation) => (
                                        <div
                                          key={reservation.id}
                                          className="bg-light p-2 rounded d-flex align-items-center gap-2"
                                        >
                                          <i className="bi bi-person-fill text-secondary"></i>
                                          <span style={{ fontSize: "14px" }}>
                                            {reservation.nombre}
                                          </span>
                                          <span
                                            className="text-muted ms-auto"
                                            style={{ fontSize: "12px" }}
                                          >
                                            {reservation.correo}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  </Accordion.Body>
                                </Accordion.Item>
                              )
                            )}
                          </Accordion>
                        </Card>
                      );
                    })}

                  {/* Estado Vacío (Sin cambios) */}
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

export default ReservacionesBoat;