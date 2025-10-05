import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div>
        <div>
          <div>
            <h5>DrakeIn</h5>
            <p>Gestión de rutas acuáticas en la Bahía Drake</p>
          </div>
          <div>
            <h6>Contacto</h6>
            <ul>
              <li>
                <a href="mailto:info@drakein.com">info@drakein.com</a>
              </li>
              <li>
                <a href="tel:+50612345678">+506 1234-5678</a>
              </li>
            </ul>
          </div>
          <div>
            <h6>Síguenos</h6>
            <div>
              <button
                onClick={() => window.open("https://facebook.com", "_blank")}
                aria-label="Facebook"
              >
                Facebook
              </button>
              <button
                onClick={() => window.open("https://instagram.com", "_blank")}
                aria-label="Instagram"
              >
                Instagram
              </button>
              <button
                onClick={() => window.open("https://twitter.com", "_blank")}
                aria-label="Twitter"
              >
                Twitter
              </button>
            </div>
          </div>
        </div>
        <hr />
        <div>
          <small>
            &copy; {currentYear} DrakeIn. Todos los derechos reservados.
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
