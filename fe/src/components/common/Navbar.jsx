import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/constants";

const Navbar = () => {
  return (
    <nav>
      <div>
        <Link to={ROUTES.HOME}>DrakeIn</Link>
        <ul>
          <li>
            <Link to={ROUTES.HOME}>Inicio</Link>
          </li>
          <li>
            <Link to={ROUTES.RESERVATIONSHOTEL}>Ver Reservaciones</Link>
          </li>
          <li>
            <Link to={ROUTES.ROUTES}>Administrar Rutas</Link>
          </li>
          <li>
            <Link to={ROUTES.REGISTER}>Registrar Operador</Link>
          </li>
          <li>
            <Link to={ROUTES.LOGIN}>Iniciar Sesión</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
