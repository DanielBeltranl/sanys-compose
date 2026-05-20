
## Descripcion

Backend for frontend destinado a la comunicacion entre un api gateway y diferentes microservicios.  

## Arquitectura

Dividido en capas

**Directorios**, , 

- Controller: COntrol de peticiones, validacion de body en el payload y respuesta
- Service: Toda la logica de negocio que necesitemos
- Repository: Manejo de la conexion con la base de datos
- Model: Manejo de dtos

**Recibe**

- POST reporte
- POST login
- POST registro

LA informacion detallada se ira disponiobilizadno en @.claude/docs/api-routes-and-models.md

**Envia**

- GET reportes
- GET info de usuario

## Tecnologias

- Java + spring
- Open feing 
- Eureka

## Instrucciones

- En caso de ser requerido, el token debe ser validado con la firma correspondiente.
- No todas las rutas requerian de un token. Cuando comiences cada end point, pregunta si deben considerarse o no.
- Preguntame ABSOLUTAMENTE TODAS tus dudas
- Cada vez que construyas un dto o end point, exije todas ls formas respectivas, tanto de la respuesta como el paylod que necesita en enviar.
