import { useLoginController } from '../controller/useLoginController'
import { LoginFormComponent } from './components/LoginForm'

export const LoginView = () => {
  const { form, onSubmit, serverError, isSubmitting, goToRegister } = useLoginController()

  return (
    <div className="min-h-screen bg-[#f8faff] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#f0f4ff] mb-4">
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-[#0f52ba]" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4c1.86 0 3.41 1.28 3.86 3H8.14C8.59 6.28 10.14 5 12 5zm0 13c-2.67 0-5-1.43-6.28-3.55.62-.88 3.28-1.95 6.28-1.95s5.66 1.07 6.28 1.95C17 17.57 14.67 19 12 19zm0-6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
            </svg>
          </div>
          <h1 className="font-manrope text-3xl font-bold text-[#191c1e]">Bienvenido</h1>
          <p className="font-inter text-sm text-[#505f76] mt-2">
            Ingresa a tu cuenta para continuar
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <LoginFormComponent
            form={form}
            onSubmit={onSubmit}
            serverError={serverError}
            isSubmitting={isSubmitting}
            onGoToRegister={goToRegister}
          />
        </div>
      </div>
    </div>
  )
}
