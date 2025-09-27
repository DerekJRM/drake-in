package com.example.be.service;

import com.example.be.model.*;

import java.util.List;

public interface I_Service {

    // ================================= HORARIOS =================================

    public List<Horario> findAllHorarios();

    public Horario findHorarioById(Long id);

    public Horario saveHorario(Horario horario);

    public void deleteHorarioById(Long id);

    // ================================= OPERADORES =================================

    public List<Operador> findAllOperadores();

    public Operador findOperadorById(Long id);

    public Operador saveOperador(Operador operador);

    public void deleteOperadorById(Long id);

    // ================================= PASAJEROS =================================

    public List<Pasajero> findAllPasajeros();
    
    public List<Pasajero> findPasajerosByRutaId(Long rutaId);

    public Pasajero findPasajeroById(Long id);

    public Pasajero savePasajero(Pasajero pasajero);

    public void deletePasajeroById(Long id);

    // ================================= PUERTOS =================================

    public List<Puerto> findAllPuertos();

    public Puerto findPuertoById(Long id);

    public Puerto savePuerto(Puerto puerto);

    public void deletePuertoById(Long id);

    // ================================= RUTAS =================================

    public List<Ruta> findAllRutas();

    public Ruta findRutaById(Long id);

    public Ruta saveRuta(Ruta ruta);

    public void deleteRutaById(Long id);

    // ================================= USUARIO =================================

    public List<Usuario> findAllUsuarios();

    public Usuario findUsuarioById(Long id);

    public Usuario saveUsuario(Usuario usuario);

    public void deleteUsuarioById(Long id);

}
