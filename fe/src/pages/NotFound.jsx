import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../utils/constants";

const NotFound = () => {
  return (
    <div>
      <div>
        <h1>404</h1>
        <h2>Página no encontrada</h2>
        <p>Lo sentimos, la página que estás buscando no existe.</p>
        <Link to={ROUTES.HOME}>Volver al inicio</Link>
      </div>
    </div>
  );
};

export default NotFound;
