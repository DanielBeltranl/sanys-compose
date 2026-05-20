import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L, { type LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Reporte } from '../../model/reporteTypes';
import { parseCoordenadas } from '../../model/geoUtils';
import type { UserLocation } from '../../controller/useDashboardController';

delete (L.Icon.Default as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const PIN_SIZE = 34;

const perdidoIcon = L.divIcon({
  html: `<div style="
    width:${PIN_SIZE}px;height:${PIN_SIZE}px;
    border-radius:50% 50% 50% 0;
    transform:rotate(-45deg);
    background:#ef4444;
    border:3px solid #fff;
    box-shadow:0 2px 8px rgba(0,0,0,0.35);
  "></div>`,
  className: '',
  iconSize: [PIN_SIZE, PIN_SIZE],
  iconAnchor: [PIN_SIZE / 2, PIN_SIZE],
  popupAnchor: [0, -PIN_SIZE],
});

const avistadoIcon = L.divIcon({
  html: `<div style="
    width:${PIN_SIZE}px;height:${PIN_SIZE}px;
    border-radius:50% 50% 50% 0;
    transform:rotate(-45deg);
    background:#0f52ba;
    border:3px solid #fff;
    box-shadow:0 2px 8px rgba(0,0,0,0.35);
  "></div>`,
  className: '',
  iconSize: [PIN_SIZE, PIN_SIZE],
  iconAnchor: [PIN_SIZE / 2, PIN_SIZE],
  popupAnchor: [0, -PIN_SIZE],
});

const userIcon = L.divIcon({
  html: `<div style="
    width:18px;height:18px;
    border-radius:50%;
    background:#0f52ba;
    border:3px solid #fff;
    box-shadow:0 0 0 4px rgba(15,82,186,0.25);
  "></div>`,
  className: '',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
  popupAnchor: [0, -12],
});

function MapCenterer({ center }: { center: LatLngExpression }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

interface MapaReportesProps {
  reportes: Reporte[];
  userLocation: UserLocation;
}

const TAMANO_LABEL: Record<Reporte['tamano'], string> = {
  PEQUENO: 'Pequeño',
  MEDIANO: 'Mediano',
  GRANDE: 'Grande',
};

export function MapaReportes({ reportes, userLocation }: MapaReportesProps) {
  const center: LatLngExpression = [userLocation.lat, userLocation.lng];
  const navigate = useNavigate();

  return (
    <MapContainer
      center={center}
      zoom={15}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />

      <MapCenterer center={center} />

      <Marker position={center} icon={userIcon}>
        <Popup>
          <span className="font-semibold text-[#0f52ba]">Tu ubicación</span>
        </Popup>
      </Marker>

      {reportes.map(reporte => {
        const coords = parseCoordenadas(reporte.coordenadas);
        if (!coords) return null;
        const icon = reporte.tipoReporte === 'PERDIDO' ? perdidoIcon : avistadoIcon;

        return (
          <Marker key={reporte.id} position={[coords.lat, coords.lng]} icon={icon}>
            <Popup maxWidth={260}>
              <div className="font-inter text-sm space-y-1 min-w-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      reporte.tipoReporte === 'PERDIDO'
                        ? 'bg-red-100 text-red-600'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {reporte.tipoReporte === 'PERDIDO' ? 'Mascota Perdida' : 'Mascota Avistada'}
                  </span>
                </div>
                {reporte.fotoMascota && (
                  <img
                    src={reporte.fotoMascota}
                    alt={reporte.nombreMascota}
                    className="w-full h-28 object-cover rounded-lg mb-2"
                  />
                )}
                <p className="font-semibold text-[#191c1e] text-base">{reporte.nombreMascota}</p>
                <p className="text-[#505f76]">
                  {reporte.tipoMascota} · {reporte.raza}
                </p>
                <p className="text-[#505f76]">
                  {reporte.sexo === 'MACHO' ? 'Macho' : 'Hembra'} · {TAMANO_LABEL[reporte.tamano]} · {reporte.color}
                </p>
                <p className="text-[#505f76] text-xs leading-snug mt-1">{reporte.descripcion}</p>
                <p className="text-[#505f76] text-xs mt-1 italic">{reporte.direccion}</p>
                <button
                  onClick={() => navigate(`/reportes/${reporte.id}`)}
                  className="mt-2 w-full py-1.5 rounded-lg bg-[#0f52ba] text-white text-xs font-semibold font-manrope hover:bg-blue-700 active:scale-95 transition-all"
                >
                  Ver detalle →
                </button>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
