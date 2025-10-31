package com.example.be.service;

import com.example.be.model.Reserva;

import java.time.LocalDate;
import java.time.LocalTime;

public interface I_EmailService {
    void sendReservationConfirmation(Reserva reserva, String origenNombre, String destinoNombre, double tarifa, LocalDate fechaRuta, LocalTime horarioRuta);
}
