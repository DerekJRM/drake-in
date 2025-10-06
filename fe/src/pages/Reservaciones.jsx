import React from "react";
import ReservacionesBote from "../components/reservations/ReservacionesBote";
import ReservacionesHotel from "../components/reservations/ReservacionesHotel";
import { Container } from 'react-bootstrap';

const Reservaciones = () => {
  // TODO: Obtener el rol del usuario autenticado desde el contexto o estado global
  const userRole = "BOTE"; // Cambiar a "BOTE" para vista de operador
  // const userRole = "BOTE";

  return (
    <Container style={{ maxWidth: '1400px' }}>
      {userRole === "HOTEL" ? <ReservacionesHotel /> : <ReservacionesBote />}
    </Container>
  );
};

export default Reservaciones;