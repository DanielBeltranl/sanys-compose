import type { ApiNotificacion } from './notificacionTypes'
import { mapApiNotificacion } from './notificacionTypes'

const apiMock: ApiNotificacion[] = [
  {
    id_notificacion: 1,
    estado_notificacion: 'PENDIENTE',
    descripcion: 'Encontramos una posible coincidencia con tu reporte de Luna (Perro). Un usuario reportó un avistamiento a 500 m de tu zona.',
    id_coincidencia: 2, // apunta al reporte ID 2 del mock (gato avistado — mock temporal)
    id_usuario: 1,
    fecha_creacion: '2026-05-08T10:30:00.000Z',
    mensajeError: null,
  },
  {
    id_notificacion: 2,
    estado_notificacion: 'PENDIENTE',
    descripcion: 'Nueva coincidencia detectada para tu reporte de Max (Gato). Revisa los detalles del avistamiento reportado cerca de tu dirección.',
    id_coincidencia: 4, // apunta al reporte ID 4 del mock
    id_usuario: 1,
    fecha_creacion: '2026-05-07T16:20:00.000Z',
    mensajeError: null,
  },
  {
    id_notificacion: 3,
    estado_notificacion: 'PENDIENTE',
    descripcion: 'Alguien marcó una posible coincidencia con tu mascota perdida. Ingresa a ver los detalles.',
    id_coincidencia: 6, // apunta al reporte ID 6 del mock
    id_usuario: 1,
    fecha_creacion: '2026-05-06T09:15:00.000Z',
    mensajeError: null,
  },
  {
    id_notificacion: 4,
    estado_notificacion: 'LEIDA',
    descripcion: 'La coincidencia con tu reporte anterior fue marcada como resuelta.',
    id_coincidencia: 1, // apunta al reporte ID 1 del mock
    id_usuario: 1,
    fecha_creacion: '2026-05-01T09:00:00.000Z',
    mensajeError: null,
  },
  {
    id_notificacion: 5,
    estado_notificacion: 'ERROR',
    descripcion: 'No pudimos procesar la coincidencia detectada para tu reporte.',
    id_coincidencia: 3,
    id_usuario: 1,
    fecha_creacion: '2026-04-28T14:00:00.000Z',
    mensajeError: 'Timeout al consultar el motor de coincidencias.',
  },
]

export const notificacionesMock = apiMock.map(mapApiNotificacion)
