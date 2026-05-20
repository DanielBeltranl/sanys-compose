# Sanos y Salvos — Frontend

Plataforma web para reporte y búsqueda de mascotas perdidas. Los usuarios pueden publicar reportes de mascotas perdidas o avistadas, visualizarlos en un mapa interactivo y recibir alertas en tiempo real cuando el motor de coincidencias detecta un match entre reportes.

---

## Arquitectura

El proyecto sigue una **arquitectura MVC por feature (context-based)**, donde cada página o funcionalidad es un módulo independiente con sus propias capas. No existe un store global: el estado vive en los controllers de cada contexto y se comunica a las vistas a través de custom hooks.

```
src/
├── context/              # Módulos por feature
│   ├── dashboardPage/
│   │   ├── model/        # Tipos, llamadas a API, utilidades de negocio
│   │   ├── view/         # Componentes React y subcomponentes
│   │   └── controller/   # Custom hooks que orquestan model ↔ view
│   ├── crearReportePage/
│   ├── loginPage/
│   ├── registerPage/
│   ├── perfilPage/
│   ├── notificacionesPage/
│   ├── reporteDetailPage/
│   ├── rolSelectionPage/
│   ├── unauthorizedPage/
│   └── commons/          # Guards, layouts y componentes compartidos
├── services/             # Infraestructura transversal (HTTP, auth)
├── router.tsx            # Definición de rutas
└── main.tsx
```

### Capas por contexto

| Capa | Responsabilidad |
|------|----------------|
| `model/` | Tipos TypeScript, esquemas Zod, llamadas HTTP (`*Api.ts`), datos mock |
| `view/` | Componentes React puros orientados a presentación |
| `controller/` | Custom hooks que leen del modelo y exponen estado a la vista |

---

## Patrones de diseño

### Repository (API layer)
Cada feature encapsula sus llamadas HTTP en archivos `*Api.ts` dentro de `model/`. La vista nunca llama directamente a `httpClient`.

```
crearReportePage/model/reporteCreateApi.ts
dashboardPage/model/reportesApi.ts
notificacionesPage/model/notificacionApi.ts
```

### Facade
`src/services/httpClient.ts` expone una instancia configurada de Axios con interceptores de autenticación y manejo de 401, ocultando esa complejidad al resto de la app.

### Custom Hook como Controller
Cada `useXxxController` actúa como el controlador MVC: orquesta side-effects, llama al model y devuelve estado listo para la vista. Las vistas son casi puramente declarativas.

```typescript
// vista solo consume el hook
const { reportesCercanos, cargando, userLocation } = useDashboardController()
```

### Observer (WebSocket / STOMP)
`useNotificacionesWs` implementa el patrón Observer sobre STOMP + SockJS. Se suscribe al canal `/topic/notifications/{userId}` y dispara callbacks cuando llega una notificación del backend.

### Guard (Route Protection)
`PrivateRoute` verifica el JWT antes de renderizar rutas protegidas. Si el token es inválido o inexistente, redirige a `/unauthorized`.

### Schema-first Validation
Los esquemas Zod en `model/` son la única fuente de verdad para validación de formularios. Se integran con `react-hook-form` via `@hookform/resolvers/zod`. Los tipos TypeScript se infieren del schema (`z.infer<typeof schema>`), nunca se duplican.

### Polling silencioso
El dashboard refresca los reportes cercanos cada 60 segundos en segundo plano sin interrumpir al usuario, como respaldo al canal WebSocket.

### Multi-stage Docker build
El `Dockerfile` separa la etapa de compilación (Node 20 Alpine) de la de servicio (Nginx 1.25 Alpine), produciendo una imagen de producción mínima que sirve los estáticos compilados.

---

## Dependencias principales

| Paquete | Versión | Uso |
|---------|---------|-----|
| `react` | 19 | UI framework |
| `react-router` | 7 | Enrutamiento SPA |
| `axios` | 1.x | Cliente HTTP |
| `zod` | 4.x | Validación de esquemas |
| `react-hook-form` | 7.x | Formularios controlados |
| `@hookform/resolvers` | 5.x | Integración zod ↔ react-hook-form |
| `leaflet` + `react-leaflet` | 1.9 / 5.x | Mapas interactivos |
| `@stomp/stompjs` | 7.x | Protocolo STOMP sobre WebSocket |
| `sockjs-client` | 1.6 | Transporte WebSocket con fallback |
| `react-hot-toast` | 2.x | Notificaciones toast |
| `tailwindcss` | 4.x | Estilos utilitarios |
| `typescript` | 6.x | Tipado estático |
| `vite` | 8.x | Bundler y servidor de desarrollo |

---

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto (`sanos-y-salvos/`):

```env
VITE_API_URL=http://localhost:8090/bff/v1
VITE_NOTIFICATIONS_URL=http://localhost:8083
VITE_CLOUDINARY_CLOUD_NAME=tu_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=tu_upload_preset
```

---

## Instrucciones de ejecución

### Desarrollo local (aislado)

```bash
cd sanos-y-salvos
npm install
npm run dev
```

> **Advertencia:** Al levantar el frontend de forma aislada, la aplicación no tiene acceso a datos reales.
> Las llamadas al BFF (`/bff/v1`), al microservicio de notificaciones y a Cloudinary fallarán.
> Las vistas que dependen de autenticación o datos del servidor no funcionarán correctamente.
> Para una experiencia completa, levanta el stack con Docker Compose (ver más abajo).

### Producción con Docker Compose (recomendado)

Este servicio está diseñado para correr junto al BFF y demás microservicios del proyecto. Desde la raíz del monorepo:

```bash
docker compose up --build
```

El frontend queda disponible en `http://localhost:80` y se comunica con los servicios del compose a través de la red interna de Docker.

### Build de producción manual

```bash
cd sanos-y-salvos
npm install
npm run build
# Los archivos estáticos quedan en dist/
```

---

## Rutas disponibles

| Ruta | Acceso | Descripción |
|------|--------|-------------|
| `/` | Público | Login |
| `/rol-selector` | Público | Selección de tipo de usuario |
| `/register/:userType` | Público | Formulario de registro (`persona`, `clinica`, `refugio`) |
| `/dashboard` | Protegido | Mapa de reportes cercanos |
| `/crear-reporte` | Protegido | Formulario para publicar un reporte |
| `/reportes/:id` | Protegido | Detalle de un reporte |
| `/unauthorized` | Público | Pantalla de acceso denegado |
