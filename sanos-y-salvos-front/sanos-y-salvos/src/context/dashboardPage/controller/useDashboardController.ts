import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import type { Reporte } from '../model/reporteTypes';
import { fetchReportesCercanos } from '../model/reportesApi';
import { tokenManager } from '../../../services/tokenManager';
import type { NotificacionMatchDTO } from '../../notificacionesPage/model/notificacionTypes';
import { fetchNotificacionesPendientes } from '../../notificacionesPage/model/notificacionApi';
import { useNotificacionesWs } from '../../notificacionesPage/controller/useNotificacionesWs';

export interface UserLocation {
  lat: number;
  lng: number;
  accuracyMeters?: number;
}

const DEFAULT_LOCATION: UserLocation = { lat: -33.4489, lng: -70.6693 };

const MAX_READINGS = 6;
const MAX_WAIT_MS = 14000;
const ACCURACY_THRESHOLD_M = 80;

function getBestPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    const readings: GeolocationPosition[] = [];
    let watchId: number;
    let timeoutId: ReturnType<typeof setTimeout>;

    const finish = () => {
      clearTimeout(timeoutId);
      navigator.geolocation.clearWatch(watchId);
      if (readings.length === 0) {
        reject(new Error('Sin lecturas'));
        return;
      }
      resolve(readings.reduce((best, curr) =>
        curr.coords.accuracy < best.coords.accuracy ? curr : best
      ));
    };

    watchId = navigator.geolocation.watchPosition(
      pos => {
        readings.push(pos);
        if (pos.coords.accuracy <= ACCURACY_THRESHOLD_M) { finish(); return; }
        if (readings.length >= MAX_READINGS) finish();
      },
      err => {
        if (readings.length > 0) finish();
        else { clearTimeout(timeoutId); reject(err); }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );

    timeoutId = setTimeout(finish, MAX_WAIT_MS);
  });
}

export function useDashboardController() {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [reportesCercanos, setReportesCercanos] = useState<Reporte[]>([]);
  const [cargando, setCargando] = useState(true);
  const [locationStatus, setLocationStatus] = useState<'buscando' | 'ok' | 'fallback'>('buscando');
  const [accuracyMeters, setAccuracyMeters] = useState<number | null>(null);

  const [notificacionesList, setNotificacionesList] = useState<NotificacionMatchDTO[]>([]);
  const [cargandoNotifs, setCargandoNotifs] = useState(true);

  const userId = tokenManager.getUserId();

  useEffect(() => {
    if (!userId) { setCargandoNotifs(false); return; }
    fetchNotificacionesPendientes(userId).then(data => {
      setNotificacionesList(data);
      setCargandoNotifs(false);
    });
  }, [userId]);

  const onMensaje = useCallback((data: NotificacionMatchDTO) => {
    setNotificacionesList(prev => [data, ...prev]);
    toast.success(
      '🐾 ¡Encontramos un reporte que te podría servir! Revisa tus alertas.',
      { duration: 6000 }
    );
  }, []);

  useNotificacionesWs(userId, onMensaje);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationStatus('fallback');
      aplicarUbicacion(DEFAULT_LOCATION);
      return;
    }

    getBestPosition()
      .then(pos => {
        const loc: UserLocation = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracyMeters: Math.round(pos.coords.accuracy),
        };
        setAccuracyMeters(Math.round(pos.coords.accuracy));
        setLocationStatus('ok');
        aplicarUbicacion(loc);
      })
      .catch(() => {
        setLocationStatus('fallback');
        aplicarUbicacion(DEFAULT_LOCATION);
      });
  }, []);

  async function aplicarUbicacion(loc: UserLocation) {
    setUserLocation(loc);
    try {
      const reportes = await fetchReportesCercanos(loc.lat, loc.lng);
      setReportesCercanos(reportes);
    } catch {
      setReportesCercanos([]);
    }
    setCargando(false);
  }

  useEffect(() => {
    if (!userLocation) return;
    const { lat, lng } = userLocation;
    const id = setInterval(async () => {
      try {
        const reportes = await fetchReportesCercanos(lat, lng);
        setReportesCercanos(reportes);
      } catch { /* falla silenciosamente */ }
    }, 60_000);
    return () => clearInterval(id);
  }, [userLocation]);

  return {
    userLocation,
    reportesCercanos,
    cargando,
    locationStatus,
    accuracyMeters,
    notificacionesList,
    cargandoNotifs,
    notificacionesCount: notificacionesList.length,
  };
}
