import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { personaSchema, type PersonaForm } from '../../model/registerSchemas'
import { FormField, inputClassName } from '../../../commons/components/formField/FormField'
import { PasswordInput } from './PasswordInput'

interface Props {
  onSubmit: (data: PersonaForm) => void
}

export const PersonaRegisterForm = ({ onSubmit }: Props) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<PersonaForm>({
    resolver: zodResolver(personaSchema),
    defaultValues: { userType: 'persona' },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Nombre" error={errors.name?.message}>
          <input {...register('name')} placeholder="Juan" className={inputClassName} />
        </FormField>
        <FormField label="Apellido" error={errors.lastName?.message}>
          <input {...register('lastName')} placeholder="Pérez" className={inputClassName} />
        </FormField>
      </div>

      <FormField label="Correo electrónico" error={errors.email?.message}>
        <input {...register('email')} type="email" placeholder="correo@ejemplo.com" className={inputClassName} />
      </FormField>

      <FormField label="Contraseña" error={errors.password?.message}>
        <PasswordInput {...register('password')} placeholder="Mínimo 8 caracteres" />
      </FormField>

      <FormField label="Teléfono" error={errors.phone?.message}>
        <input {...register('phone')} type="tel" placeholder="+56 9 1234 5678" className={inputClassName} />
      </FormField>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-2 py-3 px-6 rounded-xl bg-[#0f52ba] hover:bg-[#0d46a0] active:scale-[0.98] text-white font-semibold font-manrope text-sm transition-all duration-200 disabled:opacity-60"
      >
        Crear cuenta
      </button>
    </form>
  )
}
