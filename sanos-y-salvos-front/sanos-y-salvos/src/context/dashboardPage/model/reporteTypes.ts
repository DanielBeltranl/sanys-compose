export interface Reporte {
  id: string;
  idUsuario: string;
  nombreMascota: string;
  tipoMascota: string;
  raza: string;
  sexo: 'MACHO' | 'HEMBRA';
  tamano: 'PEQUENO' | 'MEDIANO' | 'GRANDE';
  color: string;
  descripcion: string;
  fotoMascota: string;
  direccion: string;
  coordenadas: string;
  estado: 'ACTIVO' | 'INACTIVO' | 'RESUELTO';
  tipoReporte: 'PERDIDO' | 'VISTO';
}
