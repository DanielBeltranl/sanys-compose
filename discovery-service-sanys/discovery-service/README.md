# Discovery Service — Sanos y Salvos

Servidor de descubrimiento de servicios basado en **Netflix Eureka**. Actúa como registro central donde todos los microservicios del ecosistema *Sanos y Salvos* se registran y resuelven entre sí por nombre lógico en lugar de IP/puerto fijo.

---

## Tecnologías y dependencias

| Dependencia | Versión | Rol |
|---|---|---|
| Spring Boot | 4.0.6 | Framework base |
| Spring Cloud | 2025.1.1 | Gestión de dependencias cloud |
| `spring-cloud-starter-netflix-eureka-server` | (BOM) | Servidor de registro Eureka |
| `spring-boot-starter-security` | (BOM) | Autenticación HTTP Basic en el dashboard |
| `spring-boot-starter-actuator` | (BOM) | Endpoints de salud (`/actuator/health`) |
| Java | 17 | JDK mínimo requerido |
| Maven | 3.9.6 | Build tool |

---

## Arquetipo / Arquitectura

Este servicio **no sigue el patrón CSR (Controller → Service → Repository)** porque no contiene lógica de negocio ni acceso a datos. Es un servicio de infraestructura con la siguiente estructura mínima:

```
src/main/java/.../
├── DiscoveryServiceApplication.java   # Entry point + @EnableEurekaServer
└── config/
    └── SecurityConfig.java            # HTTP Basic Auth para el dashboard Eureka
```

### Rol en el ecosistema

```
                        ┌─────────────────────────┐
                        │     Discovery Service     │
                        │   (Eureka Server :8761)   │
                        └────────────┬────────────┘
                                     │ registro / lookup
          ┌──────────────────────────┼──────────────────────────┐
          │                          │                           │
    api-registro              api-gateway                  api-reporte
      (:8080)                   (:8081)                     (:8086)
                                     │
                     ┌───────────────┼───────────────┐
                     │               │               │
              bff-sanys       api-coincidencias  api-notificaciones
               (:8090)            (:8087)            (:8083)
```

Todos los microservicios se registran con `EUREKA_HOST=eureka-server` y consultan al servidor para resolver las URLs de sus dependencias dinámicamente.

---

## Configuración

El comportamiento se controla vía `application.yml` y variables de entorno:

| Variable | Valor por defecto | Descripción |
|---|---|---|
| `EUREKA_HOSTNAME` | `localhost` | Hostname que Eureka anuncia a los clientes |
| `spring.security.user.name` | `admin` | Usuario del dashboard |
| `spring.security.user.password` | `password123` | Contraseña del dashboard |

Puerto fijo: **8761**

---

## Ejecución

### Con Docker Compose (recomendado)

Este servicio forma parte del stack completo definido en `../docker-compose.yml`. Desde el directorio raíz del proyecto (`sanos-y-salvos/`):

```bash
# Levantar solo el discovery service
docker compose up eureka-server

# Levantar el stack completo
docker compose up --build
```

El servidor estará disponible en `http://localhost:8761`.  
El dashboard requiere autenticación: usuario `admin`, contraseña `password123`.

### Local (sin Docker)

Requiere Java 17 y Maven instalados:

```bash
./mvnw spring-boot:run
```

### Construcción manual de la imagen

```bash
docker build -t discovery-service .
docker run -p 8761:8761 -e EUREKA_HOSTNAME=localhost discovery-service
```

---

## Verificación

| Endpoint | Descripción |
|---|---|
| `http://localhost:8761` | Dashboard Eureka (requiere login) |
| `http://localhost:8761/actuator/health` | Estado de salud del servicio |
| `http://localhost:8761/eureka/apps` | Servicios registrados (JSON/XML) |

---

## Dockerfile

El build usa dos etapas para mantener la imagen final liviana:

1. **Build** — `maven:3.9.6-eclipse-temurin-17` compila y empaqueta el JAR.
2. **Runtime** — `eclipse-temurin:17-jre-jammy` solo con el JRE ejecuta el JAR.

La imagen expone el puerto `8761`.
