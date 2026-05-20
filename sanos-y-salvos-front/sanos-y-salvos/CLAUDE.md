
## Descripcion del proyeto

Pagina de reporte y busqueda de mascotas. Se puede reportar la perdida de una mascota o una posible mascota perdida. Posee un motor de coincidencias capaz de avisar al creador de un reporte la existencia de una posible coincidecia con otro.

## Arquitectura

Se usara una arquitectura por capas, modelo - vista -controlador

## Estructura de carpetas

src -> context -> view_name -> model-folder (logica de negocio, si una logica requiere mas de una funcion para ser orquestada, crear sub carpetas con todos los archivos necesarios para mantener el orden de la aplicacion), view (debe contener internamente donde se guarden todos sus componentes y un archivo a nivel raiz, con el nombre de la vista donde se invoquen), controller (integracion de la vista con la loga de negocios)

## Tecnologias

React 
talwind 
axios 
react-router
zod + react hook form
Leaflet para mapas


## Orden de trabajo:

Cada vez que se genere un componente, debes preguntar si requiere consumir o enviar datos a una api o no. De ser si, debes crear la vista y el componente con una perspectiva de posterior integracion con una api, ya sea para enviar o recibir datos segun la respuesta del usuario 

TODAS LAS VISTAS DEBEN SER 100% RESPONSIVAS, es decir, debes procurar que tengan las medidas correctas tanto para moviles, tablets, como navegadores.

## Roles

- Servicio de registro para usuarios a una aplicacion.
- Existen 3 roles: ADMIN, PERSONA e INSTITUCION.
- Cuentas con el rol admin SOLO SE PUEDEN CREAR VIA POSTMAN.


PERSONA: Cualquier usuario unico que se identifica como una persona real
INSTITUCION: Cualquier usuario creado bahjo el nombre de, por ejemplo, una clinica veterinaria, un refugio, etc.

## Memory
Tenés acceso a Engram persistent memory via MCP (mem_save, mem_search, mem_session_summary).
- Guardá proactivamente después de trabajo significativo.
- Después de cualquier compaction, llamá `mem_context` para recuperar el estado de sesión.

## Consumo de apis

- Cuando diseñes las vistas y planifiques el consumo de una api, no consumas todos los datos, usa solo los que necesites esperando la posterior confeccion de un backend for frontend.
- LOs modelos de respuesta presentes en la documentacion son solo referencias, no obligaciones