import './SuccessOverlay.css'

interface Props {
  visible: boolean
  countdown: number
}

export function SuccessOverlay({ visible, countdown }: Props) {
  if (!visible) return null

  return (
    <div className="success-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6">
      <div className="success-card bg-white rounded-3xl shadow-xl p-16 flex flex-col items-center gap-8 max-w-sm w-full text-center">
        <div className="w-40 h-40 rounded-full bg-[#f0f4ff] flex items-center justify-center">
          <svg viewBox="0 0 40 40" className="w-24 h-24" fill="none">
            <circle cx="20" cy="20" r="18" stroke="#0f52ba" strokeWidth="2.5" opacity="0.2" />
            <polyline
              className="success-check"
              points="11,21 17,27 29,14"
              stroke="#0f52ba"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>
        <div className="success-text flex flex-col gap-2">
          <h2 className="font-manrope text-3xl font-extrabold text-[#191c1e]">¡Cuenta creada!</h2>
          <p className="font-inter text-base text-[#505f76]">Ahora inicia tu sesión.</p>
          <p className="font-inter text-sm text-slate-400 mt-1">
            Redirigiendo en <span className="font-bold text-[#0f52ba]">{countdown}</span> seg...
          </p>
        </div>
      </div>
    </div>
  )
}
