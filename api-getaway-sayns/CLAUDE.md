# CLAUDE.md

Este proyecto contiene una api-gateway. Debe recibir un token proveniente de supabase y validar: 

1.- La existencia de un token

2.- Que el token tenga firma de supabase

3.- Que el rol que contenga este entre ADMIN, PERSONA, INSTITUCION (leído desde `user_metadata.role`)


## Instrucciones particulares

**Registro**

- El post no requiere de token


## Commands

```bash
# Build
./mvnw clean package

# Run
./mvnw spring-boot:run

# Run tests
./mvnw test

# Run a single test class
./mvnw test -Dtest=ApiGateawaySys2ApplicationTests

# Build Docker image (OCI)
./mvnw spring-boot:build-image
```

## Architecture

This is a **Spring Cloud API Gateway** service (`api-gateaway-sys-2`) acting as the single entry point for the `api-huerto-hogar` microservices system.

**Stack:**
- Java 21, Spring Boot 4.0.6, Spring Cloud 2025.1.1
- `spring-cloud-starter-gateway-server-webmvc` — MVC-based (not reactive/WebFlux) gateway
- `spring-cloud-starter-netflix-eureka-client` — registers with Eureka and resolves downstream services by name via `lb://` URIs
- `spring-boot-starter-security` + `spring-boot-starter-security-oauth2-resource-server` — validates JWT bearer tokens at the gateway before forwarding requests
- `spring-boot-starter-actuator` — health/metrics endpoints

**Key configuration to add in `application.properties`:**
- Eureka server URL (`eureka.client.service-url.defaultZone`)
- Gateway routes (`spring.cloud.gateway.mvc.routes[*]`)
- JWT issuer/JWK set URI (`spring.security.oauth2.resourceserver.jwt.*`)
- Server port (default `8080`)

**Security model:** The gateway is the OAuth2 resource server — it validates JWTs on every inbound request and forwards authenticated requests to downstream microservices. Security configuration class (not yet created) should extend/configure `SecurityFilterChain` for route-level authorization rules.

**Main class:** `cl.sys.discoveryservice.apigateawaysys2.ApiGateawaySys2Application`
