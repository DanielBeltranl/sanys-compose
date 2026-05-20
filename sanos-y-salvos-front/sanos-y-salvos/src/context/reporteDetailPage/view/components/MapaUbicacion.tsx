import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

delete (L.Icon.Default as unknown as Record<string, unknown>)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const PIN_SIZE = 34

function makePin(color: string) {
  return L.divIcon({
    html: `<div style="
      width:${PIN_SIZE}px;height:${PIN_SIZE}px;
      border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);
      background:${color};
      border:3px solid #fff;
      box-shadow:0 2px 8px rgba(0,0,0,0.35);
    "></div>`,
    className: '',
    iconSize: [PIN_SIZE, PIN_SIZE],
    iconAnchor: [PIN_SIZE / 2, PIN_SIZE],
    popupAnchor: [0, -PIN_SIZE],
  })
}

const perdidoPin = makePin('#ef4444')
const avistadoPin = makePin('#0f52ba')

interface Props {
  lat: number
  lng: number
  tipoReporte: 'PERDIDO' | 'VISTO'
  nombreMascota: string
}

export function MapaUbicacion({ lat, lng, tipoReporte, nombreMascota }: Props) {
  const icon = tipoReporte === 'PERDIDO' ? perdidoPin : avistadoPin

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={16}
      style={{ height: '220px', width: '100%', borderRadius: '16px' }}
      scrollWheelZoom={false}
      zoomControl={false}
      dragging={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <Marker position={[lat, lng]} icon={icon}>
        <Popup>
          <span className="font-inter text-sm font-semibold text-[#191c1e]">{nombreMascota}</span>
        </Popup>
      </Marker>
    </MapContainer>
  )
}
