# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Build
./mvnw clean package -DskipTests

# Run locally (requires PostgreSQL + RabbitMQ)
./mvnw spring-boot:run

# Run tests
./mvnw test

# Run a single test class
./mvnw test -Dtest=NotificationApplicationTests

# Build Docker image
docker build -t notification-ms .
```

## Architecture

This is a Spring Boot 3.2.5 microservice (Java 17) that handles pet-match notifications for the "Sanos y Salvos" platform. It sits at the end of an event-driven pipeline:

```
Other microservice → RabbitMQ (notificaciones.queue) → NotificationService → PostgreSQL
                                                                           ↘ WebSocket → browser clients
```

**Event flow:**
1. `NotificationService` listens on RabbitMQ queue `notificaciones.queue` and receives `CoincidenciaEventDTO` (a pet match event).
2. `procesarNotificacion` saves a `Notificacion` record to PostgreSQL with `estado_notificacion = "ENVIADA"`.
3. `WebSocketNotificationService` pushes the notification to `/topic/notifications/{idUsuario}` via STOMP.
4. On persistent failure (3 retries, 2 s backoff), `@Recover` saves the record with `estado_notificacion = "FALLIDA"`.

**REST endpoints** (`/api/notifications`):
- `POST /match` — manual trigger (same path as RabbitMQ consumer, useful for testing)
- `GET /` — list all notifications
- `GET /{id}` — get by ID

**WebSocket:**
- Endpoint: `/ws-notifications` (SockJS)
- Subscribe to: `/topic/notifications/{userId}`
- Built-in test page available at `http://localhost:8081/index.html`

## Infrastructure Dependencies

| Service    | Address              | Credentials           |
|------------|----------------------|-----------------------|
| PostgreSQL | `postgres:5432`      | `postgres/postgres`   |
| RabbitMQ   | `rabbitmq:5672`      | `guest/guest`         |
| Queue name | `notificaciones.queue` | —                   |

Eureka is **disabled** (`eureka.client.enabled=false`) for local development.

## Key Files

- `src/main/resources/application.properties` — all config (DB, RabbitMQ, Eureka)
- `config/RabbitMQConfig.java` — declares the durable queue and JSON message converter
- `config/WebSocketConfig.java` — STOMP broker on `/topic` and `/queue`, app prefix `/app`
- `service/NotificationService.java` — RabbitMQ listener + retry logic + DB persistence
- `service/WebSocketNotificationService.java` — pushes to user-specific STOMP topic
- `dto/CoincidenciaEventDTO.java` — incoming event shape from other microservices
- `model/Notificacion.java` — JPA entity mapped to `notificaciones` table

## Swagger / OpenAPI

- UI: `http://localhost:8081/swagger-ui.html`
- JSON spec: `http://localhost:8081/api-docs`
