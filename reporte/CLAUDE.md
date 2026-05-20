

## Descripcion

- Este microservicio registra reporte de mascotas, tanto perdidas, como avistamientos de las mismas
- Sera consultada a traves de un backend fro frontend
- Cuelquier equerimiento de mas contexto, consultamelo

## Arquitectura

- Dividida en capaz
- Controller: manejo de peticiones y rutas
- Model: Entidades y dtos
- Service: Logica de negocio

## Tecnologias

- Java + Springboot
- Supabase como db
- jwt para validar la identidad en las peticiones
- Eureka service para expónerse en un discovery
