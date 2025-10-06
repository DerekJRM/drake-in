import { Container, Row, Col, Card } from "react-bootstrap";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const contacts = [
    {
      name: "Derek Rojas",
      phone: "+506 8710-7411",
      email: "derekrojas586@gmail.com"
    },
    {
      name: "Carlos Rodríguez",
      phone: "+506 8888-5678",
      email: "carlos.rodriguez@drakein.com"
    },
    {
      name: "Ana Jiménez",
      phone: "+506 8888-9012",
      email: "ana.jimenez@drakein.com"
    },
    {
      name: "José Ramírez",
      phone: "+506 8888-3456",
      email: "jose.ramirez@drakein.com"
    }
  ];

  return (
    <footer className="mb-2">
      <Card className="shadow-sm" style={{ backgroundColor: '#6a92b2' }}>
        <Card.Body className="p-4">
          <Container style={{ maxWidth: '1400px' }}>
            
            {/* Header del Footer */}
            <Row className="mb-4">
              <Col xs={12} className="text-center">
                <h4 className="text-white fw-bold mb-2">DrakeIn</h4>
                <p className="text-white mb-0" style={{ fontSize: '16px' }}>
                  Gestión de rutas acuáticas en la Bahía Drake
                </p>
              </Col>
            </Row>

            <hr style={{ borderColor: 'rgba(255,255,255,0.3)'}} />

            {/* Sección de Contactos */}
            <Row className="mb-2">
              <Col xs={12} className="mb-3">
                <h5 className="text-white fw-semibold text-center mb-4">
                  <i className="bi bi-people-fill me-2"></i>
                  Información de Contacto
                </h5>
              </Col>
              
              {contacts.map((contact, index) => (
                <Col key={index} lg={3} md={6} xs={12} className="mb-3">
                  <Card className="h-100 border-0 shadow-sm">
                    <Card.Body className="p-3">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <i className="bi bi-person-circle" style={{ fontSize: '24px', color: '#6a92b2' }}></i>
                        <h6 className="mb-0 fw-semibold" style={{ color: '#6a92b2' }}>
                          {contact.name}
                        </h6>
                      </div>
                      <div className="d-flex flex-column gap-1">
                        <a 
                          href={`tel:${contact.phone}`}
                          className="text-decoration-none d-flex align-items-center gap-2"
                          style={{ fontSize: '14px', color: '#333' }}
                        >
                          <i className="bi bi-telephone-fill" style={{ color: '#6a92b2' }}></i>
                          {contact.phone}
                        </a>
                        <a 
                          href={`mailto:${contact.email}`}
                          className="text-decoration-none d-flex align-items-center gap-2"
                          style={{ fontSize: '14px', color: '#333' }}
                        >
                          <i className="bi bi-envelope-fill" style={{ color: '#6a92b2' }}></i>
                          {contact.email}
                        </a>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            <hr style={{ borderColor: 'rgba(255,255,255,0.3)' }} />

            {/* Copyright */}
            <Row>
              <Col xs={12} className="text-center">
                <small className="text-white" style={{ fontSize: '14px' }}>
                  &copy; {currentYear} DrakeIn. Todos los derechos reservados.
                </small>
              </Col>
            </Row>

          </Container>
        </Card.Body>
      </Card>
    </footer>
  );
};

export default Footer;