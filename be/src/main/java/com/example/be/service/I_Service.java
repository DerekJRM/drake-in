package com.example.be.service;

import java.time.LocalDate;
import java.util.List;

import com.example.be.model.Horario;
import com.example.be.model.Operador;
import com.example.be.model.Puerto;
import com.example.be.model.Reserva;
import com.example.be.model.Usuario;

public interface I_Service {

    // ================================= HORARIOS =================================

    public List<Horario> findAllHorarios();

    public Horario findHorarioById(Long id);

    public Horario saveHorario(Horario horario);

    public void deleteHorarioById(Long id);

    // ================================= OPERADORES =================================

    public List<Operador> findAllOperadores();

    public List<Operador> findOperadoresByTipo(String tipo);

    public Operador findOperadorById(Long id);

    public String findTipoOperadorByUsuarioId(Long id);

    public Operador saveOperador(Operador operador);

    public void deleteOperadorById(Long id);

    // ================================= RESERVAS =================================

    public List<Reserva> findAllReservas();
    
//    public List<Reserva> findReservasByRutaId(Long rutaId);

    public Reserva findReservaById(Long id);

    public Reserva saveReserva(Reserva reserva);

    public void deleteReservaById(Long id);

    void cancelReservaByToken(String token) throws Exception;

    List<Reserva> findReservasByFecha(LocalDate fecha);

    // ================================= PUERTOS =================================

    public List<Puerto> findAllPuertos();

    public Puerto findPuertoById(Long id);

    public Puerto savePuerto(Puerto puerto);

    public void deletePuertoById(Long id);


    // ================================= USUARIO =================================

    public List<Usuario> findAllUsuarios();

    public Usuario findUsuarioById(Long id);

    public Usuario saveUsuario(Usuario usuario);

    public void deleteUsuarioById(Long id);

}
