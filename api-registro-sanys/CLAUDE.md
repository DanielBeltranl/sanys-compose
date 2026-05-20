Nombre: Servicio de registro

Descripcion
 - Servicio de registro para usuarios a una aplicacion. 
 - Existen 3 roles: ADMIN, PERSONA e INSTITUCION.
 - Cuentas con el rol admin SOLO SE PUEDEN CREAR VIA POSTMAN.


PERSONA: Cualquier usuario unico que se identifica como una persona real
INSTITUCION: Cualquier usuario creado bahjo el nombre de, por ejemplo, una clinica veterinaria, un refugio, etc.

- Dependiendo del rol y el tipo de institucion, se requiere guardar la informacion respectiva de cada uno en una tabla diferente.
- Inicialmente, se trabajara con personas, clinicas y refugios.

Patron deseado:
- Se desea implementar un factory method, para guardar la informacion necesaria en las tablas respectivas, de manera que en funcion aparezcan diferentes instituciones, la implementacion a nivel de codigo sea sencilla 

Condiciones:

- Se esta utilizando el sistema de autenticacion nativo de supabase, por lo que el servicio debe ser capaz de, en cada registro, enviar el correo y contraseña al sistema de autenticacion, enviar los datos del usuario dependiendo de su naturaleza y ligar la uuid creada por supabase a los datos.
- 


Tecnologia: 
- Spring 4.0.6
- Supabase + auth sistema