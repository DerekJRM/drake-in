package com.example.be.service;

import com.example.be.model.Reserva;

public interface I_EmailService {
    void sendReservationConfirmation(Reserva reserva, String origenNombre, String destinoNombre, double tarifa);
}
