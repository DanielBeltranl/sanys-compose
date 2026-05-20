# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Build (skipping tests)
./mvnw clean package -DskipTests

# Run tests
./mvnw test

# Run a single test class
./mvnw test -Dtest=CoincidenciasApplicationTests

# Run locally (requires PostgreSQL and RabbitMQ running)
./mvnw spring-boot:run

# Build Docker image
docker build -t ms-coincidencias .
```

## Architecture

MS-Coincidencias is a Spring Boot 4.0.6 microservice (Java 21) within the "Sanos y Salvos" platform — a pet recovery system. Its sole responsibility is detecting matches between lost (`PERDIDO`) and found (`VISTO`) pet reports, then publishing notifications.

### Message-Driven Flow

```
MS-Reportes → [reporte.creado.queue] → ReporteListener → coincidenciaService
                                                                   ↓
                                              (match found) → coincidencias table
                                                                   ↓
                                              [notificaciones.queue] → MS-Notificaciones
```

1. **Inbound**: `RabbitConfig.ReporteListener` consumes `reporte.creado.queue` (deserialized as `ReporteDTO`)
2. **Matching**: `coincidenciaService.procesarNuevoReporte()` queries the shared `reportes` table for active reports of the opposite type, then scores each candidate
3. **Outbound**: If score ≥ 0.60, saves the match to `coincidencias` and publishes a `NotificacionDTO` to `notificaciones.queue`

### Scoring Algorithm (`coincidenciaService.calcularScore`)

| Attribute    | Exact match | Partial |
|--------------|-------------|---------|
| tipoMascota  | +0.25       | —       |
| raza         | +0.25       | —       |
| tamano       | +0.15       | —       |
| color        | +0.10       | +0.05   |
| sexo         | +0.05       | —       |
| distance ≤1km| +0.20       | —       |
| distance ≤3km| +0.10       | —       |

Minimum threshold: **0.60**. Coordinates are parsed as `"lat,lon"` strings; distance uses Haversine.

### Shared Database

`reporteModel` is annotated `@Immutable` — it reads from the `reportes` table owned by MS-Reportes. Both services share the same PostgreSQL instance (`fullstack_db`). Never write to `reportes` from this service.

### Package Layout

The controller lives in `com.controller` (not under `com.sanosysalvos.coincidencias`). Everything else follows the `com.sanosysalvos.coincidencias.*` hierarchy. This inconsistency is intentional per the current routing setup.

### Infrastructure

| Service    | Host (Docker) | Port |
|------------|--------------|------|
| PostgreSQL | `postgres`   | 5432 |
| RabbitMQ   | `rabbitmq`   | 5672 |
| This MS    | —            | 8082 |

Swagger UI: `http://localhost:8082/swagger-ui.html`

### Key Design Decisions

- `fechaCoincidencia` is stored as `String`, not `LocalDateTime`.
- `CoincidenciaController` queries the repository directly for read operations and delegates to `coincidenciaService` only for match processing (which is triggered via RabbitMQ, not HTTP).
- `NotificacionDTO` uses `@JsonInclude(NON_NULL)` — omit null fields intentionally when building instances.
