package com.example.be.security;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import com.example.be.model.Operador;
import com.example.be.repository.OperadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.token.TokenService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.example.be.model.Usuario;
import com.example.be.repository.UsuarioRepository;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final OperadorRepository operadorRepository;

    public AuthController(AuthenticationManager authenticationManager,
                          UsuarioRepository usuarioRepository,
                          PasswordEncoder passwordEncoder,
                          JwtService jwtService, OperadorRepository operadorRepository) {
        this.authenticationManager = authenticationManager;
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.operadorRepository = operadorRepository;
    }

    @PostMapping("/register/{nombre}")
    public String register(@RequestBody Usuario usuario, @PathVariable("nombre") String nombre) {
        usuario.setContrasena(passwordEncoder.encode(usuario.getContrasena()));
        if (usuarioRepository.findByUsuario(usuario.getUsuario()).isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "El correo electrónico ya está en uso. Por favor, utiliza otro correo."
            );
        }
        List<Operador> operadores = operadorRepository.findAll();
        for (Operador op : operadores) {
            if (op.getCorreo().equalsIgnoreCase(usuario.getUsuario())) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "El correo electrónico ya está en uso. Por favor, utiliza otro correo."
                );
            }
        }
        usuarioRepository.save(usuario);
        
        // Agregar rol al token
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("rol", usuario.getRol());
        extraClaims.put("id", usuario.getId());

        operadorRepository.save(new Operador(null, nombre, usuario.getUsuario(),
                Objects.equals(usuario.getRol(), "OPERADOR") ? "BOTE" : usuario.getRol(), usuario.getId(), true, null));
        
        return jwtService.generateToken(extraClaims, usuario);
    }

    @PostMapping("/login")
    public String login(@RequestBody Usuario usuario) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(usuario.getUsername(), usuario.getPassword()));
        
        Usuario user = usuarioRepository.findByUsuario(usuario.getUsername())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        // Agregar rol al token
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("rol", user.getRol());
        extraClaims.put("id", user.getId());
        
        return jwtService.generateToken(extraClaims, user);
    }
}