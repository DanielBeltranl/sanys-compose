import { useNavigate } from 'react-router'
import { useReporteDetailController } from '../controller/useReporteDetailController'
import { MapaUbicacion } from './components/MapaUbicacion'
import { parseCoordenadas } from '../../dashboardPage/model/geoUtils'
import type { Reporte } from '../../dashboardPage/model/reporteTypes'

const TAMANO_LABEL: Record<Reporte['tamano'], string> = {
  PEQUENO: 'Pequeño',
  MEDIANO: 'Mediano',
  GRANDE: 'Grande',
}

const TIPO_CONFIG = {
  PERDIDO: { label: 'Mascota perdida', class: 'bg-red-500 text-white' },
  VISTO: { label: 'Mascota avistada', class: 'bg-[#0f52ba] text-white' },
}

const ESTADO_CONFIG = {
  ACTIVO: { label: 'Activo', class: 'bg-green-50 text-green-700' },
  INACTIVO: { label: 'Inactivo', class: 'bg-amber-50 text-amber-700' },
  RESUELTO: { label: 'Resuelto', class: 'bg-slate-100 text-slate-500' },
}

function InfoChip({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2">
      <span className="text-base">{icon}</span>
      <span className="text-sm font-inter text-[#505f76]">{text}</span>
    </div>
  )
}

export function ReporteDetailView() {
  const navigate = useNavigate()
  const { reporte, cargando, noEncontrado } = useReporteDetailController()

  if (cargando) {
    return (
      <div className="h-dvh flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-[#0f52ba] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (noEncontrado || !reporte) {
    return (
      <div className="h-dvh flex flex-col items-center justify-center gap-4 bg-slate-50 px-6 text-center">
        <svg viewBox="0 0 24 24" className="w-16 h-16 fill-slate-200">
          <path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm1-5C6.47 2 2 6.5 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm0 18a8 8 0 0 1-8-8 8 8 0 0 1 8-8 8 8 0 0 1 8 8 8 8 0 0 1-8 8z" />
        </svg>
        <p className="font-manrope text-lg font-bold text-[#191c1e]">Reporte no encontrado</p>
        <button
          onClick={() => navigate(-1)}
          className="text-sm font-semibold font-manrope text-[#0f52ba] hover:underline"
        >
          Volver
        </button>
      </div>
    )
  }

  const coords = parseCoordenadas(reporte.coordenadas)
  const tipo = TIPO_CONFIG[reporte.tipoReporte] ?? { label: reporte.tipoReporte, class: 'bg-slate-200 text-slate-700' }
  const estado = ESTADO_CONFIG[reporte.estado] ?? { label: reporte.estado, class: 'bg-slate-100 text-slate-500' }

  return (
    <div className="min-h-dvh bg-slate-50 flex flex-col">

      {/* Header sticky */}
      <header className="sticky top-0 z-50 h-14 flex items-center px-4 bg-white border-b border-slate-100 shadow-sm shadow-blue-900/5 shrink-0">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#0f52ba] font-semibold font-manrope text-sm active:opacity-60 transition-opacity"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          Volver
        </button>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-lg mx-auto pb-10">

          {/* Foto hero */}
          <div className="relative w-full h-64 sm:h-80 bg-slate-200 overflow-hidden">
            {reporte.fotoMascota ? (
              <img
                src={reporte.fotoMascota}
                alt={reporte.nombreMascota}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-20 h-20 fill-slate-300">
                  <path d="M4.5 11.5q-.625 0-1.062-.438Q3 10.625 3 10V7q0-.625.438-1.062Q3.875 5.5 4.5 5.5t1.063.438Q6 6.375 6 7v3q0 .625-.437 1.062Q5.125 11.5 4.5 11.5zm5 3q-.625 0-1.062-.438Q8 13.625 8 13v-2q0-.625.438-1.062Q8.875 9.5 9.5 9.5t1.063.438Q11 10.375 11 11v2q0 .625-.437 1.062Q10.125 14.5 9.5 14.5zm5 0q-.625 0-1.062-.438Q13 13.625 13 13v-2q0-.625.438-1.062Q13.875 9.5 14.5 9.5t1.063.438Q16 10.375 16 11v2q0 .625-.437 1.062Q15.125 14.5 14.5 14.5zm5-3q-.625 0-1.062-.438Q18 10.625 18 10V7q0-.625.438-1.062Q18.875 5.5 19.5 5.5t1.063.438Q21 6.375 21 7v3q0 .625-.437 1.062Q20.125 11.5 19.5 11.5zM6 20q-.825 0-1.412-.588Q4 18.825 4 18q0-.75.45-1.375T5.6 15.7l2.15-1.05q-.4-.55-.575-1.188Q7 12.825 7 12.15V11h10v1.15q0 .675-.175 1.312-.175.638-.575 1.188l2.15 1.05q.7.35 1.15.975Q20 17.25 20 18q0 .825-.587 1.412Q18.825 20 18 20H6z" />
                </svg>
              </div>
            )}

            {/* Badge tipo sobre la foto */}
            <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold font-manrope shadow ${tipo.class}`}>
              {tipo.label}
            </span>
          </div>

          {/* Contenido */}
          <div className="px-4 flex flex-col gap-5 mt-5">

            {/* Nombre + estado */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <h1 className="font-manrope text-2xl font-extrabold text-[#191c1e] tracking-tight">
                  {reporte.nombreMascota}
                </h1>
                <p className="font-inter text-sm text-[#505f76] mt-0.5">
                  {reporte.tipoMascota} · {reporte.raza}
                </p>
              </div>
              <span className={`mt-1 shrink-0 px-3 py-1 rounded-full text-xs font-semibold font-manrope ${estado.class}`}>
                {estado.label}
              </span>
            </div>

            {/* Chips de características */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              <InfoChip icon="⚥" text={reporte.sexo === 'MACHO' ? 'Macho' : 'Hembra'} />
              <InfoChip icon="📏" text={TAMANO_LABEL[reporte.tamano]} />
              <InfoChip icon="🎨" text={reporte.color} />
            </div>

            {/* Descripción */}
            <div className="flex flex-col gap-1.5">
              <h2 className="font-manrope text-xs font-bold text-[#505f76] uppercase tracking-widest">
                Descripción
              </h2>
              <p className="font-inter text-sm text-[#191c1e] leading-relaxed">
                {reporte.descripcion}
              </p>
            </div>

            {/* Dirección */}
            <div className="flex items-start gap-3 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#0f52ba] shrink-0 mt-0.5">
                <path d="M12 12q.825 0 1.413-.588Q14 10.825 14 10t-.587-1.413Q12.825 8 12 8q-.825 0-1.412.587Q10 9.175 10 10q0 .825.588 1.412Q11.175 12 12 12zm0 7.35q-3.65-3.15-5.325-5.838Q5 10.825 5 9q0-2.9 1.862-4.65Q8.725 2.6 12 2.6q3.275 0 5.138 1.75Q19 6.1 19 9q0 1.825-1.675 4.512Q15.65 16.2 12 19.35z" />
              </svg>
              <div>
                <p className="font-manrope text-xs font-bold text-[#505f76] uppercase tracking-wide mb-0.5">
                  Última ubicación
                </p>
                <p className="font-inter text-sm text-[#191c1e]">{reporte.direccion}</p>
              </div>
            </div>

            {/* Mapa */}
            {coords ? (
              <div className="flex flex-col gap-2">
                <h2 className="font-manrope text-xs font-bold text-[#505f76] uppercase tracking-widest px-1">
                  Mapa
                </h2>
                <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                  <MapaUbicacion
                    lat={coords.lat}
                    lng={coords.lng}
                    tipoReporte={reporte.tipoReporte}
                    nombreMascota={reporte.nombreMascota}
                  />
                </div>
              </div>
            ) : null}

          </div>
        </div>
      </div>
    </div>
  )
}
