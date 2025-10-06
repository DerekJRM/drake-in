import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ContactBanner = () => {
  const handleContact = () => {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Card className="border-0 rounded shadow-sm mb-4" style={{ backgroundColor: '#6a92b2' }}>
      <Card.Body className="p-4 d-flex flex-column align-items-center gap-3 text-center">
        
        <h5 className="mb-0 text-white fw-semibold d-flex align-items-center gap-2">
          <i className="bi bi-exclamation-circle"></i>
          ¿Eres dueño de un hotel o un bote?
        </h5>

        <h5 className="mb-0 text-white fw-medium">
          Contacta con nosotros para registrarte en DrakeIn
        </h5>

        <Button 
          onClick={handleContact}
          className="text-white fw-semibold shadow-sm border-0 d-flex align-items-center gap-2"
          style={{ 
            backgroundColor: 'rgba(255,255,255,0.2)',
            padding: '10px 24px',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
        >
          <i className="bi bi-telephone-fill"></i>
          Contactos
        </Button>

      </Card.Body>
    </Card>
  );
};

export default ContactBanner;