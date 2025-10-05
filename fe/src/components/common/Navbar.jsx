import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar as RBNavbar, Nav, Container } from "react-bootstrap";
import { ROUTES } from "../../utils/constants";
import "../../styles/styles.css";

const Navbar = () => {
  const location = useLocation(); // Para resaltar el link activo

  return (
    <RBNavbar bg="dark" variant="dark" expand="lg" className="navbar-blue mb-4">
      <Container>
        <RBNavbar.Brand as={Link} to={ROUTES.HOME}>
          DrakeIn
        </RBNavbar.Brand>
        <RBNavbar.Toggle aria-controls="basic-navbar-nav" />
        <RBNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to={ROUTES.HOME}
              active={location.pathname === ROUTES.HOME}
            >
              Inicio
            </Nav.Link>
            <Nav.Link
              as={Link}
              to={ROUTES.RESERVATIONSHOTEL}
              active={location.pathname === ROUTES.RESERVATIONSHOTEL}
            >
              Ver Reservaciones
            </Nav.Link>
            <Nav.Link
              as={Link}
              to={ROUTES.ROUTES}
              active={location.pathname === ROUTES.ROUTES}
            >
              Administrar Rutas
            </Nav.Link>
            <Nav.Link
              as={Link}
              to={ROUTES.REGISTER}
              active={location.pathname === ROUTES.REGISTER}
            >
              Registrar Operador
            </Nav.Link>
            <Nav.Link
              as={Link}
              to={ROUTES.LOGIN}
              active={location.pathname === ROUTES.LOGIN}
            >
              Iniciar Sesión
            </Nav.Link>
          </Nav>
        </RBNavbar.Collapse>
      </Container>
    </RBNavbar>
  );
};

export default Navbar;
