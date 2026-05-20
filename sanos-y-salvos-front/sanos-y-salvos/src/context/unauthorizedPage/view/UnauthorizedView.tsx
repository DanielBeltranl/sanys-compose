import { useUnauthorizedController } from '../controller/useUnauthorizedController'

export function UnauthorizedView() {
  const { segundos } = useUnauthorizedController()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f7ff] px-6 text-center">
      <div className="text-6xl mb-6">🔒</div>
      <h1 className="font-manrope text-2xl font-extrabold text-[#191c1e] mb-2">
        No tienes acceso a esta vista :(
      </h1>
      <p className="font-inter text-sm text-[#505f76]">
        Serás redirigido al login en{' '}
        <span className="font-bold text-[#0f52ba]">{segundos}</span> segundo{segundos !== 1 ? 's' : ''}...
      </p>
      <div className="mt-6 w-12 h-12 rounded-full border-4 border-[#0f52ba] border-t-transparent animate-spin" />
    </div>
  )
}
