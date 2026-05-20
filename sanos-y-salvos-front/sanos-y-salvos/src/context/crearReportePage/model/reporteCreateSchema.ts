import { z } from 'zod'

export const reporteCreateSchema = z.object({
  tipoReporte: z.enum(['PERDIDO', 'VISTO'], { error: 'Selecciona el tipo de reporte' }),
  tipoMascota: z.enum(['PERRO', 'GATO', 'OTRO'], { error: 'Selecciona el tipo de mascota' }),
  nombreMascota: z.string().min(1, 'El nombre es requerido'),
  raza: z.string().min(1, 'La raza es requerida'),
  color: z.string().min(1, 'El color es requerido'),
  tamano: z.enum(['PEQUENO', 'MEDIANO', 'GRANDE'], { error: 'Selecciona el tamaño' }),
  sexo: z.enum(['MACHO', 'HEMBRA'], { error: 'Selecciona el sexo' }),
  descripcion: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  direccion: z.string().min(5, 'La dirección es requerida'),
  fotoMascota: z.string().url('Debe ser una URL válida de imagen').or(z.literal('')).optional(),
})

export type ReporteCreateForm = z.infer<typeof reporteCreateSchema>
