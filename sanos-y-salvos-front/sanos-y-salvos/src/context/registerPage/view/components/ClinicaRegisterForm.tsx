import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { clinicaSchema, type ClinicaForm } from '../../model/registerSchemas'
import { FormField, inputClassName } from '../../../commons/components/formField/FormField'
import { PasswordInput } from './PasswordInput'

interface Props {
  onSubmit: (data: ClinicaForm) => void
}

export const ClinicaRegisterForm = ({ onSubmit }: Props) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ClinicaForm>({
    resolver: zodResolver(clinicaSchema),
    defaultValues: { userType: 'clinica' },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      <FormField label="Nombre de la clínica" error={errors.clinicaName?.message}>
        <input {...register('clinicaName')} placeholder="Clínica Veterinaria San Pedro" className={inputClassName} />
      </FormField>

      <FormField label="Dirección" error={errors.address?.message}>
        <input {...register('address')} placeholder="Av. Providencia 1234, Santiago" className={inputClassName} />
      </FormField>

      <FormField label="Correo electrónico" error={errors.email?.message}>
        <input {...register('email')} type="email" placeholder="contacto@clinica.cl" className={inputClassName} />
      </FormField>

      <FormField label="Contraseña" error={errors.password?.message}>
        <PasswordInput {...register('password')} placeholder="Mínimo 8 caracteres" />
      </FormField>

      <FormField label="Teléfono" error={errors.phone?.message}>
        <input {...register('phone')} type="tel" placeholder="+56 2 2345 6789" className={inputClassName} />
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
