# API Reportes — Documentación de endpoints

Base URL: `http://localhost:8086`

Todos los endpoints requieren autenticación JWT en el header:

```
Authorization: Bearer <token>
Content-Type: application/json
```

---

## POST /reportes/crear

Crea un nuevo reporte de mascota perdida o avistada.

### Headers

| Key | Value |
|-----|-------|
| Authorization | Bearer \<token\> |
| Content-Type | application/json |

### Body

```json
{
  "idUsuario": "uuid del usuario autenticado",
  "tipoReporte": "PERDIDO | AVISTADO",
  "tipoMascota": "string (ej: Perro, Gato)",
  "nombreMascota": "string",
  "color": "string",
  "tamano": "PEQUENO | MEDIANO | GRANDE",
  "raza": "string",
  "fotoMascota": "url de la foto",
  "descripcion": "string",
  "direccion": "string",
  "coordenadas": "latitud,longitud (ej: -33.4328,-70.6118)",
  "sexo": "MACHO | HEMBRA"
}
```

### Respuesta exitosa `201`

```json
{
  "status": 201,
  "message": "Reporte creado exitosamente",
  "error": null
}
```

---

## GET /reportes

Retorna todos los reportes registrados.

### Headers

| Key | Value |
|-----|-------|
| Authorization | Bearer \<token\> |

### Respuesta exitosa `200`

```json
[
  {
    "id": 1,
    "tipoReporte": "PERDIDO",
    "tipoMascota": "Perro",
    "nombreMascota": "Firulais",
    "color": "Cafe",
    "tamano": "MEDIANO",
    "raza": "Mestizo",
    "fotoMascota": "url",
    "descripcion": "string",
    "direccion": "string",
    "coordenadas": "latitud,longitud",
    "sexo": "MACHO"
  }
]
```

---

## GET /reportes/{id}

Retorna un reporte específico por su ID.

### Headers

| Key | Value |
|-----|-------|
| Authorization | Bearer \<token\> |

### Path param

| Param | Tipo | Descripción |
|-------|------|-------------|
| id | Long | ID del reporte |

### Respuesta exitosa `200`

```json
{
  "id": 1,
  "tipoReporte": "PERDIDO",
  "tipoMascota": "Perro",
  "nombreMascota": "Firulais",
  "color": "Cafe",
  "tamano": "MEDIANO",
  "raza": "Mestizo",
  "fotoMascota": "url",
  "descripcion": "string",
  "direccion": "string",
  "coordenadas": "latitud,longitud",
  "sexo": "MACHO"
}
```

---

## PUT /reportes/{id}

Actualiza un reporte existente.

### Headers

| Key | Value |
|-----|-------|
| Authorization | Bearer \<token\> |
| Content-Type | application/json |

### Path param

| Param | Tipo | Descripción |
|-------|------|-------------|
| id | Long | ID del reporte a actualizar |

### Body

Misma estructura que POST /reportes/crear.

### Respuesta exitosa `200`

Retorna el reporte actualizado con la misma estructura que GET /reportes/{id}.

---

## DELETE /reportes/{id}

Elimina un reporte por su ID.

### Headers

| Key | Value |
|-----|-------|
| Authorization | Bearer \<token\> |

### Path param

| Param | Tipo | Descripción |
|-------|------|-------------|
| id | Long | ID del reporte a eliminar |

### Respuesta exitosa `204`

Sin body.
