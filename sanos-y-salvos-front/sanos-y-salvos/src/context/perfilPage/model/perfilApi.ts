import { httpClient } from '../../../services/httpClient'
import type { ApiUsuario, ApiUsuarioResponse, ReporteResumen } from './perfilTypes'

export async function fetchUsuarioById(id: string): Promise<ApiUsuario> {
  const { data } = await httpClient.get<ApiUsuarioResponse>(`/api/registro/${id}`)
  return data.user
}

export async function fetchReportesByUsuario(idUsuario: string): Promise<ReporteResumen[]> {
  const { data } = await httpClient.get<ReporteResumen[]>(`/reportes`, {
    params: { idUsuario },
  })
  return data
}
