export interface ApiUsuario {
  id: string
  name: string | null
  lastName: string | null
  clinicaName: string | null
  refugioName: string | null
  address: string | null
  adress: string | null  // typo del API — refugio usa esta key
  phone: number
  role: 'PERSONA' | 'INSTITUCION'
  userType: 'persona' | 'clinica' | 'refugio'
}

export interface ApiUsuarioResponse {
  status: number
  message: string
  error: string | null
  user: ApiUsuario
}

// Modelo normalizado para la vista
export interface PerfilUsuario {
  id: string
  nombre: string
  email: string  // viene del token de Supabase, no de este endpoint
  telefono: string
  rol: 'PERSONA' | 'INSTITUCION'
  userType: 'persona' | 'clinica' | 'refugio'
  direccion?: string
}

export interface ReporteResumen {
  id: number
  nombreMascota: string
  tipoMascota: string
  tipoReporte: 'PERDIDO' | 'VISTO'
  estado: 'ACTIVO' | 'INACTIVO' | 'RESUELTO'
  fotoMascota?: string
  direccion: string
}

export function mapApiUsuarioToPerfil(api: ApiUsuario, email: string): PerfilUsuario {
  const nombre =
    api.userType === 'persona'
      ? `${api.name ?? ''} ${api.lastName ?? ''}`.trim()
      : api.userType === 'clinica'
      ? (api.clinicaName ?? '')
      : (api.refugioName ?? '')

  return {
    id: api.id,
    nombre,
    email,
    telefono: String(api.phone),
    rol: api.role,
    userType: api.userType,
    direccion: api.address ?? api.adress ?? undefined,
  }
}
