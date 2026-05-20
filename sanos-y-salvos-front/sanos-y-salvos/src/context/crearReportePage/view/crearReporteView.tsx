import { useCrearReporteController } from '../controller/useCrearReporteController'
import { CrearReporteForm } from './components/CrearReporteForm'
import { SuccessOverlay } from './components/SuccessOverlay'

export function CrearReporteView() {
  const { onSubmit, goBack, success } = useCrearReporteController()

  return (
    <div className="min-h-dvh bg-[#f8fafc] flex flex-col">

      <header className="sticky top-0 z-50 h-16 flex items-center px-5 bg-white border-b border-slate-100 shadow-sm shadow-blue-900/5 font-manrope shrink-0">
        <button
          onClick={goBack}
          className="flex items-center gap-2 text-[#505f76] hover:text-[#0f52ba] font-inter text-sm font-medium transition-colors group mr-4"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current transition-transform group-hover:-translate-x-0.5">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
        </button>
        <span className="text-lg font-extrabold tracking-tight text-[#191c1e]">
          Nuevo reporte
        </span>
      </header>

      <div className="flex-1 flex flex-col items-center py-8 px-4 sm:px-6">
        <div className="w-full max-w-lg">

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm shadow-blue-900/5 p-6 sm:p-8">

            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
              <div className="w-14 h-14 rounded-full bg-[#f0f4ff] flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" className="w-7 h-7 fill-[#0f52ba]">
                  <path d="M12 12q.825 0 1.413-.588Q14 10.825 14 10t-.587-1.413Q12.825 8 12 8q-.825 0-1.412.587Q10 9.175 10 10q0 .825.588 1.412Q11.175 12 12 12zm0 7.35q-3.65-3.15-5.325-5.838Q5 10.825 5 9q0-2.9 1.862-4.65Q8.725 2.6 12 2.6q3.275 0 5.138 1.75Q19 6.1 19 9q0 1.825-1.675 4.512Q15.65 16.2 12 19.35z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-[#191c1e] font-manrope leading-tight">
                  Reportar mascota
                </h1>
                <p className="text-[#505f76] font-inter text-sm mt-0.5">
                  Completa la información para publicar el aviso
                </p>
              </div>
            </div>

            <CrearReporteForm onSubmit={onSubmit} />

          </div>
        </div>
      </div>

      {success && <SuccessOverlay />}
    </div>
  )
}
