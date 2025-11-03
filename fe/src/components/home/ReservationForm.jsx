import { useState, useMemo } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { usePuertos } from '../../hooks/usePuertos';
import { useHorarios } from '../../hooks/useHorarios';
import { useOperadoresByTipo } from '../../hooks/useOperadores';
import { useSaveReserva } from '../../hooks/useReservas';

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

  const { data: puertos } = usePuertos();
  const { data: horarios } = useHorarios();
  const { data: operadoresHoteles } = useOperadoresByTipo('HOTEL');

  // Hook de mutación para guardar la reserva
  const { mutate: saveReserva, isLoading, isSuccess, isError } = useSaveReserva();

  // Calcular la fecha mínima permitida
  const minDate = useMemo(() => {
    const now = new Date();
    const currentHour = now.getHours();
    
    // Si ya pasaron las 4 PM (16:00), la fecha mínima es mañana
    if (currentHour >= 16) {
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow.toISOString().split('T')[0];
    }
    
    // Si no, la fecha mínima es hoy
    return now.toISOString().split('T')[0];
  }, []);

  // Filtrar horarios disponibles según la fecha seleccionada
  const horariosDisponibles = useMemo(() => {
    if (!horarios || !formData.fecha) return horarios || [];

    const now = new Date();
    const selectedDate = new Date(formData.fecha + 'T00:00:00');
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    // Si la fecha seleccionada no es hoy, mostrar todos los horarios
    if (selectedDate.getTime() !== today.getTime()) {
      return horarios;
    }

    // Si es hoy, filtrar horarios que ya pasaron
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    return horarios.filter(horario => {
      // Parsear la hora del horario (formato "HH:MM:SS")
      const [hours, minutes] = horario.hora.split(':').map(Number);
      const horarioMinutes = hours * 60 + minutes;
      
      // Mantener solo horarios que aún no han pasado
      return horarioMinutes > currentTime;
    });
  }, [horarios, formData.fecha]);

  // Filtrar destinos según el origen seleccionado
  const destinosDisponibles = useMemo(() => {
    if (!puertos || !formData.origen) return [];

    const origenSeleccionado = puertos.find(p => p.id === parseInt(formData.origen, 10));
    
    if (!origenSeleccionado) return [];

    // Si el origen es Sierpe, el destino NO puede ser Sierpe
    if (origenSeleccionado.nombre.toLowerCase().includes('sierpe')) {
      return puertos.filter(p => !p.nombre.toLowerCase().includes('sierpe'));
    }
    
    // Si el origen NO es Sierpe, el destino SOLO puede ser Sierpe
    return puertos.filter(p => p.nombre.toLowerCase().includes('sierpe'));
  }, [puertos, formData.origen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: value
      };

      // Si cambia el origen, resetear el destino
      if (name === 'origen') {
        newData.destino = '';
      }

      // Si cambia la fecha, resetear el horario
      if (name === 'fecha') {
        newData.horario = '';
      }

      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const rutaRequestData = {
      fecha: formData.fecha,
      horario_id: formData.horario ? parseInt(formData.horario, 10) : null,
      origen_id: formData.origen ? parseInt(formData.origen, 10) : null,
    };    

    // Validación simple
    if (!rutaRequestData.fecha || !rutaRequestData.horario_id || !rutaRequestData.origen_id) {
        alert('Debe seleccionar fecha, horario y origen.');
        return;
    }   
    
    // Construir la RESERVA
    const reservaData = {
        new_item: true,
        origen_id: formData.origen ? parseInt(formData.origen, 10) : null,
        nombre: formData.nombreCompleto,
        correo: formData.email,
        destino_id: formData.destino ? parseInt(formData.destino, 10) : null,
        hotel_id: formData.hotel ? parseInt(formData.hotel, 10) : null,
        fecha: formData.fecha,
        horario_id: formData.horario ? parseInt(formData.horario, 10) : null,
    };

    // Validación de la reserva
    if (!reservaData.destino_id || !reservaData.nombre || !reservaData.correo) {
        alert('Debe seleccionar un destino e ingresar su nombre y correo.');
        return;
    }
    console.log('Datos de la reserva a enviar:', reservaData);      

    // Ejecutar la mutación
    saveReserva(reservaData, {
      onSuccess: () => {
        alert('Reservación creada exitosamente.');
        setFormData({
          origen: '',
          destino: '',
          fecha: '',
          horario: '',
          nombreCompleto: '',
          email: '',
          hotel: ''
        });
      },
      onError: (err) => {
        console.error('Error al crear la reserva:', err);
        alert('Error al crear la reservación.');
      }
    });    
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
              
              {/* Fila 1: Fecha y Horario */}
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
                      min={minDate}
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
                      disabled={!formData.fecha}
                      required
                    >
                      <option value="">
                        {!formData.fecha ? 'Primero selecciona una fecha' : 'Selecciona el horario'}
                      </option>
                      {horariosDisponibles?.map((horario) => (
                        <option key={horario.id} value={horario.id}>
                          {horario.hora}
                        </option>
                      ))}
                      {formData.fecha && horariosDisponibles?.length === 0 && (
                        <option value="" disabled>No hay horarios disponibles para hoy</option>
                      )}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              {/* Fila 2: Origen y Destino */}
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
                      {puertos?.map((puerto) => (
                        <option key={puerto.id} value={puerto.id}>
                          {puerto.nombre}
                        </option>
                      ))}
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
                      disabled={!formData.origen}
                      required
                    >
                      <option value="">
                        {!formData.origen ? 'Primero selecciona un origen' : 'Selecciona el destino'}
                      </option>
                      {destinosDisponibles?.map((puerto) => (
                        <option key={puerto.id} value={puerto.id}>
                          {puerto.nombre}
                        </option>
                      ))}
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
                    >
                      <option value="">Selecciona el hotel</option>
                      {operadoresHoteles?.map((hotel) => (
                        <option key={hotel.id} value={hotel.id}>
                          {hotel.nombre}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <hr className="my-4" style={{ opacity: 0.1 }} />

              {/* Botón de envío */}
              <div className="d-flex justify-content-center">
                <Button 
                  type="submit"
                  disabled={isLoading}
                  className="text-white fw-semibold shadow-sm border-0 d-flex align-items-center gap-3 px-4 py-3"
                  style={{ 
                    backgroundColor: '#6a92b2',
                    fontSize: '18px',
                    transition: 'all 0.2s'
                  }}
                >
                  <i className="bi bi-calendar-check-fill" style={{ fontSize: '1.5rem' }}></i>
                  {isLoading ? 'Guardando...' : 'Reservar viaje'}
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