import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useMapaPinSelector, type PinPosition } from './useMapaPinSelector'

const pinIcon = L.divIcon({
  html: `<div style="
    width:22px;height:22px;
    border-radius:50% 50% 50% 0;
    transform:rotate(-45deg);
    background:#0f52ba;
    border:3px solid #fff;
    box-shadow:0 2px 8px rgba(0,0,0,0.35);
  "></div>`,
  className: '',
  iconSize: [22, 22],
  iconAnchor: [11, 22],
})

const FlyToPosition = ({ position }: { position: PinPosition }) => {
  const map = useMap()
  useEffect(() => {
    map.flyTo([position.lat, position.lng], 15, { duration: 1.2 })
  }, [])
  return null
}

interface Props {
  onPinChange?: (lat: number, lng: number) => void
  onConfirm?: (lat: number, lng: number) => void
}

export const MapaPinSelector = ({ onPinChange, onConfirm }: Props) => {
  const { position, loading, error, confirmedPosition, handlePinDrag, handleConfirm } = useMapaPinSelector()

  if (loading) {
    return (
      <div className="flex items-center gap-2 h-48 rounded-xl border border-slate-200 bg-[#f0f4ff] justify-center">
        <span className="w-4 h-4 border-2 border-[#0f52ba] border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-[#505f76] font-inter">Obteniendo tu ubicación...</span>
      </div>
    )
  }

  if (error || !position) {
    return (
      <div className="flex items-center justify-center h-48 rounded-xl border border-slate-200 bg-slate-50">
        <p className="text-sm text-[#505f76] font-inter text-center px-4">{error ?? 'No se pudo cargar el mapa'}</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs text-[#505f76] font-inter">
        Mové el pin para ajustar la ubicación exacta
      </span>
      <div className="rounded-xl overflow-hidden border border-slate-200 h-48 z-0">
        <MapContainer
          center={[position.lat, position.lng]}
          zoom={15}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <FlyToPosition position={position} />
          <Marker
            position={[position.lat, position.lng]}
            icon={pinIcon}
            draggable
            eventHandlers={{
              dragend: (e) => {
                const { lat, lng } = (e.target as L.Marker).getLatLng()
                handlePinDrag(lat, lng)
                onPinChange?.(lat, lng)
              },

            }}
          />
        </MapContainer>
      </div>

      <button
        type="button"
        onClick={() => {
          handleConfirm()
          if (position) onConfirm?.(position.lat, position.lng)
        }}
        className="w-full py-2.5 rounded-xl text-sm font-semibold font-manrope text-white
          bg-[#0f52ba] hover:bg-[#0d46a0] active:bg-[#0a3d8f] active:scale-[0.98]
          transition-all duration-200 flex items-center justify-center gap-2"
      >
        {confirmedPosition ? (
          <>
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
            Dirección confirmada
          </>
        ) : (
          <>
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            Confirmar dirección
          </>
        )}
      </button>
    </div>
  )
}
