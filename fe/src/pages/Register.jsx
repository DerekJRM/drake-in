import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 'navigate' sigue aquí para el onSuccess
import { USER_TYPES, ROUTES } from "../utils/constants";
import { useRegister } from "../hooks/useAuth";
import useFormValidation from "../hooks/useFormValidation";
import { validateRegisterForm } from "../utils/validators";
// Importar componentes de react-bootstrap
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
  InputGroup,
} from "react-bootstrap";
// 'Link' ya no es necesario

const Register = () => {
  const navigate = useNavigate();
  const { mutate: saveUsuario, isLoading } = useRegister();
  const { fieldErrors, validate, clearFieldError } =
    useFormValidation(validateRegisterForm);
  const [apiError, setApiError] = useState("");
  
  // Estados para mostrar/ocultar contraseñas
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // <-- NUEVO

  const initialState = {
    userType: "",
    hotelName: "",
    boatName: "",
    email: "",
    password: "",
    confirmPassword: "", // <-- NUEVO
  };

  const [formData, setFormData] = useState(initialState);

  // La lógica de handleChange permanece idéntica
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (name === "userType") {
        return {
          ...prev,
          [name]: value,
          hotelName: "",
          boatName: "",
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });
    clearFieldError(name);
    if (name === "userType") {
      clearFieldError("hotelName");
      clearFieldError("boatName");
    }
    setApiError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setApiError(""); // Limpiar errores en cada envío

    // --- NUEVA VALIDACIÓN ---
    if (formData.password !== formData.confirmPassword) {
      setApiError("Las contraseñas no coinciden. Por favor, verifíquelas.");
      return;
    }
    // --- FIN NUEVA VALIDACIÓN ---

    if (!validate(formData)) {
      return;
    }
    const usuario = {
      usuario: formData.email,
      contrasena: formData.password,
      rol: formData.userType,
      ...(formData.userType === USER_TYPES.HOTEL
        ? { nombre: formData.hotelName }
        : { nombre: formData.boatName }),
      new_item: true,
    };
    saveUsuario(usuario, {
      onSuccess: () => {
        alert("¡Usuario registrado exitosamente!");
        // --- LÓGICA DE SUCCESS ACTUALIZADA ---
        // navigate(ROUTES.LOGIN); // <-- ELIMINADO
        setFormData(initialState); // <-- AÑADIDO (Limpia el formulario)
      },
      onError: (error) => {
        console.error("Error al registrar usuario:", error);
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data ||
          "Error al registrar usuario. Por favor, intenta nuevamente.";
        setApiError(errorMessage);
      },
    });
  };

  // --- RENDERIZADO (Con nuevo estilo) ---
  return (
    <Container>
      <Row className="justify-content-center mt-4"> {/* Margen reducido */}
        <Col md={8} lg={6} xl={5}>
          <Card className="shadow-sm border-0 rounded-3">
            {/* Cabecera estilizada */}
            <Card.Header
              className="p-3 text-white text-center rounded-top" // Padding reducido
              style={{ backgroundColor: "#6a92b2", borderBottom: "none" }}
            >
              <i className="bi bi-person-plus-fill" style={{fontSize: "2.5rem"}}></i>
              <h2 className="mb-0 fw-bold">Registrar Operador</h2>
              <p className="mb-0 opacity-75 fs-6">
                Crea una nueva cuenta de hotel o bote
              </p>
            </Card.Header>

            <Card.Body className="p-4">
              <Form noValidate onSubmit={handleSubmit}>
                {/* Alerta de Error de API */}
                {apiError && (
                  <Alert
                    variant="danger"
                    onClose={() => setApiError("")}
                    dismissible
                    className="d-flex align-items-center"
                  >
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {apiError}
                  </Alert>
                )}

                {/* Tipo de Usuario */}
                <Form.Group className="mb-3" controlId="registerUserType">
                  <Form.Label className="fw-semibold">
                    Tipo de usuario
                  </Form.Label>
                  <Form.Select
                    name="userType"
                    value={formData.userType}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="shadow-sm"
                    isInvalid={!!fieldErrors.userType} // <-- Manejo de error
                  >
                    <option value="">Selecciona el tipo de usuario</option>
                    <option value={USER_TYPES.HOTEL}>Hotel</option>
                    <option value={USER_TYPES.OPERATOR}>Operador de Bote</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {fieldErrors.userType}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Campo Condicional: Nombre del Hotel */}
                {formData.userType === USER_TYPES.HOTEL && (
                  <Form.Group className="mb-3" controlId="registerHotelName">
                    <Form.Label className="fw-semibold">
                      Nombre del Hotel
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="hotelName"
                      value={formData.hotelName}
                      onChange={handleChange}
                      placeholder="Nombre del hotel"
                      required
                      disabled={isLoading}
                      className="shadow-sm"
                      isInvalid={!!fieldErrors.hotelName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {fieldErrors.hotelName}
                    </Form.Control.Feedback>
                  </Form.Group>
                )}

                {/* Campo Condicional: Nombre del Bote */}
                {formData.userType === USER_TYPES.OPERATOR && (
                  <Form.Group className="mb-3" controlId="registerBoatName">
                    <Form.Label className="fw-semibold">
                      Nombre del Bote
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="boatName"
                      value={formData.boatName}
                      onChange={handleChange}
                      placeholder="Nombre del bote"
                      required
                      disabled={isLoading}
                      className="shadow-sm"
                      isInvalid={!!fieldErrors.boatName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {fieldErrors.boatName}
                    </Form.Control.Feedback>
                  </Form.Group>
                )}

                {/* Campo de Email */}
                <Form.Group className="mb-3" controlId="registerEmail">
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
                    isInvalid={!!fieldErrors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {fieldErrors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Campo de Contraseña (con toggle) */}
                <Form.Group className="mb-3" controlId="registerPassword">
                  <Form.Label className="fw-semibold">Contraseña</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Tu contraseña"
                      required
                      disabled={isLoading}
                      className="shadow-sm"
                      isInvalid={!!fieldErrors.password}
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                      style={{ borderTopRightRadius: '0.375rem', borderBottomRightRadius: '0.375rem' }}
                    >
                      <i
                        className={
                          showPassword ? "bi bi-eye-slash" : "bi bi-eye"
                        }
                      ></i>
                    </Button>
                    <Form.Control.Feedback type="invalid">
                      {fieldErrors.password}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                {/* --- NUEVO CAMPO: CONFIRMAR CONTRASEÑA --- */}
                <Form.Group className="mb-4" controlId="registerConfirmPassword">
                  <Form.Label className="fw-semibold">Confirmar Contraseña</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirme su contraseña"
                      required
                      disabled={isLoading}
                      className="shadow-sm"
                      // No usamos isInvalid aquí ya que es un chequeo manual
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      disabled={isLoading}
                      style={{ borderTopRightRadius: '0.375rem', borderBottomRightRadius: '0.375rem' }}
                    >
                      <i
                        className={
                          showConfirmPassword ? "bi bi-eye-slash" : "bi bi-eye"
                        }
                      ></i>
                    </Button>
                  </InputGroup>
                </Form.Group>


                {/* Botón de Submit */}
                <div className="d-grid">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="fw-semibold shadow"
                    style={{
                      backgroundColor: "#6a92b2",
                      border: "none",
                    }}
                    size="lg"
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
                        <span className="ms-2">Registrando...</span>
                      </>
                    ) : (
                      "Registrar Operador"
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
            
            {/* --- FOOTER ELIMINADO --- */}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;

