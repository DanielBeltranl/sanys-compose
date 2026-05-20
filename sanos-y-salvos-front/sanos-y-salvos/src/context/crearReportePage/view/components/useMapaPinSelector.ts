import { useState, useEffect } from 'react'

export interface PinPosition {
  lat: number
  lng: number
}

interface MapaPinState {
  position: PinPosition | null
  loading: boolean
  error: string | null
}

export const useMapaPinSelector = () => {
  const [state, setState] = useState<MapaPinState>({
    position: null,
    loading: true,
    error: null,
  })
  const [confirmedPosition, setConfirmedPosition] = useState<PinPosition | null>(null)

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({ position: null, loading: false, error: 'Geolocalización no disponible' })
      return
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setState({ position: { lat: coords.latitude, lng: coords.longitude }, loading: false, error: null })
      },
      () => {
        setState({ position: null, loading: false, error: 'No se pudo obtener tu ubicación' })
      }
    )
  }, [])

  const handlePinDrag = (lat: number, lng: number) => {
    setState(prev => ({ ...prev, position: { lat, lng } }))
    setConfirmedPosition(null)
  }

  const handleConfirm = () => {
    if (state.position) setConfirmedPosition(state.position)
  }

  return {
    position: state.position,
    loading: state.loading,
    error: state.error,
    confirmedPosition,
    handlePinDrag,
    handleConfirm,
  }
}
