export function SuccessOverlay() {
  return (
    <div className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm animate-[fade-in_0.25s_ease-out]">
      <div className="flex flex-col items-center gap-5">

        <div className="relative w-28 h-28 flex items-center justify-center animate-[scale-in_0.4s_cubic-bezier(0.34,1.56,0.64,1)]">
          <div className="absolute inset-0 rounded-full bg-green-100" />
          <div className="absolute inset-0 rounded-full bg-green-200 animate-ping opacity-30" style={{ animationDuration: '1.4s' }} />
          <svg
            viewBox="0 0 52 52"
            className="w-14 h-14 relative z-10"
            fill="none"
            stroke="#22c55e"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="26" cy="26" r="24" className="opacity-0" />
            <path
              d="M14 26l9 9 15-17"
              className="[stroke-dasharray:40] [stroke-dashoffset:40] animate-[draw-check_0.45s_0.3s_ease-out_forwards]"
            />
          </svg>
        </div>

        <div className="text-center space-y-1.5">
          <h2 className="text-2xl font-extrabold text-[#191c1e] font-manrope animate-[fade-up_0.35s_0.5s_ease-out_both]">
            ¡Reporte publicado!
          </h2>
          <p className="text-sm text-[#505f76] font-inter animate-[fade-up_0.35s_0.65s_ease-out_both]">
            Volviendo al mapa...
          </p>
        </div>

        <div className="flex gap-1.5 mt-2 animate-[fade-up_0.35s_0.8s_ease-out_both]">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-[#0f52ba] animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>

      </div>
    </div>
  )
}
