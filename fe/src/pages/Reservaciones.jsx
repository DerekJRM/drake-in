import React from "react";
import ReservacionesBote from "../components/reservations/ReservacionesBoat";
import ReservacionesHotel from "../components/reservations/ReservacionesHotel";
import { Container } from 'react-bootstrap';

const Reservaciones = () => {
  
  const userRole = localStorage.getItem("operatorType");

  return (
    <Container style={{ maxWidth: '1400px' }}>
      {userRole === "HOTEL" ? <ReservacionesHotel /> : <ReservacionesBote />}
    </Container>
  );
};

export default Reservaciones;