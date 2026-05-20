import { useNavigate } from 'react-router'
import type { NotificacionMatchDTO } from '../../model/notificacionTypes'

function formatFecha(iso: string): string {
  const fecha = new Date(iso)
  const ahora = new Date()
  const diffMs = ahora.getTime() - fecha.getTime()
  const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDias === 0) return 'Hoy'
  if (diffDias === 1) return 'Ayer'
  if (diffDias < 7) return `Hace ${diffDias} días`
  return fecha.toLocaleDateString('es-CL', { day: 'numeric', month: 'short' })
}

interface Props {
  notificacion: NotificacionMatchDTO
}

export function NotificacionCard({ notificacion }: Props) {
  const navigate = useNavigate()

  return (
    <div
      role="button"
      onClick={() => navigate(`/reportes/${notificacion.id_reporte_encontrado}`)}
      className="rounded-2xl border border-slate-100 shadow-sm p-4 flex gap-3 border-l-4 border-l-[#0f52ba] bg-white cursor-pointer active:scale-[0.98] transition-transform"
    >
      <div className="mt-1 shrink-0">
        <span className="w-2.5 h-2.5 rounded-full block bg-[#0f52ba]" />
      </div>

      <div className="flex-1 min-w-0 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <span className="text-[10px] font-bold font-manrope px-2 py-0.5 rounded-full shrink-0 bg-blue-50 text-[#0f52ba]">
            Coincidencia
          </span>
          <span className="text-[10px] font-inter text-slate-400 shrink-0">
            {formatFecha(notificacion.fecha_coincidencia)}
          </span>
        </div>

        <p className="text-sm font-inter text-[#191c1e] leading-relaxed">
          Se encontró una posible coincidencia con{' '}
          <span className="font-semibold">{notificacion.nombre_mascota}</span>.
        </p>

        <span className="self-start text-xs font-semibold font-manrope text-[#0f52ba]">
          Ver reporte coincidente →
        </span>
      </div>
    </div>
  )
}
