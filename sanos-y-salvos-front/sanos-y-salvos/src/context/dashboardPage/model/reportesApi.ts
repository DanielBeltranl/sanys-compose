import { httpClient } from '../../../services/httpClient'
import type { Reporte } from './reporteTypes'

export async function fetchReportesCercanos(latitud: number, longitud: number): Promise<Reporte[]> {
  const { data } = await httpClient.post<Reporte[]>('/reportes', { latitud, longitud })
  return data
}
