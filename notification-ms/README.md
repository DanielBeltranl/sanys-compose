# notification-ms

Microservicio de notificaciones en tiempo real para la plataforma **Sanos y Salvos**. Escucha eventos de coincidencia de mascotas desde RabbitMQ, persiste las notificaciones en PostgreSQL y las entrega a los clientes conectados vía WebSocket (STOMP).

---

## Tecnologías

| Tecnología | Versión | Rol |
|---|---|---|
| Java | 17 | Lenguaje |
| Spring Boot | 3.2.5 | Framework principal |
| Spring Cloud | 2023.0.1 | Integración con Eureka |
| RabbitMQ | - | Message broker (cola de eventos) |
| WebSocket + STOMP | - | Notificaciones en tiempo real al cliente |
| SockJS | - | Fallback de transporte para WebSocket |
| PostgreSQL | - | Persistencia de notificaciones |
| Eureka Client | - | Registro y descubrimiento de servicios |
| Lombok | - | Reducción de boilerplate |
| SpringDoc OpenAPI | 2.5.0 | Documentación Swagger |

---

## Arquitectura

El microservicio sigue el arquetipo de **capas (CSR)**: Controller → Service → Repository.

```
┌──────────────────────────────────────────────────────────────────────┐
│                        notification-ms                               │
│                                                                      │
│  RabbitMQ ──► NotificationService ──► NotificacionRepository ──► DB │
│  (notificaciones.queue)       │                                      │
│                               └──► WebSocketNotificationService      │
│                                           │                          │
│  HTTP Client ──► NotificationController ──┘                          │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
             │                                    │
             ▼                                    ▼
       PostgreSQL                    Browser / Cliente WS
      (notificaciones)          /topic/notifications/{idUsuario}
```

### Flujo principal

1. Otro microservicio publica un evento `CoincidenciaEventDTO` en la cola `notificaciones.queue`.
2. `NotificationService` recibe el mensaje y llama a `procesarNotificacion`.
3. Se guarda una `Notificacion` en PostgreSQL con estado `PENDIENTE`.
4. `WebSocketNotificationService` verifica si el usuario está conectado:
   - **Conectado** → envía al topic `/topic/notifications/{idUsuario}` y actualiza el estado a `ENVIADA`.
   - **Desconectado** → la notificación queda como `PENDIENTE` para ser consultada luego.
5. Si el procesamiento falla, se reintenta hasta **3 veces** con un backoff de **2 segundos**. Tras el tercer fallo, `@Recover` guarda el registro con estado `FALLIDA`.

### Estados de una notificación

| Estado | Descripción |
|---|---|
| `PENDIENTE` | Guardada, usuario no estaba conectado |
| `ENVIADA` | Entregada correctamente vía WebSocket |
| `FALLIDA` | Falló tras 3 intentos de procesamiento |

---

## Dependencias (pom.xml)

```xml
<!-- Web REST -->
spring-boot-starter-web

<!-- JPA + PostgreSQL -->
spring-boot-starter-data-jpa
postgresql (runtime)

<!-- Mensajería -->
spring-boot-starter-amqp          <!-- RabbitMQ -->

<!-- WebSocket -->
spring-boot-starter-websocket     <!-- STOMP + SockJS -->

<!-- Service Discovery -->
spring-cloud-starter-netflix-eureka-client

<!-- Resiliencia -->
spring-retry
spring-aspects

<!-- Utilidades -->
lombok

<!-- Documentación -->
springdoc-openapi-starter-webmvc-ui:2.5.0

<!-- Testing -->
spring-boot-starter-test
```

---

## Estructura del proyecto

```
src/main/java/com/sanosysalvos/notification/
├── config/
│   ├── CorsConfig.java               # Configuración de CORS
│   ├── RabbitMQConfig.java           # Declaración de cola y conversor JSON
│   ├── WebSocketConfig.java          # STOMP broker, prefijos /topic y /app
│   └── WebSocketSessionRegistry.java # Registro in-memory de usuarios conectados
├── controller/
│   └── NotificationController.java   # Endpoints REST /api/notifications
├── dto/
│   ├── CoincidenciaEventDTO.java     # Evento entrante desde RabbitMQ
│   └── NotificacionResumenDTO.java   # Respuesta reducida al cliente
├── model/
│   └── Notificacion.java             # Entidad JPA → tabla notificaciones
├── repository/
│   └── NotificacionRepository.java   # Acceso a datos (JpaRepository)
└── service/
    ├── NotificationService.java          # Lógica principal + listener RabbitMQ
    └── WebSocketNotificationService.java # Envío de mensajes STOMP
```

---

## API REST

Base URL: `http://localhost:8083/api/notifications`

| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/match` | Dispara una notificación manualmente (mismo contrato que RabbitMQ) |
| `GET` | `/` | Lista todas las notificaciones |
| `GET` | `/{id}` | Obtiene una notificación por ID (solo estados PENDIENTE o FALLIDA) |
| `GET` | `/usuario/{idUsuario}` | Lista notificaciones PENDIENTE o FALLIDA de un usuario |

### Body `POST /match`

```json
{
  "id_coincidencia": 1,
  "id_reporte_perdida": 10,
  "id_reporte_encontrado": 20,
  "fecha_coincidencia": "2024-05-20",
  "nombre_mascota": "Firulais",
  "tipo_mascota": "Perro",
  "direccion": "Av. Siempre Viva 123",
  "coordenadas": "-33.45,-70.65",
  "id_usuario_reporte_perdida": "uuid-del-usuario",
  "email_usuario": "usuario@email.com"
}
```

---

## WebSocket

| Parámetro | Valor |
|---|---|
| Endpoint de conexión | `/ws-notifications` (con SockJS) |
| Topic de suscripción | `/topic/notifications/{idUsuario}` |
| Página de prueba | `http://localhost:8083/index.html` |

El `WebSocketSessionRegistry` detecta automáticamente cuándo un usuario se suscribe o desconecta del topic para saber si está activo al momento de enviar.

---

## Documentación Swagger

- UI: `http://localhost:8083/swagger-ui.html`
- JSON spec: `http://localhost:8083/api-docs`

---

## Instrucciones de ejecución

Este microservicio forma parte de un ecosistema de servicios orquestado con Docker Compose. **No está diseñado para correr de forma aislada.**

### Orden de arranque obligatorio

```
1. discovery-ms   ← Eureka Server (REQUERIDO mínimo)
2. rabbitmq       ← Message broker
3. notification-ms
```

> Si el Discovery Server no está activo, el microservicio no podrá registrarse en Eureka y fallará al iniciar.

### Con Docker Compose (recomendado)

Desde el directorio raíz del proyecto donde esté el `docker-compose.yml`:

```bash
# Levantar todo el ecosistema
docker compose up -d

# O levantar solo lo necesario para este servicio
docker compose up -d discovery-ms rabbitmq notification-ms
```

### Solo este servicio (desarrollo local)

Requiere tener PostgreSQL y RabbitMQ disponibles, y el Discovery Server corriendo.

```bash
# Compilar sin tests
./mvnw clean package -DskipTests

# Ejecutar
./mvnw spring-boot:run

# O con el JAR generado
java -jar target/notification-0.0.1-SNAPSHOT.jar
```

### Construir imagen Docker

```bash
docker build -t notification-ms .
```

### Variables de entorno

| Variable | Descripción | Default |
|---|---|---|
| `SUPABASE_DB_PASSWORD` | Contraseña de la base de datos PostgreSQL | configurada en `.env` |

---

## Infraestructura requerida

| Servicio | Host (Docker) | Puerto | Credenciales |
|---|---|---|---|
| PostgreSQL (Supabase) | `aws-1-sa-east-1.pooler.supabase.com` | `5432` | Ver `.env` |
| RabbitMQ | `rabbitmq` | `5672` | `guest / guest` |
| Eureka Server | `eureka-server` | `8761` | `admin / password123` |

Cola escuchada: `notificaciones.queue`
