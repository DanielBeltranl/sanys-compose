const TOKEN_KEY = 'access_token'

export type AuthUser = {
  email: string
  role: string
  phone: string
  userType: string
}

function decodeJwt<T = Record<string, unknown>>(token: string): T | null {
  try {
    const payload = token.split('.')[1]
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
    return JSON.parse(decoded) as T
  } catch {
    return null
  }
}

function isTokenExpired(token: string): boolean {
  const payload = decodeJwt<{ exp: number }>(token)
  if (!payload?.exp) return true
  return Date.now() >= payload.exp * 1000
}

export const tokenManager = {
  set(token: string): void {
    localStorage.setItem(TOKEN_KEY, token)
  },

  get(): string | null {
    return localStorage.getItem(TOKEN_KEY)
  },

  clear(): void {
    localStorage.removeItem(TOKEN_KEY)
  },

  isValid(): boolean {
    const token = this.get()
    if (!token) return false
    return !isTokenExpired(token)
  },

  decode(): Record<string, unknown> | null {
    const token = this.get()
    if (!token) return null
    return decodeJwt(token)
  },

  getUserId(): string | null {
    const payload = this.decode()
    if (!payload?.sub) return null
    return payload.sub as string
  },
}
