import { z } from 'zod'

const commonSchema = z.object({
  email: z.string().email({ message: 'Correo electrónico inválido' }),
  password: z.string().min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
  phone: z.string().min(9, { message: 'Teléfono inválido' }),
})

export const personaSchema = commonSchema.extend({
  userType: z.literal('persona'),
  name: z.string().min(2, { message: 'El nombre es requerido' }),
  lastName: z.string().min(2, { message: 'El apellido es requerido' }),
})

export const clinicaSchema = commonSchema.extend({
  userType: z.literal('clinica'),
  clinicaName: z.string().min(2, { message: 'El nombre de la clínica es requerido' }),
  address: z.string().min(5, { message: 'La dirección es requerida' }),
})

export const refugioSchema = commonSchema.extend({
  userType: z.literal('refugio'),
  refugioName: z.string().min(2, { message: 'El nombre del refugio es requerido' }),
  adress: z.string().min(5, { message: 'La dirección es requerida' }),
})

export type PersonaForm = z.infer<typeof personaSchema>
export type ClinicaForm = z.infer<typeof clinicaSchema>
export type RefugioForm = z.infer<typeof refugioSchema>
