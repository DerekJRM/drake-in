package com.example.be.service;

import com.example.be.model.*;
import com.example.be.repository.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@org.springframework.stereotype.Service
public class Service implements I_Service {

    @Autowired
    private HorarioRepository horarioRepository;

    @Autowired
    private OperadorRepository operadorRepository;

    @Autowired
    private PasajeroRepository pasajeroRepository;

    @Autowired
    private PuertoRepository puertoRepository;

    @Autowired
    private RutaRepository rutaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    // ================================= HORARIOS =================================

    @Override
    public List<Horario> findAllHorarios() {
        return horarioRepository.findAll();
    }

    @Override
    public Horario findHorarioById(Long id) {
        return horarioRepository.findById(id).orElse(null);
    }

    @Override
    public Horario saveHorario(Horario horario) {
        try {
            if (horario.isNewItem()) {
                return this.horarioRepository.saveAndFlush(horario);
            } else {
                if (horario.getUpdateableFields() != null && horario.getUpdateableFields().isEmpty()) {
                    throw new Exception("No se han realizado cambios en el registro.");
                }

                Horario horarioFrontend = this.findHorarioById(horario.getId());
                horarioFrontend.applyUpdateableFields(horario);

                this.horarioRepository.saveAndFlush(horarioFrontend);

                return horarioFrontend;
            }
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public void deleteHorarioById(Long id) {
        try {
            horarioRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    // ================================= OPERADORES =================================

    @Override
    public List<Operador> findAllOperadores() {
        return operadorRepository.findAll();
    }

    @Override
    public Operador findOperadorById(Long id) {
        return operadorRepository.findById(id).orElse(null);
    }

    @Override
    public Operador saveOperador(Operador operador) {
        try {
            if (operador.isNewItem()) {
                return this.operadorRepository.saveAndFlush(operador);
            } else {
                if (operador.getUpdateableFields() != null && operador.getUpdateableFields().isEmpty()) {
                    throw new Exception("No se han realizado cambios en el registro.");
                }

                Operador operadorFrontend = this.findOperadorById(operador.getId());
                operadorFrontend.applyUpdateableFields(operador);

                this.operadorRepository.saveAndFlush(operadorFrontend);

                return operadorFrontend;
            }
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public void deleteOperadorById(Long id) {
        try{
            operadorRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    // ================================= PASAJEROS =================================

    @Override
    public List<Pasajero> findAllPasajeros() {
        return pasajeroRepository.findAll();
    }

    @Override
    public List<Pasajero> findPasajerosByRutaId(Long rutaId) {
        return pasajeroRepository.findByRutaId(rutaId);
    }

    @Override
    public Pasajero findPasajeroById(Long id) {
        return pasajeroRepository.findById(id).orElse(null);
    }

    @Override
    public Pasajero savePasajero(Pasajero pasajero) {
        try {
            if (pasajero.isNewItem()) {
                return this.pasajeroRepository.saveAndFlush(pasajero);
            } else {
                if (pasajero.getUpdateableFields() != null && pasajero.getUpdateableFields().isEmpty()) {
                    throw new Exception("No se han realizado cambios en el registro.");
                }

                Pasajero pasajeroFrontend = this.findPasajeroById(pasajero.getId());
                pasajeroFrontend.applyUpdateableFields(pasajero);

                this.pasajeroRepository.saveAndFlush(pasajeroFrontend);

                return pasajeroFrontend;
            }
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public void deletePasajeroById(Long id) {
        try {
            pasajeroRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    // ================================= PUERTOS =================================

    @Override
    public List<Puerto> findAllPuertos() {
        return puertoRepository.findAll();
    }

    @Override
    public Puerto findPuertoById(Long id) {
        return puertoRepository.findById(id).orElse(null);
    }

    @Override
    public Puerto savePuerto(Puerto puerto) {
        try {
            if (puerto.isNewItem()) {
                return this.puertoRepository.saveAndFlush(puerto);
            } else {
                if (puerto.getUpdateableFields() != null && puerto.getUpdateableFields().isEmpty()) {
                    throw new Exception("No se han realizado cambios en el registro.");
                }

                Puerto puertoFrontend = this.findPuertoById(puerto.getId());
                puertoFrontend.applyUpdateableFields(puerto);

                this.puertoRepository.saveAndFlush(puertoFrontend);

                return puertoFrontend;
            }
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public void deletePuertoById(Long id) {
        try {
            puertoRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    // ================================= RUTAS =================================

    @Override
    public List<Ruta> findAllRutas() {
        return rutaRepository.findAll();
    }

    @Override
    public Ruta findRutaById(Long id) {
        return rutaRepository.findById(id).orElse(null);
    }

    @Override
    public Ruta saveRuta(Ruta ruta) {
        try {
            if (ruta.isNewItem()) {
                return this.rutaRepository.saveAndFlush(ruta);
            } else {
                if (ruta.getUpdateableFields() != null && ruta.getUpdateableFields().isEmpty()) {
                    throw new Exception("No se han realizado cambios en el registro.");
                }

                Ruta rutaFrontend = this.findRutaById(ruta.getId());
                rutaFrontend.applyUpdateableFields(ruta);

                this.rutaRepository.saveAndFlush(rutaFrontend);

                return rutaFrontend;
            }
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public void deleteRutaById(Long id) {
        try {
            rutaRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    // ================================= USUARIO =================================

    @Override
    public List<Usuario> findAllUsuarios() {
        return usuarioRepository.findAll();
    }

    @Override
    public Usuario findUsuarioById(Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    @Override
    public Usuario saveUsuario(Usuario usuario) {
        try {
            if (usuario.isNewItem()) {
                return this.usuarioRepository.saveAndFlush(usuario);
            } else {
                if (usuario.getUpdateableFields() != null && usuario.getUpdateableFields().isEmpty()) {
                    throw new Exception("No se han realizado cambios en el registro.");
                }

                Usuario usuarioFrontend = this.findUsuarioById(usuario.getId());
                usuarioFrontend.applyUpdateableFields(usuario);

                this.usuarioRepository.saveAndFlush(usuarioFrontend);

                return usuarioFrontend;
            }
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public void deleteUsuarioById(Long id) {
        try {
            usuarioRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }
}
