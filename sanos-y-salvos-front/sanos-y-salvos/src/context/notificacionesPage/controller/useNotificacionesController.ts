import { useState, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'
import { tokenManager } from '../../../services/tokenManager'
import type { NotificacionMatchDTO } from '../model/notificacionTypes'
import { fetchNotificacionesPendientes } from '../model/notificacionApi'
import { useNotificacionesWs } from './useNotificacionesWs'

export function useNotificacionesController() {
  const [notificaciones, setNotificaciones] = useState<NotificacionMatchDTO[]>([])
  const [cargando, setCargando] = useState(true)

  const userId = tokenManager.getUserId()

  useEffect(() => {
    if (!userId) { setCargando(false); return }

    fetchNotificacionesPendientes(userId).then((data) => {
      setNotificaciones(data)
      setCargando(false)
    })
  }, [userId])

  const onMensaje = useCallback((data: NotificacionMatchDTO) => {
    setNotificaciones(prev => [data, ...prev])
    toast.success(
      `¡Coincidencia encontrada! Tu reporte de ${data.nombre_mascota} tiene una posible coincidencia.`,
      { duration: 6000 }
    )
  }, [])

  useNotificacionesWs(userId, onMensaje)

  return { notificaciones, cargando }
}
