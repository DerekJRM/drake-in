import React, { useState } from "react";
import { Row, Col, Card, Button, Form, Alert } from "react-bootstrap";
import { ROUTES } from "../utils/constants";
import { PasswordInput } from "../components/common";
import { useAuth } from "../components/contexts/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleContact = () => {
    const footer = document.querySelector("footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (error) setError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    login(
      {
        usuario: formData.email,
        contrasena: formData.password,
      },
      {
        onSuccess: () => {
          setIsLoading(false);
        },
        onError: (err) => {
          setIsLoading(false);
          setError("Error al iniciar sesión");
        },
      }
    );
  };

  return (
    <Row className="justify-content-center align-items-center min-vh-100 py-4">
      <Col xs={12} md={8} lg={6} xl={5}>
        <Card className="shadow-lg border-0">
          {/* Header con branding */}
          <Card.Header className="bg-info text-white text-center py-4 border-0">
            <div className="mb-2">
              <i className="bi bi-ship fs-1"></i>
            </div>
            <h3 className="fw-bold mb-0">DrakeIn</h3>
            <p className="mb-0 small">Sistema de Gestión de Transporte Marítimo</p>
          </Card.Header>

          <Card.Body className="p-4">
            {/* Título de la sección */}
            <div className="text-center mb-4">
              <h4 className="fw-bold" style={{ color: "#007b8f" }}>
                <i className="bi bi-box-arrow-in-right me-2"></i>
                Iniciar Sesión
              </h4>
              <p className="text-muted small">Ingresa tus credenciales para continuar</p>
            </div>

            {/* Formulario */}
            <Form onSubmit={handleSubmit} noValidate>
              {/* Error de autenticación */}
              {error && (
                <Alert variant="danger" className="d-flex align-items-center mb-3">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  <div>
                    <strong>Error:</strong> {error}
                  </div>
                </Alert>
              )}

              {/* Correo electrónico */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">
                  <i className="bi bi-envelope me-2 text-info"></i>
                  Correo electrónico
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  required
                  disabled={isLoading}
                  size="lg"
                />
              </Form.Group>

              {/* Contraseña */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">
                  <i className="bi bi-lock me-2 text-info"></i>
                  Contraseña
                </Form.Label>
                <PasswordInput
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Tu contraseña"
                  required
                  disabled={isLoading}
                  size="lg"
                />
              </Form.Group>

              {/* Botón de inicio de sesión */}
              <div className="d-grid gap-2 mb-3">
                <Button
                  variant="info"
                  type="submit"
                  disabled={isLoading}
                  className="text-white fw-semibold py-2"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Iniciando sesión...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-box-arrow-in-right me-2"></i>
                      Iniciar Sesión
                    </>
                  )}
                </Button>
              </div>
            </Form>
          </Card.Body>

          {/* Footer con registro */}
          <Card.Footer className="bg-light border-0 text-center py-3">
            <p className="mb-0 text-muted">
              ¿No tienes cuenta? ¿Olvidaste tu contraseña?{" "}
              <button
                onClick={handleContact}
                className="btn btn-link text-info fw-semibold text-decoration-none p-0 m-0"
                style={{ boxShadow: "none" }}
              >
                Contacta con los administradores
              </button>
            </p>
          </Card.Footer>

        </Card>
      </Col>
    </Row>
  );
};

export default Login;