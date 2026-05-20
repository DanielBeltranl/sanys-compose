import { httpClient } from '../../../services/httpClient'
import type { PersonaForm, ClinicaForm, RefugioForm } from './registerSchemas'

export type RegisterPayload = PersonaForm | ClinicaForm | RefugioForm

export interface RegisterResponse {
  error: string | null
  message: string
  status: number
  token: string | null
}

export async function registerUser(payload: RegisterPayload): Promise<RegisterResponse> {
  const body = { ...payload, phone: Number(payload.phone) }
  const { data } = await httpClient.post<RegisterResponse>('/api/registro', body)
  return data
}
