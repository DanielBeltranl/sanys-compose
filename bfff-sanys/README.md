# BFF Sanos y Salvos

Backend for Frontend (BFF) que actúa como capa intermedia entre el frontend y los microservicios del sistema Sanos y Salvos. Agrega, transforma y expone los datos necesarios para el cliente.

---

## Arquitectura

El proyecto sigue el patrón **CSC** (Controller → Service → Client), adaptado al rol de BFF donde no existe capa de repositorio propia — la persistencia vive en los microservicios destino.

```
Request
   │
   ▼
Controller          ← Valida el payload, define la respuesta HTTP
   │
   ▼
Service             ← Lógica de negocio, orquestación entre clientes
   │
   ▼
Client (Feign)      ← Llama al microservicio o API externa
```

### Capas

| Capa | Paquete | Responsabilidad |
|------|---------|-----------------|
| `controller` | `controller/` | Recibe peticiones, valida body, retorna respuesta |
| `service` | `service/` | Lógica de negocio y orquestación |
| `client` | `client/` | Clientes Feign hacia microservicios y APIs externas |
| `model` | `model/` | DTOs de request y response |
| `mapper` | `mapper/` | Transformaciones entre modelos externos y DTOs del BFF |
| `config` | `config/` | Feign, seguridad, decodificadores de error |
| `exception` | `exception/` | Manejo global de errores |

### Microservicios conectados

| Cliente Feign | Destino | Autenticación |
|--------------|---------|---------------|
| `RegistroClient` | `ms-registro` vía API Gateway | Sin token |
| `LoginClient` | Supabase Auth | Sin token |
| `ReportesClient` | `ms-reportes` vía API Gateway | JWT Bearer |
| `NotificacionesClient` | `ms-reportes` vía API Gateway | Sin token |

---

## Dependencias principales

| Dependencia | Versión | Uso |
|-------------|---------|-----|
| Spring Boot | 4.0.6 | Framework base |
| Spring Cloud OpenFeign | 2025.1.1 | Clientes HTTP declarativos hacia microservicios |
| Spring Cloud Netflix Eureka Client | 2025.1.1 | Service discovery |
| Spring Cloud LoadBalancer | 2025.1.1 | Balanceo de carga |
| Spring Boot Security | 4.0.6 | Seguridad y filtros HTTP |
| Spring Boot OAuth2 Resource Server | 4.0.6 | Validación de JWT emitidos por Supabase |
| Spring Boot Data JPA | 4.0.6 | Acceso a base de datos Supabase/PostgreSQL |
| PostgreSQL Driver | runtime | Conexión a Supabase |
| Spring Boot Validation | 4.0.6 | Validación de payloads con anotaciones |
| Spring Boot Actuator | 4.0.6 | Health checks y métricas |
| Lombok | opcional | Reducción de boilerplate |
| Java | 17 | Versión del lenguaje |

---

## Endpoints expuestos

**Base URL:** `http://localhost:8090`

| Método | Ruta | JWT requerido | Descripción |
|--------|------|:---:|-------------|
| `POST` | `/api/registro` | No | Registro de nuevo usuario (persona, clínica o refugio) |
| `POST` | `/api/login` | No | Autenticación vía Supabase Auth |
| `POST` | `/api/reportes/crear` | Sí | Crear reporte de mascota perdida/avistada |
| `POST` | `/api/reportes` | Sí | Listar reportes en un radio geográfico |
| `GET` | `/api/reportes/{id}` | Sí | Obtener reporte por ID |
| `GET` | `/api/registro/{id}` | Sí | Obtener datos de usuario por UUID |
| `GET` | `/api/notifications/{id}` | No | Consultar notificación de coincidencia por ID |

---

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
SUPABASE_DB_PASSWORD=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Variables opcionales con valores por defecto:

```env
EUREKA_HOST=localhost     # host del servidor Eureka (default: localhost)
GATEWAY_HOST=localhost    # host del API Gateway (default: localhost)
```

---

## Ejecución

### Con Docker Compose (recomendado)

Este servicio está pensado para ejecutarse junto al resto del ecosistema (Eureka, API Gateway, microservicios). Referirse al `docker-compose.yml` del repositorio raíz.

```bash
# Desde el directorio raíz del monorepo
docker compose up --build bff-sanys
```

### Local (solo el BFF)

Requiere que Eureka y el API Gateway estén corriendo o configurar las URLs manualmente.

```bash
# Compilar
./mvnw clean package -DskipTests

# Ejecutar (con variables de entorno seteadas)
java -jar target/bfff-sanys-0.0.1-SNAPSHOT.jar
```

### Con Docker (imagen individual)

```bash
docker build -t bff-sanys .

docker run -p 8090:8090 \
  -e SUPABASE_DB_PASSWORD=xxx \
  -e SUPABASE_ANON_KEY=xxx \
  -e SUPABASE_SERVICE_ROLE_KEY=xxx \
  -e EUREKA_HOST=localhost \
  -e GATEWAY_HOST=localhost \
  bff-sanys
```

---

## Health check

```
GET http://localhost:8090/actuator/health
```
