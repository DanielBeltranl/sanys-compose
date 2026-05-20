import axios from 'axios'
import type { NotificacionMatchDTO } from './notificacionTypes'

const NOTIFICATIONS_BASE = import.meta.env.VITE_NOTIFICATIONS_REST_URL ?? 'http://localhost:8081'

export async function fetchNotificacionesPendientes(uuid: string): Promise<NotificacionMatchDTO[]> {
  try {
    const { data } = await axios.get<NotificacionMatchDTO[]>(
      `${NOTIFICATIONS_BASE}/api/notifications/usuario/${uuid}`
    )
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}
