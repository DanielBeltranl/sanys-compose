import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { reporteCreateSchema, type ReporteCreateForm } from '../../model/reporteCreateSchema'
import { TIPO_REPORTE_OPTIONS, TIPO_MASCOTA_OPTIONS, TAMANO_OPTIONS, SEXO_OPTIONS } from '../../model/reporteOptions'
import { FormField, inputClassName } from '../../../commons/components/formField/FormField'
import { SelectField } from './SelectField'
import { PhotoDropZone } from './PhotoDropZone'
import { MapaPinSelector } from './MapaPinSelector'

interface Props {
  onSubmit: (data: ReporteCreateForm, coordenadas: string | null) => Promise<void>
}

export const CrearReporteForm = ({ onSubmit }: Props) => {
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [coordenadas, setCoordenadas] = useState<{ lat: number; lng: number } | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ReporteCreateForm>({
    resolver: zodResolver(reporteCreateSchema),
    defaultValues: { tipoReporte: '' as 'PERDIDO', tipoMascota: '' as 'PERRO', tamano: '' as 'PEQUENO', sexo: '' as 'MACHO' },
  })

  return (
    <form
      onSubmit={handleSubmit((data) => {
        const coords = coordenadas ? `${coordenadas.lat}, ${coordenadas.lng}` : null
        return onSubmit(data, coords)
      })}
      className="flex flex-col gap-5"
      noValidate
    >

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <SelectField
          label="Tipo de reporte"
          options={TIPO_REPORTE_OPTIONS}
          placeholder="Selecciona..."
          error={errors.tipoReporte?.message}
          {...register('tipoReporte')}
        />
        <SelectField
          label="Tipo de mascota"
          options={TIPO_MASCOTA_OPTIONS}
          placeholder="Selecciona..."
          error={errors.tipoMascota?.message}
          {...register('tipoMascota')}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Nombre de la mascota" error={errors.nombreMascota?.message}>
          <input
            {...register('nombreMascota')}
            placeholder="Ej: Luna, Max, Desconocido"
            className={inputClassName}
          />
        </FormField>
        <FormField label="Raza" error={errors.raza?.message}>
          <input
            {...register('raza')}
            placeholder="Ej: Labrador, Mestizo, Persa"
            className={inputClassName}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Color" error={errors.color?.message}>
          <input
            {...register('color')}
            placeholder="Ej: Negro con manchas blancas"
            className={inputClassName}
          />
        </FormField>
        <SelectField
          label="Tamaño"
          options={TAMANO_OPTIONS}
          placeholder="Selecciona..."
          error={errors.tamano?.message}
          {...register('tamano')}
        />
      </div>

      <SelectField
        label="Sexo"
        options={SEXO_OPTIONS}
        placeholder="Selecciona..."
        error={errors.sexo?.message}
        {...register('sexo')}
      />

      <FormField label="Dirección donde fue visto/perdido" error={errors.direccion?.message}>
        <input
          {...register('direccion')}
          placeholder="Ej: Av. Los Libertadores 7200, Cerrillos, Santiago"
          className={inputClassName}
        />
      </FormField>

      <MapaPinSelector onConfirm={(lat, lng) => setCoordenadas({ lat, lng })} />

      <FormField label="Descripción" error={errors.descripcion?.message}>
        <textarea
          {...register('descripcion')}
          rows={3}
          placeholder="Describe características distintivas, collar, comportamiento, contexto de la desaparición..."
          className={`${inputClassName} resize-none`}
        />
      </FormField>

      <PhotoDropZone
        onFileChange={setPhotoFile}
        onUploadComplete={(url) => setValue('fotoMascota', url)}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-2 py-3.5 px-6 rounded-xl bg-[#0f52ba] hover:bg-[#0d46a0] active:scale-[0.98] text-white font-semibold font-manrope text-sm transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Enviando...
          </>
        ) : (
          'Publicar reporte'
        )}
      </button>

    </form>
  )
}
