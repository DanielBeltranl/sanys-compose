import axios from 'axios'
import { tokenManager } from './tokenManager'

const BASE_URL = import.meta.env.VITE_API_URL ?? '/bff/v1'

export const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

httpClient.interceptors.request.use((config) => {
  const token = tokenManager.get()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

httpClient.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      tokenManager.clear()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
