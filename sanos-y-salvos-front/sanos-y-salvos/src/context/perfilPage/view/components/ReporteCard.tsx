import { useNavigate } from 'react-router'
import type { ReporteResumen } from '../../model/perfilTypes'

const TIPO_STYLES = {
  PERDIDO: 'bg-red-50 text-red-600',
  VISTO: 'bg-blue-50 text-[#0f52ba]',
}

const ESTADO_STYLES = {
  ACTIVO: 'bg-green-50 text-green-700',
  INACTIVO: 'bg-amber-50 text-amber-700',
  RESUELTO: 'bg-slate-100 text-slate-500',
}

const TIPO_LABELS = { PERDIDO: 'Perdido', VISTO: 'Avistado' }
const ESTADO_LABELS = { ACTIVO: 'Activo', INACTIVO: 'Inactivo', RESUELTO: 'Resuelto' }

interface Props {
  reporte: ReporteResumen
}

export function ReporteCard({ reporte }: Props) {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(`/reportes/${reporte.id}`)}
      className="bg-white border border-slate-100 rounded-2xl shadow-sm p-4 flex items-start gap-4 w-full text-left active:scale-[0.98] transition-transform"
    >
      <div className="w-12 h-12 rounded-xl bg-[#f0f4ff] flex items-center justify-center shrink-0 overflow-hidden">
        {reporte.fotoMascota ? (
          <img src={reporte.fotoMascota} alt={reporte.nombreMascota} className="w-full h-full object-cover" />
        ) : (
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#0f52ba]">
            <path d="M4.5 11.5q-.625 0-1.062-.438Q3 10.625 3 10V7q0-.625.438-1.062Q3.875 5.5 4.5 5.5t1.063.438Q6 6.375 6 7v3q0 .625-.437 1.062Q5.125 11.5 4.5 11.5zm5 3q-.625 0-1.062-.438Q8 13.625 8 13v-2q0-.625.438-1.062Q8.875 9.5 9.5 9.5t1.063.438Q11 10.375 11 11v2q0 .625-.437 1.062Q10.125 14.5 9.5 14.5zm5 0q-.625 0-1.062-.438Q13 13.625 13 13v-2q0-.625.438-1.062Q13.875 9.5 14.5 9.5t1.063.438Q16 10.375 16 11v2q0 .625-.437 1.062Q15.125 14.5 14.5 14.5zm5-3q-.625 0-1.062-.438Q18 10.625 18 10V7q0-.625.438-1.062Q18.875 5.5 19.5 5.5t1.063.438Q21 6.375 21 7v3q0 .625-.437 1.062Q20.125 11.5 19.5 11.5zM6 20q-.825 0-1.412-.588Q4 18.825 4 18q0-.75.45-1.375T5.6 15.7l2.15-1.05q-.4-.55-.575-1.188Q7 12.825 7 12.15V11h10v1.15q0 .675-.175 1.312-.175.638-.575 1.188l2.15 1.05q.7.35 1.15.975Q20 17.25 20 18q0 .825-.587 1.412Q18.825 20 18 20H6z" />
          </svg>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <span className="font-manrope font-bold text-sm text-[#191c1e] truncate">{reporte.nombreMascota}</span>
          <span className="text-xs font-inter text-[#505f76]">{reporte.tipoMascota}</span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className={`text-[10px] font-semibold font-manrope px-2 py-0.5 rounded-full ${TIPO_STYLES[reporte.tipoReporte]}`}>
            {TIPO_LABELS[reporte.tipoReporte]}
          </span>
          <span className={`text-[10px] font-semibold font-manrope px-2 py-0.5 rounded-full ${ESTADO_STYLES[reporte.estado]}`}>
            {ESTADO_LABELS[reporte.estado]}
          </span>
        </div>

        <p className="text-xs font-inter text-[#505f76] truncate">{reporte.direccion}</p>
      </div>

      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-slate-300 shrink-0 self-center">
        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
      </svg>
    </button>
  )
}
