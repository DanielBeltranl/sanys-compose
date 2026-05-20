import { httpClient } from '../../../services/httpClient'
import type { Reporte } from '../../dashboardPage/model/reporteTypes'

export async function fetchReporteById(id: string): Promise<Reporte> {
  const { data } = await httpClient.get<Reporte>(`/reportes/${id}`)
  return data
}
