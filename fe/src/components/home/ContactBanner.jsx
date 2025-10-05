import React from "react";
import { CONTACT_INFO } from "../../utils/constants";

const ContactBanner = () => {
  const handleContact = () => {
    alert(`Contacto: ${CONTACT_INFO.EMAIL} | Tel: ${CONTACT_INFO.PHONE}`);
  };

  return (
    <div>
      <h4>¿Eres dueño de un hotel o un bote?</h4>
      <p>Contacta con nosotros para registrarte en DrakeIn</p>
      <button onClick={handleContact}>Contactos</button>
    </div>
  );
};

export default ContactBanner;
