import React, { useState } from "react";
import logo from './resources/logo.png';
import './styles/App.css';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiRest from './components/service';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Form, Modal, Alert, Image } from "react-bootstrap";
import { utils } from "./components/utils";

function App() {
  const queryClient = useQueryClient();

  const [showModal, setShowModal] = useState(false);
  const [formHorario, setFormHorario] = useState({ id: null, hora: "", newItem: true, updateableFields: [] });
  const [mensajeError, setMensajeError] = useState(null);
  const [mensajeExito, setMensajeExito] = useState(null);

  // Obtener todos los horarios
  const { data: horarios = [], isLoading } = useQuery({
    queryKey: ["horarios"],
    queryFn: apiRest.getHorarios
  });

  // Mutación para crear o actualizar horario
  const saveMutation = useMutation(apiRest.saveHorario, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["horarios"]);
      setShowModal(false);
      setFormHorario({ id: null, hora: "" });
      setMensajeExito("Horario guardado correctamente");
      setMensajeError(null);
    },
    onError: (error) => {
      // Siempre aseguramos que sea un string para mostrar en el Alert
      const mensaje = error.response?.data
        ? typeof error.response.data === "string"
          ? error.response.data
          : error.response.data.message || JSON.stringify(error.response.data)
        : error.message || "Error desconocido";
      setMensajeError(mensaje);
    }
  });

  // Mutación para eliminar horario
  const deleteMutation = useMutation(apiRest.deleteHorario, {
    onSuccess: () => queryClient.invalidateQueries(["horarios"]),
    onError: (error) => {
      const mensaje = error.response?.data
        ? typeof error.response.data === "string"
          ? error.response.data
          : error.response.data.message || JSON.stringify(error.response.data)
        : error.message || "Error desconocido";
      setMensajeError(mensaje);
    }
  });
  
  const [originalHorario, setOriginalHorario] = useState(null);

  const handleGuardar = () => {
    if (!formHorario.hora.trim()) {
      setMensajeError("La hora es obligatoria");
      return;
    }

    let horarioParaGuardar = { ...formHorario };

    if (!formHorario.newItem) {
      horarioParaGuardar.updateableFields = utils.getUpdatedFields(originalHorario, formHorario);
    }

    saveMutation.mutate(horarioParaGuardar);
  };


  const handleEditar = (horario) => {
    setFormHorario({ ...horario, newItem: false });
    setOriginalHorario({ ...horario }); // guardamos el original
    setShowModal(true);
    setMensajeError(null);
    setMensajeExito(null);
  };

  const handleEliminar = (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este horario?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <p>Cargando horarios...</p>;

  return (
    <div className="container mt-4">
      <h2>Gestión de Horarios</h2>

      {mensajeError && <Alert variant="danger">{mensajeError}</Alert>}
      {mensajeExito && <Alert variant="success">{mensajeExito}</Alert>}

      <Button className="mb-3" onClick={() => setShowModal(true)}>Nuevo Horario</Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Hora</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {horarios.map(h => (
            <tr key={h.id}>
              <td>{h.id}</td>
              <td>{h.hora}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEditar(h)}>Editar</Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleEliminar(h.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{formHorario.id ? "Editar Horario" : "Nuevo Horario"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Hora</Form.Label>
              <Form.Control
                type="time"
                value={formHorario.hora}
                onChange={e => setFormHorario({ ...formHorario, hora: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={handleGuardar}>
            {saveMutation.isLoading ? "Guardando..." : "Guardar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;