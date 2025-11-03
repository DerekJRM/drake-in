package com.example.be.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID; // Para Email

import org.springframework.beans.factory.annotation.Autowired;

import com.example.be.model.Horario;
import com.example.be.model.Operador;
import com.example.be.model.Puerto;
import com.example.be.model.Reserva;
import com.example.be.model.Usuario;
import com.example.be.repository.HorarioRepository;
import com.example.be.repository.OperadorRepository;
import com.example.be.repository.PuertoRepository;
import com.example.be.repository.ReservaRepository;
import com.example.be.repository.UsuarioRepository;
import org.springframework.data.mapping.TargetAwareIdentifierAccessor;

@org.springframework.stereotype.Service
public class Service implements I_Service {

    @Autowired
    private HorarioRepository horarioRepository;

    @Autowired
    private OperadorRepository operadorRepository;

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private PuertoRepository puertoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private I_EmailService emailService;

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
    public List<Operador> findOperadoresByTipo(String tipo) {
        return operadorRepository.findAllByTipo(tipo);
    }

    @Override
    public Operador findOperadorById(Long id) {
        return operadorRepository.findById(id).orElse(null);
    }

    @Override
    public String findTipoOperadorByUsuarioId(Long id){
        return operadorRepository.findByUsuarioId(id)
                .map(Operador::getTipo)
                .orElse(null);
    }

    @Override
    public Operador findOperadorByUsuarioId(Long id){
        return operadorRepository.findByUsuarioId(id).get();
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
                
                // Si no existe el operador, lanzar error claro
                if (operadorFrontend == null) {
                    throw new Exception("No se encontró el operador con ID: " + operador.getId() + 
                                      ". Para crear un nuevo operador, envía 'newItem': true y omite el 'id'.");
                }
                
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

    // ================================= RESERVAS =================================

    @Override
    public List<Reserva> findAllReservas() {
        return reservaRepository.findAll();
    }


    @Override
    public Reserva findReservaById(Long id) {
        return reservaRepository.findById(id).orElse(null);
    }

    @Override
    public Reserva saveReserva(Reserva reserva) {
        try {
            System.out.println("Servicio - saveReserva llamado con reserva: " + reserva);
            if (reserva.isNewItem()) {
                // 1. Generar un token único de cancelación
                reserva.setCancellationToken(UUID.randomUUID().toString());

                // 2. Guardar la reserva en la BD
                Reserva savedReserva = this.reservaRepository.saveAndFlush(reserva);

                // 3. Enviar el correo de confirmación (esto se ejecutará en segundo plano)
                String origenNombre = "--", destinoNombre = "--";
                double tarifa = 0.0;
                LocalDate fechaRuta = null;
                LocalTime horaRuta = null;

                try{origenNombre = findPuertoById(savedReserva.getOrigenId()).getNombre();} catch (Exception e) {   }
                try{destinoNombre = findPuertoById(savedReserva.getDestinoId()).getNombre();} catch (Exception e) {   }

                // TODO Lógica para saber la tarifa
                try{tarifa = findPuertoById(savedReserva.getDestinoId()).getTarifa().doubleValue();} catch (Exception e) {   }

                try{fechaRuta = savedReserva.getFecha();} catch (Exception e) {   }
                try{horaRuta = findHorarioById(savedReserva.getHorarioId()).getHora();} catch (Exception e) {   }


                emailService.sendReservationConfirmation(savedReserva, origenNombre, destinoNombre, tarifa, fechaRuta, horaRuta);

                return savedReserva;
            } else {
                if (reserva.getUpdateableFields() != null && reserva.getUpdateableFields().isEmpty()) {
                    throw new Exception("No se han realizado cambios en el registro.");
                }

                Reserva reservaFrontend = this.findReservaById(reserva.getId());
                reservaFrontend.applyUpdateableFields(reserva);

                this.reservaRepository.saveAndFlush(reservaFrontend);

                return reservaFrontend;
            }
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public void deleteReservaById(Long id) {
        try {
            reservaRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public void cancelReservaByToken(String token) throws Exception {
        // Buscar la reserva por el token
        Reserva reserva = reservaRepository.findByCancellationToken(token)
                .orElseThrow(() -> new Exception("Token de cancelación inválido o la reserva ya fue cancelada."));

        // Si se encuentra, borrarla
        reservaRepository.delete(reserva);
    }

    @Override
    public List<Reserva> findReservasByFecha(LocalDate fecha) {
        // Simplemente llamamos al nuevo método del repositorio
        return reservaRepository.findByFecha(fecha);
    }

    @Override
    public List<Reserva> findReservasByFechaAndHotel(LocalDate fecha, Long hotelId) {
        return reservaRepository.findByFechaAndHotelId(fecha, hotelId);
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
