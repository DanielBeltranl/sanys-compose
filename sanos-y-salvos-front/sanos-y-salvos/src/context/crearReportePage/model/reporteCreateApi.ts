import { httpClient } from '../../../services/httpClient'

export interface ReporteCreatePayload {
  idUsuario: string;
  tipoReporte: 'PERDIDO' | 'VISTO';
  tipoMascota: 'PERRO' | 'GATO' | 'OTRO';
  nombreMascota: string;
  color: string;
  tamano: 'PEQUENO' | 'MEDIANO' | 'GRANDE';
  raza: string;
  descripcion: string;
  direccion: string;
  sexo: 'MACHO' | 'HEMBRA';
  fotoMascota: string;
  coordenadas?: string;
}

export async function crearReporte(payload: ReporteCreatePayload): Promise<void> {
  await httpClient.post('/reportes/crear', payload)
}
