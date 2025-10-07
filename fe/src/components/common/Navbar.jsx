import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar as RBNavbar, Nav, Card, NavDropdown } from "react-bootstrap";
import { ROUTES, USER_TYPES } from "../../utils/constants";
import { useAuth } from "../contexts/AuthContext";
import logo from "../../resources/logo.png";

const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated, user, logout, getReservationsRoute } = useAuth();

  // Verificar roles de usuario
  const isAdmin = user?.rol === USER_TYPES.ADMIN;
  const isOperator = user?.rol === USER_TYPES.OPERATOR;

  // Obtener la ruta de reservaciones según el tipo de operador
  const reservationsRoute = getReservationsRoute();

  const handleLogout = () => {
    // TODO: Implementar lógica de cerrar sesión
    logout();
  };

  return (
    <RBNavbar expand="lg" className="mb-2">
      <Card
        className="w-100 border-0 rounded"
        style={{ backgroundColor: "#6a92b2" }}
      >
        <Card.Body className="p-3">
          <div className="d-flex align-items-center justify-content-between flex-wrap">
            {/* Logo y título */}
            <div className="d-flex align-items-center gap-3 mb-2 mb-lg-0">
              <img src={logo} alt="DrakeIn" width="100" height="100" />
              <h5 className="mb-0 text-white fw-semibold d-none d-lg-block">
                Gestión de rutas acuáticas en Bahía Drake
              </h5>
            </div>

            {/* Toggle para móvil */}
            <RBNavbar.Toggle
              aria-controls="basic-navbar-nav"
              className="border-0 text-white"
              style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
            />

            {/* Nav items alineados verticalmente al centro */}
            <RBNavbar.Collapse id="basic-navbar-nav" className="flex-grow-0">
              <Nav className="gap-2 d-flex align-items-center">
                <Nav.Link
                  as={Link}
                  to={ROUTES.HOME}
                  active={location.pathname === ROUTES.HOME}
                  className="text-white px-3 py-2 rounded fw-medium"
                  style={{
                    backgroundColor:
                      location.pathname === ROUTES.HOME
                        ? "rgba(255,255,255,0.2)"
                        : "transparent",
                    transition: "all 0.2s",
                  }}
                >
                  Inicio
                </Nav.Link>

                {/* Link solo para OPERADOR */}
                {isOperator && (
                  <Nav.Link
                    as={Link}
                    to={reservationsRoute}
                    active={location.pathname === reservationsRoute}
                    className="text-white px-3 py-2 rounded fw-medium"
                    style={{
                      backgroundColor:
                        location.pathname === reservationsRoute
                          ? "rgba(255,255,255,0.2)"
                          : "transparent",
                      transition: "all 0.2s",
                    }}
                  >
                    Ver Reservaciones
                  </Nav.Link>
                )}

                {/* Links solo para ADMIN */}
                {isAdmin && (
                  <>
                    <Nav.Link
                      as={Link}
                      to={ROUTES.RUTAS}
                      active={location.pathname === ROUTES.RUTAS}
                      className="text-white px-3 py-2 rounded fw-medium"
                      style={{
                        backgroundColor:
                          location.pathname === ROUTES.RUTAS
                            ? "rgba(255,255,255,0.2)"
                            : "transparent",
                        transition: "all 0.2s",
                      }}
                    >
                      Administrar Rutas
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to={ROUTES.REGISTRO}
                      active={location.pathname === ROUTES.REGISTRO}
                      className="text-white px-3 py-2 rounded fw-medium"
                      style={{
                        backgroundColor:
                          location.pathname === ROUTES.REGISTRO
                            ? "rgba(255,255,255,0.2)"
                            : "transparent",
                        transition: "all 0.2s",
                      }}
                    >
                      Administrar Operadores
                    </Nav.Link>
                  </>
                )}

                {/* Mostrar Login o Menú de Usuario según estado de autenticación */}
                {!isAuthenticated ? (
                  <Nav.Link
                    as={Link}
                    to={ROUTES.LOGIN}
                    active={location.pathname === ROUTES.LOGIN}
                    className="text-white px-3 py-2 rounded fw-medium"
                    style={{
                      backgroundColor:
                        location.pathname === ROUTES.LOGIN
                          ? "rgba(255,255,255,0.2)"
                          : "transparent",
                      transition: "all 0.2s",
                    }}
                  >
                    Iniciar Sesión
                  </Nav.Link>
                ) : (
                  <NavDropdown
                    title={user?.nombre || user?.email || "Usuario"}
                    id="user-dropdown"
                    className="text-white"
                    align="end"
                    menuVariant="light"
                  >
                    <NavDropdown.Item onClick={handleLogout}>
                      Cerrar Sesión
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
              </Nav>
            </RBNavbar.Collapse>
          </div>
        </Card.Body>
      </Card>
    </RBNavbar>
  );
};

export default Navbar;
