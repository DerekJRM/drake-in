import React, { useState } from "react";
import logo from './resources/logo.png';
import './styles/App.css';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiRest from './components/service';
import { Image } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const queryClient = useQueryClient();
  
  /*
  //Ejemplo de uso de React Query para manejar la API

  const [nuevoNombre, setNuevoNombre] = useState("");

  // Consulta para obtener usuarios
  const { data: usuarios = [], isLoading, error } = useQuery({
    queryKey: ["usuarios"],
    queryFn: async () => {
      const res = await apiRest.getUsuarios();
      return res;
    },
  });

  // Mutación para crear usuario
  const createMutation = useMutation(
    (usuario) => apiRest.createUsuario(usuario),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["usuarios"]);
        setNuevoNombre("");
      }
    }
  );

  const handleCrearUsuario = () => {
    if (!nuevoNombre.trim()) return;
    createMutation.mutate({ nombre: nuevoNombre });
  };

  if (isLoading) return <p>Cargando usuarios...</p>;
  if (error) return <p>Error al cargar usuarios</p>;
  */

  return (
    <div className="App">
      <header className="App-header">
        <Image
          src={logo}
          roundedCircle
          alt="Imagen redondeada"
          fluid
          style={{ maxWidth: '300px', maxHeight: '300px' }}
        />
        {/* 
        <p>Lista de Usuarios:</p>
        <ul>
          {usuarios.map(user => (
            <li key={user.id}>{user.nombre}</li>
          ))}
        </ul>

        <input
          type="text"
          placeholder="Nuevo nombre"
          value={nuevoNombre}
          onChange={e => setNuevoNombre(e.target.value)}
        />
        <button onClick={handleCrearUsuario} disabled={createMutation.isLoading}>
          {createMutation.isLoading ? "Creando..." : "Crear Usuario"}
        </button>
        */}
      </header>
    </div>
  );
}

export default App;
