import { useState } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import type { LoginForm } from '../../model/loginSchema'

interface Props {
  form: UseFormReturn<LoginForm>
  onSubmit: (e: React.FormEvent) => void
  serverError: string | null
  isSubmitting: boolean
  onGoToRegister: () => void
}

export const LoginFormComponent = ({
  form,
  onSubmit,
  serverError,
  isSubmitting,
  onGoToRegister,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false)
  const { register, formState: { errors } } = form

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label className="font-inter text-sm font-medium text-[#191c1e]">
          Correo electrónico
        </label>
        <input
          {...register('email')}
          type="email"
          placeholder="tucorreo@ejemplo.com"
          autoComplete="email"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-[#191c1e] font-inter text-sm outline-none transition-all focus:border-[#0f52ba] focus:ring-2 focus:ring-[#0f52ba]/20 placeholder:text-slate-400"
        />
        {errors.email && (
          <span className="font-inter text-xs text-red-500">{errors.email.message}</span>
        )}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1.5">
        <label className="font-inter text-sm font-medium text-[#191c1e]">
          Contraseña
        </label>
        <div className="relative">
          <input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            autoComplete="current-password"
            className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-200 bg-white text-[#191c1e] font-inter text-sm outline-none transition-all focus:border-[#0f52ba] focus:ring-2 focus:ring-[#0f52ba]/20 placeholder:text-slate-400"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0f52ba] transition-colors"
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            {showPassword ? (
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.804 11.804 0 0 0 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
              </svg>
            )}
          </button>
        </div>
        {errors.password && (
          <span className="font-inter text-xs text-red-500">{errors.password.message}</span>
        )}
      </div>

      {/* Server error */}
      {serverError && (
        <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200">
          <p className="font-inter text-sm text-red-600">{serverError}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 rounded-xl bg-[#0f52ba] text-white font-manrope font-semibold text-base transition-all hover:bg-[#0d47a1] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Ingresando...' : 'Iniciar sesión'}
      </button>

      {/* Register link */}
      <p className="font-inter text-sm text-center text-[#505f76]">
        ¿No tienes una cuenta?{' '}
        <button
          type="button"
          onClick={onGoToRegister}
          className="text-[#0f52ba] font-semibold hover:underline"
        >
          Regístrate
        </button>
      </p>
    </form>
  )
}
