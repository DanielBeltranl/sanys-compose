# MS-Coincidencias

Microservicio del ecosistema **Sanos y Salvos** encargado de detectar coincidencias entre reportes de mascotas perdidas (`PERDIDO`) y encontradas (`VISTO`), y publicar notificaciones cuando se encuentra una coincidencia.

---

## Tecnologías

| Tecnología | Versión | Rol |
|---|---|---|
| Java | 21 | Lenguaje de programación |
| Spring Boot | 4.0.6 | Framework principal |
| Spring Web MVC | (Boot) | Exposición de endpoints REST |
| Spring Data JPA | (Boot) | Acceso a base de datos |
| Spring AMQP (RabbitMQ) | (Boot) | Mensajería asíncrona |
| Spring Cloud Netflix Eureka Client | 2025.1.1 | Registro y descubrimiento de servicios |
| PostgreSQL (Supabase) | — | Base de datos compartida con MS-Reportes |
| Lombok | (Boot) | Reducción de boilerplate |
| SpringDoc OpenAPI (Swagger) | 3.0.2 | Documentación de la API |
| Maven | (wrapper) | Gestión de dependencias y build |

---

## Arquetipo: CSR (Controller → Service → Repository)

```
com/
├── controller/
│   └── CoincidenciaController.java     # Endpoints REST (GET, DELETE)
│
└── sanosysalvos/coincidencias/
    ├── CoincidenciasApplication.java   # Entry point
    ├── config/
    │   └── RabbitConfig.java           # Declaración de colas + ReporteListener
    ├── messaging/
    │   └── NotificacionPublisher.java  # Publica NotificacionDTO a notificaciones.queue
    ├── model/
    │   ├── coincidenciaModel.java      # Entidad JPA tabla coincidencias
    │   ├── reporteModel.java           # Entidad JPA @Immutable (tabla de MS-Reportes)
    │   └── DTO/
    │       ├── ReporteDTO.java         # Mensaje entrante desde reporte.creado.queue
    │       └── NotificacionDTO.java    # Mensaje saliente + respuesta HTTP
    ├── repository/
    │   ├── repositoryCoincidencia.java # CRUD sobre coincidencias
    │   └── reporteRepository.java      # Lectura de reportes (BD compartida)
    └── services/
        └── coincidenciaService.java    # Lógica de matching y scoring
```

> **Nota sobre el paquete del controller**: `CoincidenciaController` vive en `com.controller` (fuera de la jerarquía `com.sanosysalvos.coincidencias`) de forma intencional por el setup de rutas actual.

---

## Arquitectura y flujo de mensajes

```
MS-Reportes
    │
    │  publica ReporteDTO
    ▼
[reporte.creado.queue]  ──►  RabbitConfig.ReporteListener
                                        │
                                        ▼
                             coincidenciaService.procesarNuevoReporte()
                                        │
                          ┌─────────────┴──────────────┐
                          │                            │
                    score < 0.60               score ≥ 0.60
                          │                            │
                        (noop)              guarda en coincidencias
                                                       │
                                                       ▼
                                         [notificaciones.queue]
                                                       │
                                                       ▼
                                             MS-Notificaciones
```

### Algoritmo de scoring

Cuando llega un nuevo reporte, el servicio consulta la tabla `reportes` buscando candidatos del tipo opuesto con estado `ACTIVO` y aplica el siguiente puntaje:

| Atributo | Coincidencia exacta | Coincidencia parcial |
|---|---|---|
| `tipoMascota` | +0.25 | — |
| `raza` | +0.25 | — |
| `tamano` | +0.15 | — |
| `color` | +0.10 | +0.05 (substring) |
| `sexo` | +0.05 | — |
| distancia ≤ 1 km | +0.20 | — |
| distancia ≤ 3 km | +0.10 | — |

**Umbral mínimo:** `0.60`. Las coordenadas se parsean como `"lat,lon"` y la distancia se calcula con la fórmula de Haversine.

### Base de datos compartida

`reporteModel` está anotado con `@Immutable` — solo lee de la tabla `reportes` que pertenece a MS-Reportes. **Nunca escribir en esa tabla desde este microservicio.**

---

## Endpoints REST

Base URL: `http://localhost:8082`  
Swagger UI: `http://localhost:8082/swagger-ui.html`

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/coincidencias` | Lista todas las coincidencias |
| `GET` | `/coincidencias/{id}` | Obtiene una coincidencia por ID |
| `GET` | `/coincidencias/reporte/{idReporte}` | Coincidencias donde aparece el reporte (perdido o encontrado) |
| `GET` | `/coincidencias/perdido/{idReportePerdida}` | Coincidencia para un reporte de tipo PERDIDO |
| `GET` | `/coincidencias/visto/{idReporteEncontrado}` | Coincidencia para un reporte de tipo VISTO |
| `DELETE` | `/coincidencias/{id}` | Elimina una coincidencia por ID |

---

## Infraestructura requerida

| Servicio | Host (Docker Compose) | Puerto |
|---|---|---|
| Eureka Server (Discovery) | `eureka-server` | 8761 |
| RabbitMQ | `rabbitmq` | 5672 |
| PostgreSQL / Supabase | `postgres` (o remoto) | 5432 |
| Este microservicio | — | 8082 |

---

## Instrucciones de ejecución

> Este microservicio forma parte de un sistema multi-servicio. Se recomienda levantarlo con Docker Compose junto al resto del ecosistema.

### Prerequisito: el Discovery Service debe estar activo

Este microservicio se registra en Eureka al arrancar. **Sin el Eureka Server corriendo, la aplicación fallará al iniciar.** El servicio de discovery debe estar disponible en:

```
http://eureka-server:8761/eureka
```

### Opción 1 — Con Docker Compose (recomendado)

```bash
# Desde el directorio raíz del proyecto (donde está el docker-compose.yml)
docker compose up eureka-server rabbitmq postgres ms-coincidencias
```

El orden de arranque sugerido es:
1. `postgres` (o usar Supabase remoto)
2. `rabbitmq`
3. `eureka-server` ← **mínimo indispensable**
4. `ms-coincidencias`

### Opción 2 — Local (desarrollo)

Requiere PostgreSQL y RabbitMQ corriendo localmente (o accesibles en red).

```bash
# Compilar sin tests
./mvnw clean package -DskipTests

# Levantar
./mvnw spring-boot:run
```

Variables de entorno relevantes:

| Variable | Default | Descripción |
|---|---|---|
| `SUPABASE_DB_PASSWORD` | `Cacrolito1996.` | Contraseña de la base de datos |
| `RABBITMQ_HOST` | `localhost` | Host de RabbitMQ |

### Opción 3 — Docker image standalone

```bash
docker build -t ms-coincidencias .
docker run -p 8082:8082 \
  -e RABBITMQ_HOST=<host> \
  -e SUPABASE_DB_PASSWORD=<password> \
  ms-coincidencias
```

### Ejecutar tests

```bash
./mvnw test

# Una clase específica
./mvnw test -Dtest=CoincidenciasApplicationTests
```
