import { useState } from 'react'
import { useNavigate } from 'react-router'
import type { ReporteCreateForm } from '../model/reporteCreateSchema'
import { crearReporte } from '../model/reporteCreateApi'
import { tokenManager } from '../../../services/tokenManager'

export function useCrearReporteController() {
  const navigate = useNavigate()
  const [success, setSuccess] = useState(false)

  const goBack = () => navigate('/dashboard')

  const onSubmit = async (data: ReporteCreateForm, coordenadas: string | null) => {
    const decoded = tokenManager.decode() as { sub: string } | null
    const idUsuario = decoded?.sub ?? ''

    await crearReporte({
      idUsuario,
      fotoMascota: data.fotoMascota ?? '',
      tipoReporte: data.tipoReporte,
      tipoMascota: data.tipoMascota,
      nombreMascota: data.nombreMascota,
      color: data.color,
      tamano: data.tamano,
      raza: data.raza,
      descripcion: data.descripcion,
      direccion: data.direccion,
      sexo: data.sexo,
      ...(coordenadas && { coordenadas }),
    })

    setSuccess(true)
    setTimeout(() => navigate('/dashboard'), 2200)
  }

  return { onSubmit, goBack, success }
}
