import { httpClient } from '../../../services/httpClient'
import type { AuthUser } from '../../../services/tokenManager'

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
  status: number
  accessToken: string
  expiresIn: number
  refreshToken: string
  user: AuthUser
}

export async function loginUser(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await httpClient.post<LoginResponse>('/api/login', payload)
  return data
}
