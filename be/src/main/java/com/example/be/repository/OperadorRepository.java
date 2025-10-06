package com.example.be.repository;

import com.example.be.model.Operador;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OperadorRepository extends JpaRepository<Operador, Long> {
    List<Operador> findAllByTipo(String tipo);
}
