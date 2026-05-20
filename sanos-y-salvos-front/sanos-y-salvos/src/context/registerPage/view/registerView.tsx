import { useRegisterController } from '../controller/useRegisterController'
import { PersonaRegisterForm } from './components/PersonaRegisterForm'
import { ClinicaRegisterForm } from './components/ClinicaRegisterForm'
import { RefugioRegisterForm } from './components/RefugioRegisterForm'
import { SuccessOverlay } from './components/SuccessOverlay'
import type { PersonaForm, ClinicaForm, RefugioForm } from '../model/registerSchemas'

const ROLE_CONFIG = {
  persona: {
    label: 'Persona',
    subtitle: 'Usuario individual',
    svgPath: 'M12 12q-1.65 0-2.825-1.175Q8 9.65 8 8q0-1.65 1.175-2.825Q10.35 4 12 4q1.65 0 2.825 1.175Q16 6.35 16 8q0 1.65-1.175 2.825Q13.65 12 12 12zm0 2q2.725 0 4.362 1.3q1.638 1.3 1.638 3.7V20H6v-1q0-2.4 1.638-3.7Q9.275 14 12 14z',
  },
  clinica: {
    label: 'Clínica',
    subtitle: 'Centro médico veterinario',
    svgPath: 'M7 15h3v3h4v-3h3v-4h-3V8h-4v3H7v4zm-2 4q-.825 0-1.412-.587Q3 17.825 3 17V7q0-.825.588-1.412Q4.175 5 5 5h4V3h6v2h4q.825 0 1.413.588Q21 6.175 21 7v10q0 .825-.587 1.413Q19.825 19 19 19H5zm0-2h14V7H5v10zm0 0V7v10z',
  },
  refugio: {
    label: 'Refugio',
    subtitle: 'Espacio de acogida',
    svgPath: 'M6 19h3v-6h6v6h3v-9l-6-4.5L6 10v9zm-2 2V9l8-6 8 6v12h-7v-6h-2v6H4zm8-8.75z',
  },
}

export const RegisterView = () => {
  const { userType, onSubmit, goBack, success, countdown } = useRegisterController()
  const config = ROLE_CONFIG[userType]

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#f8fafc] flex flex-col items-center justify-start py-8 px-4 sm:px-6">
      <SuccessOverlay visible={success} countdown={countdown} />
      <div className="w-full max-w-lg">

        <button
          onClick={goBack}
          className="flex items-center gap-2 text-[#505f76] hover:text-[#0f52ba] font-inter text-sm font-medium transition-colors mb-6 group"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current transition-transform group-hover:-translate-x-0.5">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          Volver a selección de rol
        </button>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm shadow-blue-900/5 p-6 sm:p-8">

          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
            <div className="w-14 h-14 rounded-full bg-[#f0f4ff] flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-7 h-7 fill-[#0f52ba]" xmlns="http://www.w3.org/2000/svg">
                <path d={config.svgPath} />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-[#191c1e] font-manrope leading-tight">
                Crear cuenta
              </h1>
              <p className="text-[#505f76] font-inter text-sm mt-0.5">
                {config.label} · {config.subtitle}
              </p>
            </div>
          </div>

          {userType === 'persona' && (
            <PersonaRegisterForm onSubmit={onSubmit as (data: PersonaForm) => void} />
          )}
          {userType === 'clinica' && (
            <ClinicaRegisterForm onSubmit={onSubmit as (data: ClinicaForm) => void} />
          )}
          {userType === 'refugio' && (
            <RefugioRegisterForm onSubmit={onSubmit as (data: RefugioForm) => void} />
          )}
        </div>

        <p className="text-center mt-6 text-sm text-[#505f76] font-inter">
          ¿Ya tienes una cuenta?{' '}
          <button className="text-[#0f52ba] font-semibold hover:underline transition-colors">
            Inicia sesión
          </button>
        </p>

      </div>
    </div>
  )
}
