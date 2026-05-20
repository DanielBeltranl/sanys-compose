# API Gateway — Sanos y Salvos

Punto de entrada único del sistema **Sanos y Salvos**. Valida tokens JWT emitidos por Supabase y enruta las peticiones hacia el BFF correspondiente mediante service discovery (Eureka).

---

## Tecnologías

| Tecnología | Versión | Rol |
|---|---|---|
| Java | 21 | Lenguaje base |
| Spring Boot | 4.0.6 | Framework principal |
| Spring Cloud | 2025.1.1 | Ecosistema de microservicios |
| Spring Cloud Gateway (WebMVC) | 2025.1.1 | Motor de enrutamiento (MVC, no reactivo) |
| Spring Security | (Boot-managed) | Cadena de filtros de seguridad |
| OAuth2 Resource Server | (Boot-managed) | Validación de JWT |
| Netflix Eureka Client | (Cloud-managed) | Registro y descubrimiento de servicios |
| Spring Boot Actuator | (Boot-managed) | Endpoints de salud y métricas |
| Supabase | externo | Proveedor de autenticación (emite los JWT, algoritmo ES256) |
| Maven Wrapper | (incluido) | Build y gestión de dependencias |

---

## Arquitectura

```
Cliente (frontend)
        │
        ▼
┌──────────────────────────────────┐
│         API Gateway              │  ← este servicio (puerto 8081)
│                                  │
│  SecurityFilterChain             │  valida JWT de Supabase
│    ├─ publicChain (sin token)    │  /api/registro, /api/login, /api/notifications
│    └─ securedChain (con token)   │  todo lo demás → requiere rol válido
│                                  │
│  GatewayConfig (RouterFunctions) │  enruta por path → lb://bff-sanys
└──────────────┬───────────────────┘
               │ Eureka (service discovery)
               ▼
        ┌─────────────┐
        │  BFF-SAnyS  │  (Backend For Frontend)
        └─────────────┘
               │
        ┌──────┴──────┐
        ▼             ▼
  Microservicio A   Microservicio B ...
```

### Patrón arquitectónico

Este servicio es un **API Gateway stateless** basado en configuración. No sigue el patrón CSR (Controller–Service–Repository) porque no persiste datos ni tiene lógica de negocio propia. Su estructura interna se organiza en tres piezas de configuración:

| Clase | Responsabilidad |
|---|---|
| `SecurityConfig` | Define dos `SecurityFilterChain`: rutas públicas y rutas protegidas |
| `SupabaseJwtConverter` | Extrae el rol desde `user_metadata.role` del JWT y lo convierte en `GrantedAuthority` |
| `GatewayConfig` | Declara las `RouterFunction` que mapean paths a servicios downstream vía load balancer |

### Roles válidos

El gateway acepta únicamente tokens cuyo claim `user_metadata.role` contenga uno de:

- `ADMIN`
- `PERSONA`
- `INSTITUCION`

### Rutas configuradas

| Path | Método | Autenticación | Destino |
|---|---|---|---|
| `/api/registro` | POST | Pública | `bff-sanys` |
| `/api/login/**` | any | Pública | `bff-sanys` |
| `/api/notifications/**` | any | Pública | `bff-sanys` |
| `/reportes/**` | any | Token requerido | `bff-sanys` |
| `/**` | any | Token requerido | `bff-sanys` |

---

## Dependencias (pom.xml)

```xml
<!-- Gateway MVC (no reactivo) -->
spring-cloud-starter-gateway-server-webmvc

<!-- Service discovery -->
spring-cloud-starter-netflix-eureka-client

<!-- Seguridad y validación JWT -->
spring-boot-starter-security
spring-boot-starter-security-oauth2-resource-server

<!-- Observabilidad -->
spring-boot-starter-actuator
```

---

## Variables de entorno

| Variable | Default | Descripción |
|---|---|---|
| `EUREKA_HOST` | `localhost` | Host del Discovery Service |
| `SUPABASE_JWK_URI` | *(configurado en application.yml)* | URL del JWKS de Supabase para validar firmas ES256 |

---

## Ejecución

### Con Docker Compose (recomendado)

Este servicio forma parte de un stack completo. Lo normal es levantarlo todo con:

```bash
docker compose up
```

El compose se encarga de levantar los servicios en el orden correcto.

---

### Sin Docker Compose (modo standalone)

Si querés levantar solo este servicio, **como mínimo necesitás que el Discovery Service esté corriendo primero**, ya que el gateway se registra en Eureka al arrancar y resuelve los servicios downstream por nombre.

**Paso 1 — Levantar el Discovery Service:**
```bash
# En el repo del discovery service
./mvnw spring-boot:run
```
Por defecto corre en `http://localhost:8761`.

**Paso 2 — Levantar el API Gateway:**
```bash
./mvnw spring-boot:run
```
Queda disponible en `http://localhost:8081`.

---

### Comandos útiles

```bash
# Compilar
./mvnw clean package

# Correr
./mvnw spring-boot:run

# Correr tests
./mvnw test

# Correr una clase de test específica
./mvnw test -Dtest=ApiGateawaySys2ApplicationTests

# Construir imagen Docker (OCI)
./mvnw spring-boot:build-image
```

---

## Endpoints de salud

```
GET http://localhost:8081/actuator/health
GET http://localhost:8081/actuator/info
GET http://localhost:8081/actuator/gateway
```
