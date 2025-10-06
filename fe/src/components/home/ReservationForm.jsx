import { useState } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

function ReservationForm() {
  const [formData, setFormData] = useState({
    origen: '',
    destino: '',
    fecha: '',
    horario: '',
    nombreCompleto: '',
    email: '',
    hotel: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);
    // Aquí va la lógica de envío
  };

  return (
    <Row className="mb-2">
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
                Reservar tu viaje
              </h2>
            </div>

            <hr className="my-4" style={{ opacity: 0.1 }} />

            <Form onSubmit={handleSubmit}>
              {/* Fila 1: Origen y Destino */}
              <Row className="g-3 mb-3">
                <Col md={6} xs={12}>
                  <Form.Group>
                    <Form.Label className="fw-semibold d-flex align-items-center gap-2" style={{ color: '#6a92b2' }}>
                      <i className="bi bi-geo-alt-fill"></i>
                      Origen
                    </Form.Label>
                    <Form.Select
                      name="origen"
                      value={formData.origen}
                      onChange={handleChange}
                      className="shadow-sm"
                      required
                    >
                      <option value="">Selecciona el origen</option>
                      <option value="sierpe">Sierpe</option>
                      <option value="drake">Bahía Drake</option>
                      <option value="corcovado">Corcovado</option>
                      <option value="isla_cano">Isla del Caño</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={6} xs={12}>
                  <Form.Group>
                    <Form.Label className="fw-semibold d-flex align-items-center gap-2" style={{ color: '#6a92b2' }}>
                      <i className="bi bi-flag-fill"></i>
                      Destino
                    </Form.Label>
                    <Form.Select
                      name="destino"
                      value={formData.destino}
                      onChange={handleChange}
                      className="shadow-sm"
                      required
                    >
                      <option value="">Selecciona el destino</option>
                      <option value="sierpe">Sierpe</option>
                      <option value="drake">Bahía Drake</option>
                      <option value="corcovado">Corcovado</option>
                      <option value="isla_cano">Isla del Caño</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              {/* Fila 2: Fecha y Horario */}
              <Row className="g-3 mb-3">
                <Col md={6} xs={12}>
                  <Form.Group>
                    <Form.Label className="fw-semibold d-flex align-items-center gap-2" style={{ color: '#6a92b2' }}>
                      <i className="bi bi-calendar3"></i>
                      Fecha
                    </Form.Label>
                    <Form.Control
                      type="date"
                      name="fecha"
                      value={formData.fecha}
                      onChange={handleChange}
                      className="shadow-sm"
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6} xs={12}>
                  <Form.Group>
                    <Form.Label className="fw-semibold d-flex align-items-center gap-2" style={{ color: '#6a92b2' }}>
                      <i className="bi bi-clock-fill"></i>
                      Horario
                    </Form.Label>
                    <Form.Select
                      name="horario"
                      value={formData.horario}
                      onChange={handleChange}
                      className="shadow-sm"
                      required
                    >
                      <option value="">Selecciona el horario</option>
                      <option value="07:00">07:00 AM</option>
                      <option value="08:30">08:30 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:30">11:30 AM</option>
                      <option value="13:00">01:00 PM</option>
                      <option value="14:30">02:30 PM</option>
                      <option value="16:00">04:00 PM</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              {/* Fila 3: Nombre y Correo */}
              <Row className="g-3 mb-3">
                <Col md={6} xs={12}>
                  <Form.Group>
                    <Form.Label className="fw-semibold d-flex align-items-center gap-2" style={{ color: '#6a92b2' }}>
                      <i className="bi bi-person-fill"></i>
                      Nombre Completo
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="nombreCompleto"
                      value={formData.nombreCompleto}
                      onChange={handleChange}
                      placeholder="Ingresa tu nombre completo"
                      className="shadow-sm"
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6} xs={12}>
                  <Form.Group>
                    <Form.Label className="fw-semibold d-flex align-items-center gap-2" style={{ color: '#6a92b2' }}>
                      <i className="bi bi-envelope-fill"></i>
                      Correo Electrónico
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="correo@ejemplo.com"
                      className="shadow-sm"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Fila 4: Hotel */}
              <Row className="g-3 mb-4">
                <Col xs={12}>
                  <Form.Group>
                    <Form.Label className="fw-semibold d-flex align-items-center gap-2" style={{ color: '#6a92b2' }}>
                      <i className="bi bi-building"></i>
                      Hotel de destino
                    </Form.Label>
                    <Form.Select
                      name="hotel"
                      value={formData.hotel}
                      onChange={handleChange}
                      className="shadow-sm"
                      required
                    >
                      <option value="">Selecciona el hotel</option>
                      <option value="hotel_drake_bay">Hotel Drake Bay</option>
                      <option value="la_paloma_lodge">La Paloma Lodge</option>
                      <option value="aguila_de_osa">Aguila de Osa Inn</option>
                      <option value="pirate_cove">Pirate Cove</option>
                      <option value="drake_bay_resort">Drake Bay Resort</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <hr className="my-4" style={{ opacity: 0.1 }} />

              {/* Botón de envío */}
              <div className="d-flex justify-content-center">
                <Button 
                  type="submit"
                  className="text-white fw-semibold shadow-sm border-0 d-flex align-items-center gap-3 px-4 py-3"
                  style={{ 
                    backgroundColor: '#6a92b2',
                    fontSize: '18px',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5a8099'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6a92b2'}
                >
                  <i className="bi bi-calendar-check-fill" style={{ fontSize: '1.5rem' }}></i>
                  Reservar viaje
                </Button>
              </div>
            </Form>

          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default ReservationForm;