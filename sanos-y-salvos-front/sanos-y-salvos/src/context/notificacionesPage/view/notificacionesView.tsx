import type { NotificacionMatchDTO } from '../model/notificacionTypes'
import { NotificacionCard } from './components/NotificacionCard'

interface Props {
  notificaciones: NotificacionMatchDTO[]
  cargando: boolean
}

export function NotificacionesView({ notificaciones, cargando }: Props) {
  if (cargando) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#0f52ba] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-lg mx-auto px-4 py-6 pb-8 flex flex-col gap-4">

        <div className="flex items-center justify-between px-1">
          <h2 className="font-manrope text-base font-bold text-[#191c1e]">Alertas</h2>
          {notificaciones.length > 0 && (
            <span className="text-xs font-semibold font-manrope bg-[#0f52ba] text-white px-2.5 py-1 rounded-full">
              {notificaciones.length} nueva{notificaciones.length > 1 ? 's' : ''}
            </span>
          )}
        </div>

        {notificaciones.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-10 flex flex-col items-center gap-2 text-center">
            <svg viewBox="0 0 24 24" className="w-12 h-12 fill-slate-200">
              <path d="M5 19v-2h2v-7q0-2.075 1.25-3.688Q9.5 4.7 11.5 4.175V3.5q0-.625.438-1.062Q12.375 2 13 2t1.063.438Q14.5 2.875 14.5 3.5v.675q2 .525 3.25 2.137Q19 7.925 19 10v7h2v2H5zm7 3q-.825 0-1.413-.587Q10 20.825 10 20h4q0 .825-.588 1.413Q12.825 22 12 22z" />
            </svg>
            <p className="font-manrope text-sm font-semibold text-[#505f76]">Sin alertas por ahora</p>
            <p className="font-inter text-xs text-slate-400">
              Te avisaremos cuando el motor encuentre una coincidencia con tus reportes.
            </p>
          </div>
        ) : (
          notificaciones.map((n, i) => (
            <NotificacionCard key={`${n.id_reporte_encontrado}-${i}`} notificacion={n} />
          ))
        )}

      </div>
    </div>
  )
}
