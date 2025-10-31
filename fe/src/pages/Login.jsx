import React, { useState } from "react";
// 1. Importar los componentes de react-bootstrap (se añade InputGroup)
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
  InputGroup, // <-- Añadido para el toggle de contraseña
} from "react-bootstrap";
import { useAuth } from "../components/contexts/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // <-- Estado para ver contraseña

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  // La lógica de handleChange y handleSubmit permanece idéntica
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
          setError(
            err?.response?.data?.message ||
              err?.message ||
              "Error al iniciar sesión"
          );
        },
      }
    );
  };

  // --- 2. RENDERIZADO (Ajustado para ser más compacto) ---
  return (
    <Container>
      <Row className="justify-content-center mt-4"> {/* Margen superior reducido */}
        {/* Columna responsiva para centrar el formulario */}
        <Col md={8} lg={6} xl={5}>
          <Card className="shadow-sm border-0 rounded-3">
            {/* Cabecera estilizada (más compacta) */}
            <Card.Header
              className="p-3 text-white text-center rounded-top" // <-- Padding reducido de p-4 a p-3
              style={{ backgroundColor: "#6a92b2", borderBottom: "none" }}
            >
              <i className="bi bi-box-arrow-in-right" style={{fontSize: "2.5rem"}}></i> {/* <-- Icono más pequeño */}
              <h2 className="mb-0 fw-bold">Iniciar Sesión</h2> {/* <-- mt-2 eliminado */}
              <p className="mb-0 opacity-75 fs-6"> {/* <-- fs-6 para texto más pequeño */}
                Accede a tu panel de operador
              </p>
            </Card.Header>

            <Card.Body className="p-4"> {/* <-- Padding unificado a p-4 */}
              <Form onSubmit={handleSubmit} noValidate>
                {/* Alerta de Error */}
                {error && (
                  <Alert
                    variant="danger"
                    onClose={() => setError(null)}
                    dismissible
                    className="d-flex align-items-center"
                  >
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {error}
                  </Alert>
                )}

                {/* Campo de Email */}
                <Form.Group className="mb-3" controlId="loginEmail">
                  <Form.Label className="fw-semibold">
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
                    className="shadow-sm"
                    // size="lg" eliminado para hacerlo más compacto
                  />
                </Form.Group>

                {/* Campo de Contraseña (con toggle) */}
                <Form.Group className="mb-3" controlId="loginPassword">
                  <Form.Label className="fw-semibold">Contraseña</Form.Label>
                  {/* --- InputGroup para el botón de ver/ocultar --- */}
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password"} // <-- Tipo dinámico
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Tu contraseña"
                      required
                      disabled={isLoading}
                      className="shadow-sm"
                      // size="lg" eliminado
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                      style={{ borderTopRightRadius: '0.375rem', borderBottomRightRadius: '0.375rem' }}
                    >
                      <i
                        className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}
                      ></i>
                    </Button>
                  </InputGroup>
                </Form.Group>

                {/* Recordarme (Botón de olvido eliminado) */}
                <Form.Check
                  type="checkbox"
                  name="rememberMe"
                  id="rememberMe"
                  label="Recordarme"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="mb-4" // <-- Solo 'Recordarme' con margen inferior
                />

                {/* Botón de Submit (estilos de tamaño eliminados) */}
                <div className="d-grid">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="fw-semibold shadow"
                    style={{
                      backgroundColor: "#6a92b2",
                      border: "none",
                    }}
                    size="lg" // Usamos el 'size' de Bootstrap para un botón grande pero estándar
                  >
                    {isLoading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                        <span className="ms-2">Iniciando sesión...</span>
                      </>
                    ) : (
                      "Iniciar Sesión"
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
          
          {/* Enlace de Registro Eliminado */}
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

