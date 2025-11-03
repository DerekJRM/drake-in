package com.example.be.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.be.model.Horario;
import com.example.be.model.Operador;
import com.example.be.model.Puerto;
import com.example.be.model.Reserva;
import com.example.be.model.Usuario;
import com.example.be.service.I_Service;

import java.util.Map;

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

    @GetMapping("findTipoOperadorByUsuarioId")
    public ResponseEntity<?> findTipoOperadorByUsuarioId(@RequestParam Long id){
        return ResponseEntity.ok(service.findTipoOperadorByUsuarioId(id));
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

    // === NUEVO ENDPOINT PARA AUTHCONTEXT ===

    @GetMapping("findOperadorByUsuarioId")
    public ResponseEntity<?> findOperadorByUsuarioId(@RequestParam Long id){
        Operador operador = service.findOperadorByUsuarioId(id);
        if (operador == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontró un operador para el usuario ID: " + id);
        }
        return ResponseEntity.ok(operador);
    }

    // ================================= RESERVAS =================================

    @GetMapping("findAllReservas")
    public ResponseEntity<?> findAllReservas() {
        return ResponseEntity.ok(service.findAllReservas());
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

    // === NUEVO ENDPOINT PÚBLICO ===
    @GetMapping("/public/cancelReserva")
    public ResponseEntity<String> cancelReservaByToken(@RequestParam String token) {
        try {
            service.cancelReservaByToken(token);
            // Devolvemos un HTML simple para que el usuario vea una confirmación
            String successHtml = String.format("""
                    <html><body style='font-family: sans-serif; text-align: center;'>
                    <h1>Reserva Cancelada</h1>
                    <p>Tu reserva ha sido cancelada exitosamente.</p>
                    </body></html>
                    """);
            return ResponseEntity.ok(successHtml);
        } catch (Exception e) {
            String errorHtml = String.format("""
                    <html><body style='font-family: sans-serif; text-align: center;'>
                    <h1>Error</h1>
                    <p>%s</p>
                    </body></html>
                    """,
                    e.getMessage()
                    );
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorHtml);
        }
    }


    @GetMapping("findReservasByFecha")
    public ResponseEntity<?> findReservasByFecha(
            // Esta anotación es clave para convertir el string "YYYY-MM-DD" a un objeto LocalDate
            @RequestParam @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE) java.time.LocalDate fecha
    ) {
        try {
            return ResponseEntity.ok(service.findReservasByFecha(fecha));
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("findReservasByFechaAndHotel")
    public ResponseEntity<?> findReservasByFechaAndHotel(
            @RequestParam @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE) java.time.LocalDate fecha,
            @RequestParam Long hotelId
    ) {
        try {
            return ResponseEntity.ok(service.findReservasByFechaAndHotel(fecha, hotelId));
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
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
