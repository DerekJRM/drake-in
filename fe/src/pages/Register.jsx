import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Button, Form, Alert, Modal, Accordion } from "react-bootstrap";
import { ROUTES, OPERATOR_TYPES } from "../utils/constants";
import { useRegister } from "../hooks/useAuth";
import { useOperadores, useSaveOperador, useDeleteOperador } from "../hooks/useOperadores";

const Register = () => {
  const navigate = useNavigate();
  const { mutate: saveUsuario, isLoading: isRegistering } = useRegister();
  const { data: operadores = [], isLoading: isLoadingOperadores } = useOperadores();
  const { mutate: saveOperador, isLoading: isSaving } = useSaveOperador();
  const { mutate: deleteOperador, isLoading: isDeleting } = useDeleteOperador();
  
  const [apiError, setApiError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingOperador, setEditingOperador] = useState(null);
  const [validated, setValidated] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    userType: "",
    hotelName: "",
    boatName: "",
    email: "",
    password: "",
  });

  const [formData, setFormData] = useState({
    userType: "",
    hotelName: "",
    boatName: "",
    email: "",
    password: "",
  });

  const [editFormData, setEditFormData] = useState({
    nombre: "",
    updateable_fields: [],
  });

  // ========== VALIDACIONES ==========
  
  const validateUserType = (userType) => {
    if (!userType) return "Debes seleccionar un tipo de usuario";
    if (![OPERATOR_TYPES.HOTEL, OPERATOR_TYPES.BOTE].includes(userType)) return "Tipo de usuario inválido";
    return "";
  };

  const validateHotelName = (hotelName, userType) => {
    if (userType === OPERATOR_TYPES.HOTEL) {
      if (!hotelName.trim()) return "El nombre del hotel es obligatorio";
      if (hotelName.trim().length < 3) return "El nombre del hotel debe tener al menos 3 caracteres";
      if (hotelName.trim().length > 100) return "El nombre del hotel no puede exceder 100 caracteres";
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s\-\.]+$/.test(hotelName)) return "El nombre del hotel contiene caracteres no válidos";
    }
    return "";
  };

  const validateBoatName = (boatName, userType) => {
    if (userType === OPERATOR_TYPES.BOTE) {
      if (!boatName.trim()) return "El nombre del bote es obligatorio";
      if (boatName.trim().length < 3) return "El nombre del bote debe tener al menos 3 caracteres";
      if (boatName.trim().length > 100) return "El nombre del bote no puede exceder 100 caracteres";
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s\-\.]+$/.test(boatName)) return "El nombre del bote contiene caracteres no válidos";
    }
    return "";
  };

  const validateEmail = (email) => {
    if (!email.trim()) return "El correo electrónico es obligatorio";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "El formato del correo electrónico no es válido";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "La contraseña es obligatoria";
    return "";
  };

  const validateField = (name, value, currentFormData = formData) => {
    let error = "";
    
    switch (name) {
      case "userType": error = validateUserType(value); break;
      case "hotelName": error = validateHotelName(value, currentFormData.userType); break;
      case "boatName": error = validateBoatName(value, currentFormData.userType); break;
      case "email": error = validateEmail(value); break;
      case "password": error = validatePassword(value); break;
      default: break;
    }

    setFieldErrors((prev) => ({ ...prev, [name]: error }));
    return error === "";
  };

  const validateEditName = (nombre) => {
    if (!nombre.trim()) return "El nombre es obligatorio";
    if (nombre.trim().length < 3) return "El nombre debe tener al menos 3 caracteres";
    if (nombre.trim().length > 100) return "El nombre no puede exceder 100 caracteres";
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s\-\.]+$/.test(nombre)) return "El nombre contiene caracteres no válidos";
    return "";
  };

  // ========== MANEJADORES ==========

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prev) => {
      const newFormData = { ...prev, [name]: value };

      if (name === "userType") {
        newFormData.hotelName = "";
        newFormData.boatName = "";
        setFieldErrors((prev) => ({ ...prev, hotelName: "", boatName: "" }));
      }

      if (validated) {
        setTimeout(() => validateField(name, value, newFormData), 0);
      }

      return newFormData;
    });

    setApiError("");
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (validated) validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidated(true);

    const userTypeError = validateUserType(formData.userType);
    const hotelNameError = validateHotelName(formData.hotelName, formData.userType);
    const boatNameError = validateBoatName(formData.boatName, formData.userType);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    setFieldErrors({
      userType: userTypeError,
      hotelName: hotelNameError,
      boatName: boatNameError,
      email: emailError,
      password: passwordError,
    });

    if (userTypeError || hotelNameError || boatNameError || emailError || passwordError) {
      setApiError("Por favor, corrige los errores en el formulario antes de continuar");
      return;
    }

    const usuario = {
      usuario: formData.email.trim(),
      contrasena: formData.password,
      rol: formData.userType,
      ...(formData.userType === OPERATOR_TYPES.HOTEL
        ? { nombre: formData.hotelName.trim() }
        : { nombre: formData.boatName.trim() }),
      new_item: true,
    };

    saveUsuario(usuario, {
      onSuccess: () => {
        alert("¡Usuario registrado exitosamente!");
        setFormData({ userType: "", hotelName: "", boatName: "", email: "", password: "" });
        setValidated(false);
        setFieldErrors({ userType: "", hotelName: "", boatName: "", email: "", password: "" });
        setApiError("");
      },
      onError: (error) => {
        console.error("Error al registrar usuario:", error);
        
        let errorMessage = "Error al registrar usuario. Por favor, intenta nuevamente.";
        
        if (error.message) {
          errorMessage = error.message;
        } else if (error.response?.data) {
          if (typeof error.response.data === 'string') {
            errorMessage = error.response.data;
          } else if (error.response.data.message) {
            errorMessage = error.response.data.message;
          }
        }
        
        setApiError(errorMessage);
      },
    });
  };

  const handleEdit = (operador) => {
    setEditingOperador(operador);
    setEditFormData({ nombre: operador.nombre || "", updateable_fields: ["nombre"] });
    setShowModal(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    const nameError = validateEditName(editFormData.nombre);
    if (nameError) {
      alert(nameError);
      return;
    }

    const updatedOperador = {
      ...editingOperador,
      nombre: editFormData.nombre.trim(),
      new_item: false,
      updateable_fields: ["nombre"],
    };

    saveOperador(updatedOperador, {
      onSuccess: () => {
        alert("Operador actualizado exitosamente");
        setShowModal(false);
        setEditingOperador(null);
      },
      onError: (error) => {
        console.error("Error al actualizar operador:", error);
        alert("Error al actualizar el operador. Por favor, intenta nuevamente.");
      },
    });
  };

  const handleDelete = (operador) => {
    if (window.confirm(`¿Seguro que deseas eliminar a ${operador.nombre}?`)) {
      deleteOperador(operador.id, {
        onSuccess: () => alert("Operador eliminado exitosamente"),
        onError: (error) => {
          console.error("Error al eliminar operador:", error);
          alert("Error al eliminar el operador. Por favor, intenta nuevamente.");
        },
      });
    }
  };

  const getOperadorIcon = (rol) => {
    return rol === OPERATOR_TYPES.HOTEL ? "bi-building" : "bi-water";
  };

  const getOperadorType = (rol) => {
    return rol === OPERATOR_TYPES.HOTEL ? "Hotel" : "Operador de Bote";
  };

  return (
    <Row className="mb-3">
      <Col xs={12}>
        <Card className="shadow-sm">
          <Card.Body className="p-4">
            {/* Título */}
            <div className="d-flex align-items-center gap-3 mb-4">
              <div
                className="d-flex align-items-center justify-content-center rounded"
                style={{
                  backgroundColor: "#6a92b2",
                  width: "50px",
                  height: "50px",
                  color: "white",
                  fontSize: "24px",
                }}
              >
                <i className="bi bi-person-plus"></i>
              </div>
              <h2
                className="mb-0 fw-bold"
                style={{ color: "#6a92b2", fontSize: "28px" }}
              >
                Administración de Operadores
              </h2>
            </div>
            <hr className="my-4" />

            {/* Formulario de Registro */}
            <Card.Header className="mb-3 bg-info text-white d-flex align-items-center gap-2 py-3 rounded">
              <i className="bi bi-clipboard-check fs-5"></i>
              <span className="fw-semibold">Registrar Nuevo Operador</span>
            </Card.Header>

            <Card className="shadow-sm mb-4">
              <Card.Body className="p-4">
                <Form onSubmit={handleSubmit} noValidate>
                  {/* Error de API */}
                  {apiError && (
                    <Alert variant="danger" className="d-flex align-items-center">
                      <i className="bi bi-exclamation-triangle-fill me-2"></i>
                      {apiError}
                    </Alert>
                  )}

                  {/* Tipo de usuario */}
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-medium">
                      <i className="bi bi-person-badge text-info me-2"></i>
                      Tipo de usuario
                    </Form.Label>
                    <Form.Select
                      name="userType"
                      value={formData.userType}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      disabled={isRegistering}
                      isInvalid={!!fieldErrors.userType}
                      isValid={validated && !fieldErrors.userType && formData.userType}
                    >
                      <option value="">Selecciona el tipo de usuario</option>
                      <option value={OPERATOR_TYPES.HOTEL}>Hotel</option>
                      <option value={OPERATOR_TYPES.BOTE}>Operador de Bote</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {fieldErrors.userType}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Nombre del Hotel */}
                  {formData.userType === OPERATOR_TYPES.HOTEL && (
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-medium">
                        <i className="bi bi-building text-info me-2"></i>
                        Nombre del Hotel
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="hotelName"
                        value={formData.hotelName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Nombre del hotel"
                        required
                        disabled={isRegistering}
                        isInvalid={!!fieldErrors.hotelName}
                        isValid={validated && !fieldErrors.hotelName && formData.hotelName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {fieldErrors.hotelName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  )}

                  {/* Nombre del Bote */}
                  {formData.userType === OPERATOR_TYPES.BOTE && (
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-medium">
                        <i className="bi bi-water text-info me-2"></i>
                        Nombre del Dueño
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="boatName"
                        value={formData.boatName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Nombre del bote"
                        required
                        disabled={isRegistering}
                        isInvalid={!!fieldErrors.boatName}
                        isValid={validated && !fieldErrors.boatName && formData.boatName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {fieldErrors.boatName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  )}

                  {/* Correo electrónico */}
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-medium">
                      <i className="bi bi-envelope text-info me-2"></i>
                      Correo electrónico
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="tu@email.com"
                      required
                      disabled={isRegistering}
                      isInvalid={!!fieldErrors.email}
                      isValid={validated && !fieldErrors.email && formData.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {fieldErrors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Contraseña */}
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-medium">
                      <i className="bi bi-lock text-info me-2"></i>
                      Contraseña
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Tu contraseña"
                      required
                      disabled={isRegistering}
                      isInvalid={!!fieldErrors.password}
                      isValid={validated && !fieldErrors.password && formData.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {fieldErrors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Botón de submit */}
                  <Button
                    variant="info"
                    type="submit"
                    disabled={isRegistering}
                    className="w-100 text-white fw-medium"
                  >
                    {isRegistering ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Registrando...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle me-2"></i>
                        Registrar Operador
                      </>
                    )}
                  </Button>
                </Form>
              </Card.Body>
            </Card>

            <hr className="my-4" />

            {/* Lista de Operadores */}
            <Card.Header className="mb-3 bg-info text-white d-flex align-items-center gap-2 py-3 rounded">
              <i className="bi bi-list-check fs-5"></i>
              <span className="fw-semibold">Operadores Registrados</span>
            </Card.Header>

            {isLoadingOperadores ? (
              <div className="text-center py-5">
                <div className="spinner-border text-info" style={{ width: "3rem", height: "3rem" }}>
                  <span className="visually-hidden">Cargando...</span>
                </div>
              </div>
            ) : (
              <Accordion>
                {operadores.map((operador, index) => (
                  <Accordion.Item eventKey={String(index)} key={operador.id} className="mb-2">
                    <Accordion.Header>
                      <div className="d-flex justify-content-between w-100 pe-3">
                        <div className="fw-bold">
                          <i className={`${getOperadorIcon(operador.tipo)} text-info me-2`}></i>
                          {operador.nombre}
                        </div>
                        <div className="fw-medium text-muted">
                          {getOperadorType(operador.tipo)}
                        </div>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body className="p-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <p className="mb-1">
                            <i className="bi bi-envelope text-secondary me-2"></i>
                            <strong>Correo:</strong> {operador.correo}
                          </p>
                        </div>
                        <div className="d-flex gap-2">
                          <Button
                            variant="outline-info"
                            size="sm"
                            onClick={() => handleEdit(operador)}
                            disabled={isDeleting}
                          >
                            <i className="bi bi-pencil-square"></i>
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDelete(operador)}
                            disabled={isDeleting}
                          >
                            <i className="bi bi-trash"></i>
                          </Button>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}

                {operadores.length === 0 && (
                  <Alert variant="info" className="d-flex align-items-center">
                    <i className="bi bi-info-circle me-2"></i>
                    No hay operadores registrados.
                  </Alert>
                )}
              </Accordion>
            )}
          </Card.Body>
        </Card>
      </Col>

      {/* Modal de Edición */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="bg-info text-white">
          <Modal.Title>
            <i className="bi bi-pencil-square me-2"></i>
            Editar Operador
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">
                <i className={`${editingOperador ? getOperadorIcon(editingOperador.tipo) : 'bi-building'} me-2 text-info`}></i>
                Nombre del {editingOperador?.tipo === OPERATOR_TYPES.HOTEL ? 'Hotel' : 'Dueño'}
              </Form.Label>
              <Form.Control
                type="text"
                value={editFormData.nombre}
                onChange={(e) => setEditFormData({ nombre: e.target.value })}
                placeholder={`Nombre del ${editingOperador?.tipo === OPERATOR_TYPES.HOTEL ? 'hotel' : 'bote'}`}
                required
                disabled={isSaving}
              />
              <Form.Text className="text-muted">
                Mínimo 3 caracteres, máximo 100 caracteres.
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
            disabled={isSaving}
          >
            Cancelar
          </Button>
          <Button
            variant="info"
            onClick={handleEditSubmit}
            disabled={isSaving}
            className="text-white"
          >
            {isSaving ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Guardando...
              </>
            ) : (
              <>
                <i className="bi bi-check-circle me-2"></i>
                Guardar Cambios
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
};

export default Register;