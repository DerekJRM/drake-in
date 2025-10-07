package com.example.be.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.be.model.Operador;

public interface OperadorRepository extends JpaRepository<Operador, Long> {
    List<Operador> findAllByTipo(String tipo);
    Optional<Operador> findByUsuarioId(Long usuarioId);
}
