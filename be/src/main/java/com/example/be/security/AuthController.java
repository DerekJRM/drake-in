package com.example.be.security;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.be.model.Usuario;
import com.example.be.repository.UsuarioRepository;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthController(AuthenticationManager authenticationManager,
                          UsuarioRepository usuarioRepository,
                          PasswordEncoder passwordEncoder,
                          JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public String register(@RequestBody Usuario usuario) {
        usuario.setContrasena(passwordEncoder.encode(usuario.getContrasena()));
        usuarioRepository.save(usuario);
        
        // Agregar rol al token
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("rol", usuario.getRol());
        extraClaims.put("id", usuario.getId());
        
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