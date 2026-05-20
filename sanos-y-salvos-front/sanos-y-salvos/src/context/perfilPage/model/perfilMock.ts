import type { ApiUsuario, ReporteResumen } from './perfilTypes'
import { mapApiUsuarioToPerfil } from './perfilTypes'

// Simula la respuesta real del API
const apiMock: ApiUsuario = {
  id: 'dd6efccc-eaa3-4c18-a50e-17e900b23ac9',
  name: 'Maria',
  lastName: 'Lopez',
  clinicaName: null,
  refugioName: null,
  address: null,
  adress: null,
  phone: 922222222,
  role: 'PERSONA',
  userType: 'persona',
}

// Email viene del token de Supabase (user_metadata.email)
export const perfilMock = mapApiUsuarioToPerfil(apiMock, 'maria@ejemplo.cl')

export const reportesDelUsuarioMock: ReporteResumen[] = [
  {
    id: 101,
    nombreMascota: 'Luna',
    tipoMascota: 'Perro',
    tipoReporte: 'PERDIDO',
    estado: 'ACTIVO',
    direccion: 'Av. Los Libertadores 7200, Cerrillos',
  },
  {
    id: 102,
    nombreMascota: 'Max',
    tipoMascota: 'Gato',
    tipoReporte: 'VISTO',
    estado: 'RESUELTO',
    direccion: 'Calle 5 Norte 320, Maipú',
  },
]
