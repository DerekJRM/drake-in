# 🔐 Guía de Seguridad: Protección de Rutas

## 📋 Resumen Ejecutivo

### ✅ Estado Actual: Frontend Protection (UX)

Tu `ProtectedRoute.jsx` maneja la **primera capa** de protección:

- Verifica sesión de Supabase en el cliente
- Redirige a login si no hay sesión
- Mejora la experiencia de usuario

**Esto está BIEN para UX, pero NO es suficiente para seguridad real.**

### 🎯 Estrategia: Defense in Depth (Defensa en Profundidad)

```
Frontend (UX) + Backend (Security) = Protección Completa
```

---

## 🏗️ Arquitectura de Dos Capas

### 1️⃣ CAPA 1: Frontend (Ya implementada) ✅

**Archivo**: `src/components/auth/ProtectedRoute.jsx`

```jsx
// Acceso a Supabase desde frontend: ✅ OK para UX
import { supabase } from "../../supabase/client.js";

export default function ProtectedRoute({ children }) {
  // Verifica sesión localmente
  supabase.auth.getSession();

  // Si no hay sesión -> redirige a /login
  if (!session) return <Navigate to="/login" />;

  return children;
}
```

**Propósito**:

- ✅ Mejorar UX (feedback inmediato)
- ✅ Evitar renders innecesarios
- ✅ Reducir llamadas al backend

**Limitaciones**:

- ❌ Se puede manipular desde DevTools
- ❌ No protege datos sensibles
- ❌ No valida permisos reales

---

### 2️⃣ CAPA 2: Backend (DEBE implementarse) 🔒

**Ubicación**: `drake-in/be/src/main/java/com/drakein/security/`

#### A. Configurar Verificación de JWT

```java
// SecurityConfig.java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .authorizeHttpRequests(auth -> auth
                // Rutas públicas
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/public/**").permitAll()

                // Rutas protegidas
                .requestMatchers("/api/reservations/**").authenticated()
                .requestMatchers("/api/routes/**").authenticated()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")

                .anyRequest().authenticated()
            )
            .addFilterBefore(
                jwtAuthenticationFilter(),
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }
}
```

#### B. Filtro de Autenticación JWT

```java
// JwtAuthenticationFilter.java
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private SupabaseJwtValidator jwtValidator;

    @Override
    protected void doFilterInternal(
        HttpServletRequest request,
        HttpServletResponse response,
        FilterChain filterChain
    ) throws ServletException, IOException {

        // 1. Extraer token del header
        String token = extractToken(request);

        if (token == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("No token provided");
            return;
        }

        try {
            // 2. Validar token con Supabase
            User user = jwtValidator.validateToken(token);

            // 3. Establecer contexto de seguridad
            Authentication auth = new UsernamePasswordAuthenticationToken(
                user, null, user.getAuthorities()
            );
            SecurityContextHolder.getContext().setAuthentication(auth);

            // 4. Continuar con la petición
            filterChain.doFilter(request, response);

        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Invalid token: " + e.getMessage());
        }
    }

    private String extractToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
```

#### C. Validador de JWT de Supabase

```java
// SupabaseJwtValidator.java
@Service
public class SupabaseJwtValidator {

    @Value("${supabase.jwt.secret}")
    private String jwtSecret;

    @Value("${supabase.url}")
    private String supabaseUrl;

    public User validateToken(String token) throws Exception {
        try {
            // Validar firma del JWT
            Algorithm algorithm = Algorithm.HMAC256(jwtSecret);
            JWTVerifier verifier = JWT.require(algorithm)
                .withIssuer(supabaseUrl + "/auth/v1")
                .build();

            DecodedJWT jwt = verifier.verify(token);

            // Extraer información del usuario
            String userId = jwt.getSubject();
            String email = jwt.getClaim("email").asString();
            String role = jwt.getClaim("role").asString();

            // Crear objeto User
            return new User(userId, email, role);

        } catch (JWTVerificationException e) {
            throw new Exception("Token inválido", e);
        }
    }
}
```

#### D. Configuración (application.properties)

```properties
# Supabase Configuration
supabase.url=https://YOUR_PROJECT.supabase.co
supabase.jwt.secret=YOUR_JWT_SECRET
supabase.anon.key=YOUR_ANON_KEY
```

---

## 🔄 Flujo Completo de Autenticación

### 1. Usuario hace Login

```
Frontend                Backend              Supabase
   │                       │                     │
   │  POST /login          │                     │
   ├──────────────────────>│                     │
   │                       │  Verificar credenc. │
   │                       ├────────────────────>│
   │                       │                     │
   │                       │  JWT Token          │
   │                       │<────────────────────┤
   │  JWT Token            │                     │
   │<──────────────────────┤                     │
   │                       │                     │
   │ Guardar en            │                     │
   │ localStorage          │                     │
   │                       │                     │
```

### 2. Usuario accede a ruta protegida

```
Frontend                Backend              Supabase
   │                       │                     │
   │ ProtectedRoute        │                     │
   │ verifica sesión       │                     │
   ├─────────┐             │                     │
   │         │             │                     │
   │<────────┘             │                     │
   │ ✓ Hay sesión          │                     │
   │                       │                     │
   │ GET /api/reservations │                     │
   │ Header: Bearer TOKEN  │                     │
   ├──────────────────────>│                     │
   │                       │                     │
   │                       │ JwtAuthFilter       │
   │                       │ valida token        │
   │                       ├─────────┐           │
   │                       │         │           │
   │                       │<────────┘           │
   │                       │ ✓ Token válido      │
   │                       │                     │
   │                       │ Procesar request    │
   │                       ├─────────┐           │
   │                       │         │           │
   │                       │<────────┘           │
   │  Datos                │                     │
   │<──────────────────────┤                     │
   │                       │                     │
```

### 3. Token inválido o expirado

```
Frontend                Backend
   │                       │
   │ GET /api/reservations │
   │ Header: Bearer INVALID│
   ├──────────────────────>│
   │                       │
   │                       │ JwtAuthFilter
   │                       │ valida token
   │                       ├─────────┐
   │                       │         │
   │                       │<────────┘
   │                       │ ✗ Token inválido
   │                       │
   │  401 Unauthorized     │
   │<──────────────────────┤
   │                       │
   │ Redirigir a /login    │
   │                       │
```

---

## 📦 Frontend: Envío de Token en Requests

### Configuración de Axios (api.js)

```javascript
// src/services/api.js
import axios from "axios";
import { supabase } from "../supabase/client";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080/api",
});

// Interceptor para agregar token a todas las peticiones
api.interceptors.request.use(
  async (config) => {
    // Obtener sesión actual de Supabase
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.access_token) {
      // Agregar token al header
      config.headers.Authorization = `Bearer ${session.access_token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token inválido o expirado
      await supabase.auth.signOut();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
```

### Uso en servicios

```javascript
// src/services/reservationService.js
import api from "./api";

export const createReservation = async (reservationData) => {
  // El interceptor automáticamente agrega el token
  const response = await api.post("/reservations", reservationData);
  return response.data;
};

export const getReservations = async () => {
  const response = await api.get("/reservations");
  return response.data;
};
```

---

## ⚖️ Comparación: Frontend vs Backend

| Aspecto                | Frontend (Supabase) | Backend (Validación JWT) |
| ---------------------- | ------------------- | ------------------------ |
| **Propósito**          | UX y navegación     | Seguridad real           |
| **Se puede manipular** | ✅ Sí               | ❌ No                    |
| **Protege datos**      | ❌ No               | ✅ Sí                    |
| **Velocidad**          | ⚡ Muy rápida       | 🐢 Más lenta (red)       |
| **Validación real**    | ❌ No               | ✅ Sí                    |
| **Necesario**          | ✅ Sí (UX)          | ✅ Sí (Seguridad)        |

---

## 🎯 Recomendación Final

### ✅ LO QUE DEBES HACER:

1. **Mantener** `ProtectedRoute` en frontend (UX) ✅

   - Acceso a Supabase: **OK**
   - Verificación local de sesión: **OK**

2. **Implementar** validación JWT en backend (Seguridad) 🔒

   - Crear `SecurityConfig.java`
   - Crear `JwtAuthenticationFilter.java`
   - Crear `SupabaseJwtValidator.java`

3. **Configurar** Axios para enviar tokens
   - Interceptor que agrega `Authorization: Bearer TOKEN`
   - Interceptor que maneja errores 401

### ❌ LO QUE NO DEBES HACER:

- ❌ Confiar solo en protección frontend
- ❌ Hacer peticiones sin validar token en backend
- ❌ Asumir que ProtectedRoute es suficiente

---

## 🔐 Niveles de Seguridad

### Nivel 1: Solo Frontend (Tu caso actual)

```
Seguridad: ⭐☆☆☆☆
UX: ⭐⭐⭐⭐⭐
```

✅ Bueno para UX
❌ Inseguro para datos

### Nivel 2: Frontend + Backend (Recomendado)

```
Seguridad: ⭐⭐⭐⭐⭐
UX: ⭐⭐⭐⭐⭐
```

✅ Seguridad completa
✅ Excelente UX

---

## 📚 Recursos Adicionales

### Dependencias Maven (pom.xml)

```xml
<!-- JWT -->
<dependency>
    <groupId>com.auth0</groupId>
    <artifactId>java-jwt</artifactId>
    <version>4.4.0</version>
</dependency>

<!-- Spring Security -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

---

## 🎓 Conclusión

**RESPUESTA CORTA**:

- Frontend (Supabase): ✅ **SÍ** - Para UX
- Backend (JWT): ✅ **SÍ** - Para Seguridad Real

**Usa AMBOS para tener protección completa.**

---

**Última actualización**: Octubre 4, 2025
