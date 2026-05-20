import { useEffect, useRef } from 'react'
import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client'
import type { NotificacionMatchDTO } from '../model/notificacionTypes'

const WS_URL = import.meta.env.VITE_NOTIFICATIONS_URL
  ? `${import.meta.env.VITE_NOTIFICATIONS_URL}/ws-notifications`
  : 'http://localhost:8083/ws-notifications'

export function useNotificacionesWs(
  userId: string | null,
  onMensaje: (data: NotificacionMatchDTO) => void
) {
  const callbackRef = useRef(onMensaje)
  useEffect(() => { callbackRef.current = onMensaje })

  useEffect(() => {
    if (!userId) return

    const client = new Client({
      webSocketFactory: () => new SockJS(WS_URL),
      reconnectDelay: 5000,
      onConnect: () => {
        client.subscribe(`/topic/notifications/${userId}`, (frame) => {
          const data = JSON.parse(frame.body) as NotificacionMatchDTO
          callbackRef.current(data)
        })
      },
    })

    client.activate()
    return () => { client.deactivate() }
  }, [userId])
}
