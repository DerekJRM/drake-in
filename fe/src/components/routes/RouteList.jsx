import React from "react";
import RouteItem from "./RouteItem";
import { Loading } from "../common";

/**
 * Lista de rutas disponibles
 * @param {Array} routes - Array de rutas
 * @param {function} onEdit - Función para editar una ruta
 * @param {function} onDelete - Función para eliminar una ruta
 * @param {boolean} loading - Estado de carga
 */
const RouteList = ({ routes = [], onEdit, onDelete, loading = false }) => {
  if (loading) {
    return <Loading />;
  }

  if (routes.length === 0) {
    return (
      <div>
        <p>No hay rutas disponibles. Agrega una nueva ruta para comenzar.</p>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h5>Rutas Disponibles</h5>
      </div>
      <div>
        {routes.map((route) => (
          <RouteItem
            key={route.id}
            route={route}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default RouteList;
