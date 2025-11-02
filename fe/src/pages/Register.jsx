import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Button, Form, Alert, Modal } from "react-bootstrap";
import { ROUTES, OPERATOR_TYPES } from "../utils/constants";
import { useRegister } from "../hooks/useAuth";
import { useOperadores, useSaveOperador, useDeleteOperador } from "../hooks/useOperadores";
import useFormValidation from "../hooks/useFormValidation";
import { validateRegisterForm } from "../utils/validators";
import { PasswordInput } from "../components/common";

const Register = () => {
  const navigate = useNavigate();
  const { mutate: saveUsuario, isLoading: isRegistering } = useRegister();
  const { data: operadores = [], isLoading: isLoadingOperadores } = useOperadores();
  const { mutate: saveOperador, isLoading: isSaving } = useSaveOperador();
  const { mutate: deleteOperador, isLoading: isDeleting } = useDeleteOperador();
  
  const { fieldErrors, validate, clearFieldError } =
    useFormValidation(validateRegisterForm);
  const [apiError, setApiError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingOperador, setEditingOperador] = useState(null);

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

    if (!validate(formData)) {
      return;
    }

    const usuario = {
      usuario: formData.email,
      contrasena: formData.password,
      rol: formData.userType,
      ...(formData.userType === OPERATOR_TYPES.HOTEL
        ? { nombre: formData.hotelName }
        : { nombre: formData.boatName }),
      new_item: true,
    };

    saveUsuario(usuario, {
      onSuccess: () => {
        alert("¡Usuario registrado exitosamente!");
        // Limpiar formulario
        setFormData({
          userType: "",
          hotelName: "",
          boatName: "",
          email: "",
          password: "",
        });
        setApiError("");
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

  const handleEdit = (operador) => {
    setEditingOperador(operador);
    setEditFormData({
      nombre: operador.nombre || "",
      updateable_fields: ["nombre"],
    });
    setShowModal(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    if (!editFormData.nombre.trim()) {
      alert("El nombre no puede estar vacío");
      return;
    }

    const updatedOperador = {
      ...editingOperador,
      nombre: editFormData.nombre,
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
        onSuccess: () => {
          alert("Operador eliminado exitosamente");
        },
        onError: (error) => {
          console.error("Error al eliminar operador:", error);
          alert("Error al eliminar el operador. Por favor, intenta nuevamente.");
        },
      });
    }
  };

  const getOperadorIcon = (rol) => {
    return rol === OPERATOR_TYPES.HOTEL ? "bi-building" : "bi-boat-fill";
  };

  const getOperadorType = (rol) => {
    return rol === OPERATOR_TYPES.HOTEL ? "Hotel" : "Operador de Bote";
  };

  return (
    <Row className="my-4">
      <Col xs={12}>
        <Card className="shadow-sm border-0">
          <Card.Body className="p-4">
            {/* Header */}
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className="d-flex align-items-center gap-2">
                <i
                  className="bi bi-person-plus-fill fs-3"
                  style={{ color: "#007b8f" }}
                ></i>
                <h3 className="fw-bold mb-0" style={{ color: "#007b8f" }}>
                  Administración de Operadores
                </h3>
              </div>
            </div>

            {/* Subheader - Formulario de Registro */}
            <Card.Header className="bg-info text-white fw-semibold py-3 rounded mb-3">
              <i className="bi bi-clipboard-check me-2"></i>
              Registrar Nuevo Operador
            </Card.Header>

            {/* Form Container */}
            <Card className="shadow-sm border-0 mb-4">
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
                    <Form.Label className="fw-semibold">
                      <i className="bi bi-person-badge me-2 text-info"></i>
                      Tipo de usuario
                    </Form.Label>
                    <Form.Select
                      name="userType"
                      value={formData.userType}
                      onChange={handleChange}
                      required
                      disabled={isRegistering}
                      isInvalid={!!fieldErrors.userType}
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
                      <Form.Label className="fw-semibold">
                        <i className="bi bi-building me-2 text-info"></i>
                        Nombre del Hotel
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="hotelName"
                        value={formData.hotelName}
                        onChange={handleChange}
                        placeholder="Nombre del hotel"
                        required
                        disabled={isRegistering}
                        isInvalid={!!fieldErrors.hotelName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {fieldErrors.hotelName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  )}

                  {/* Nombre del Bote */}
                  {formData.userType === OPERATOR_TYPES.BOTE && (
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">
                        <i className="bi bi-boat-fill me-2 text-info"></i>
                        Nombre del Bote
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="boatName"
                        value={formData.boatName}
                        onChange={handleChange}
                        placeholder="Nombre del bote"
                        required
                        disabled={isRegistering}
                        isInvalid={!!fieldErrors.boatName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {fieldErrors.boatName}
                      </Form.Control.Feedback>
                    </Form.Group>
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
                      disabled={isRegistering}
                      isInvalid={!!fieldErrors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {fieldErrors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Contraseña */}
                  <Form.Group className="mb-4">
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
                      disabled={isRegistering}
                      error={fieldErrors.password}
                    />
                  </Form.Group>

                  {/* Botón de submit */}
                  <div className="d-grid gap-2">
                    <Button
                      variant="info"
                      type="submit"
                      disabled={isRegistering}
                      className="text-white fw-semibold py-2"
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
                  </div>
                </Form>
              </Card.Body>
            </Card>

            {/* Subheader - Lista de Operadores */}
            <Card.Header className="bg-info text-white fw-semibold py-3 rounded mb-3">
              <i className="bi bi-list-check me-2"></i>
              Operadores Registrados
            </Card.Header>

            {/* Lista de Operadores */}
            {isLoadingOperadores ? (
              <div className="text-center py-4">
                <div className="spinner-border text-info" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
              </div>
            ) : (
              <div className="d-flex flex-column gap-3">
                {operadores.map((operador) => (
                  <Card key={operador.id} className="shadow-sm border-0">
                    <Card.Body className="p-3">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h5 className="fw-bold text-dark mb-2">
                            <i className={`${getOperadorIcon(operador.rol)} text-info me-2`}></i>
                            {operador.nombre}
                          </h5>
                          <p className="mb-1">
                            <strong>Tipo:</strong> {getOperadorType(operador.tipo)}
                          </p>
                          <p className="mb-0">
                            <strong>Correo:</strong> {operador.correo}
                          </p>
                        </div>
                        <div className="d-flex flex-column gap-2">
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
                    </Card.Body>
                  </Card>
                ))}

                {operadores.length === 0 && (
                  <div className="text-center text-muted py-4">
                    <i className="bi bi-info-circle me-2"></i>
                    No hay operadores registrados.
                  </div>
                )}
              </div>
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
              <Form.Label className="fw-semibold">
                <i className={`${editingOperador ? getOperadorIcon(editingOperador.rol) : 'bi-building'} me-2 text-info`}></i>
                Nombre del {editingOperador?.rol === OPERATOR_TYPES.HOTEL ? 'Hotel' : 'Bote'}
              </Form.Label>
              <Form.Control
                type="text"
                value={editFormData.nombre}
                onChange={(e) => setEditFormData({ nombre: e.target.value })}
                placeholder={`Nombre del ${editingOperador?.rol === OPERATOR_TYPES.HOTEL ? 'hotel' : 'bote'}`}
                required
                disabled={isSaving}
              />
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