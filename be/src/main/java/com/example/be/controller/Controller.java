package com.example.be.controller;

import com.example.be.model.*;
import com.example.be.service.I_Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/")
@CrossOrigin(origins = "http://localhost:3000")
public class Controller {

    @Autowired
    private I_Service service;

    // ================================= HORARIOS =================================

    @GetMapping("findAllHorarios")
    public ResponseEntity<?> findAllHorarios() {
        return ResponseEntity.ok(service.findAllHorarios());
    }

    @GetMapping("findHorarioById")
    public ResponseEntity<?> findHorarioById(@RequestParam Long id) {
        return ResponseEntity.ok(service.findHorarioById(id));
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @PostMapping("saveHorario")
    public ResponseEntity<?> saveHorario(@RequestBody Horario horario) {
        try {
            return ResponseEntity.ok(service.saveHorario(horario));
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @DeleteMapping("deleteHorarioById")
    public ResponseEntity<?> deleteHorarioById(@RequestParam Long id) {
        try {
            service.deleteHorarioById(id);
            return ResponseEntity.ok("Registro eliminado correctamente.");
        } catch (Exception e) {
            // Enviar solo el mensaje de error como string
            String mensaje = e.getMessage() != null ? e.getMessage() : "Error desconocido";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(mensaje);
        }
    }

    // ================================= OPERADORES =================================

    @GetMapping("findAllOperadores")
    public ResponseEntity<?> findAllOperadores() {
        return ResponseEntity.ok(service.findAllOperadores());
    }

    @GetMapping("findOperadorById")
    public ResponseEntity<?> findOperadorById(@RequestParam Long id) {
        return ResponseEntity.ok(service.findOperadorById(id));
    }

    @GetMapping("findOperadoresByTipo")
    public ResponseEntity<?> findOperadoresByTipo(@RequestParam String tipo) {
        return ResponseEntity.ok(service.findOperadoresByTipo(tipo));
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @PostMapping("saveOperador")
    public ResponseEntity<?> saveOperador(@RequestBody Operador operador) {
        try {
            return ResponseEntity.ok(service.saveOperador(operador));
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @DeleteMapping("deleteOperadorById")
    public ResponseEntity<?> deleteOperadorById(@RequestParam Long id) {
        try {
            service.deleteOperadorById(id);
            return ResponseEntity.ok("Registro eliminado correctamente.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    // ================================= RESERVAS =================================

    @GetMapping("findAllReservas")
    public ResponseEntity<?> findAllReservas() {
        return ResponseEntity.ok(service.findAllReservas());
    }

    @GetMapping("findReservasByRutaId")
    public ResponseEntity<?> findReservasByRutaId(@RequestParam Long rutaId) {
        return ResponseEntity.ok(service.findReservasByRutaId(rutaId));
    }

    @GetMapping("findReservaById")
    public ResponseEntity<?> findReservaById(@RequestParam Long id) {
        return ResponseEntity.ok(service.findReservaById(id));
    }

//    @PreAuthorize("hasAnyRole('ADMIN')")
    @PostMapping("saveReserva")
    public ResponseEntity<?> saveReserva(@RequestBody Reserva reserva) {
        try {
            return ResponseEntity.ok(service.saveReserva(reserva));
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @DeleteMapping("deleteReservaById")
    public ResponseEntity<?> deleteReservaById(@RequestParam Long id) {
        try {
            service.deleteReservaById(id);
            return ResponseEntity.ok("Registro eliminado correctamente.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    // ================================= PUERTOS =================================

    @GetMapping("findAllPuertos")
    public ResponseEntity<?> findAllPuertos() {
        return ResponseEntity.ok(service.findAllPuertos());
    }

    @GetMapping("findPuertoById")
    public ResponseEntity<?> findPuertoById(@RequestParam Long id) {
        return ResponseEntity.ok(service.findPuertoById(id));
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @PostMapping("savePuerto")
    public ResponseEntity<?> savePuerto(@RequestBody Puerto puerto) {
        try {
            return ResponseEntity.ok(service.savePuerto(puerto));
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @DeleteMapping("deletePuertoById")
    public ResponseEntity<?> deletePuertoById(@RequestParam Long id) {
        try {
            service.deletePuertoById(id);
            return ResponseEntity.ok("Registro eliminado correctamente.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    // ================================= RUTAS =================================

    @GetMapping("findAllRutas")
    public ResponseEntity<?> findAllRutas() {
        return ResponseEntity.ok(service.findAllRutas());
    }

    @GetMapping("findRutaById")
    public ResponseEntity<?> findRutaById(@RequestParam Long id) {
        return ResponseEntity.ok(service.findRutaById(id));
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @PostMapping("saveRuta")
    public ResponseEntity<?> saveRuta(@RequestBody Ruta ruta) {
        try {
            return ResponseEntity.ok(service.saveRuta(ruta));
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @DeleteMapping("deleteRutaById")
    public ResponseEntity<?> deleteRutaById(@RequestParam Long id) {
        try {
            service.deleteRutaById(id);
            return ResponseEntity.ok("Registro eliminado correctamente.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    // ================================= USUARIO =================================

    @GetMapping("findAllUsuarios")
    public ResponseEntity<?> findAllUsuarios() {
        return ResponseEntity.ok(service.findAllUsuarios());
    }

    @GetMapping("findUsuarioById")
    public ResponseEntity<?> findUsuarioById(@RequestParam Long id) {
        return ResponseEntity.ok(service.findUsuarioById(id));
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @PostMapping("saveUsuario")
    public ResponseEntity<?> saveUsuario(@RequestBody Usuario usuario) {
        try {
            return ResponseEntity.ok(service.saveUsuario(usuario));
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @DeleteMapping("deleteUsuarioById")
    public ResponseEntity<?> deleteUsuarioById(@RequestParam Long id) {
        try {
            service.deleteUsuarioById(id);
            return ResponseEntity.ok("Registro eliminado correctamente.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
