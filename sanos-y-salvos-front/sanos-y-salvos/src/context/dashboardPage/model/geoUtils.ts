export function parseCoordenadas(coordStr: string): { lat: number; lng: number } | null {
  const parts = coordStr.split(',').map(s => parseFloat(s.trim()));
  if (parts.length !== 2 || parts.some(isNaN)) return null;
  return { lat: parts[0], lng: parts[1] };
}

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function filtrarReportesCercanos<T extends { coordenadas: string }>(
  reportes: T[],
  userLat: number,
  userLng: number,
  radioKm = 1
): T[] {
  return reportes.filter(r => {
    const coords = parseCoordenadas(r.coordenadas);
    if (!coords) return false;
    return haversineKm(userLat, userLng, coords.lat, coords.lng) <= radioKm;
  });
}
