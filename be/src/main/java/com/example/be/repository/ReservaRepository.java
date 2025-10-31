package com.example.be.repository;

import com.example.be.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    List<Reserva> findByFecha(LocalDate fecha);

    List<Reserva> findByFechaAndHotelId(LocalDate fecha, Long hotelId);

    Optional<Reserva> findByCancellationToken(String token);
}
