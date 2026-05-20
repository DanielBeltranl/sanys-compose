import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Toaster } from 'react-hot-toast';
import { useDashboardController } from '../controller/useDashboardController';
import { MapaReportes } from './components/MapaReportes';
import { BottomNavbar } from './components/BottomNavbar';
import { PerfilView } from '../../perfilPage/view/perfilView';
import { NotificacionesView } from '../../notificacionesPage/view/notificacionesView';

type Tab = 'mapa' | 'notificaciones' | 'perfil';

export function DashboardView() {
  const {
    userLocation,
    reportesCercanos,
    cargando,
    locationStatus,
    notificacionesList,
    cargandoNotifs,
    notificacionesCount,
  } = useDashboardController();
  const [activeTab, setActiveTab] = useState<Tab>('mapa');
  const navigate = useNavigate();

  const perdidos = reportesCercanos.filter(r => r.tipoReporte === 'PERDIDO').length;
  const avistados = reportesCercanos.filter(r => r.tipoReporte === 'VISTO').length;

  return (
    <div className="flex flex-col h-dvh bg-slate-50">
      <Toaster position="top-center" toastOptions={{ style: { fontFamily: 'Inter, sans-serif', fontSize: '14px' } }} />

      <header className="sticky top-0 z-50 h-16 flex items-center justify-between px-5 bg-white border-b border-slate-100 shadow-sm shadow-blue-900/5 font-manrope shrink-0">
        <span className="text-xl font-extrabold tracking-tight text-[#0f52ba]">
          Sanos y Salvos
        </span>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-xs font-medium text-red-500 bg-red-50 px-2 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
            {perdidos} perdidos
          </span>
          <span className="flex items-center gap-1 text-xs font-medium text-[#0f52ba] bg-blue-50 px-2 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#0f52ba] inline-block" />
            {avistados} avistados
          </span>
        </div>
      </header>

      {locationStatus === 'fallback' && (
        <div className="mx-4 mt-3 px-4 py-2.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700 font-inter flex items-center gap-2 shrink-0">
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-amber-500 shrink-0">
            <path d="M12 17q.425 0 .713-.288Q13 16.425 13 16t-.287-.713Q12.425 15 12 15t-.712.287Q11 15.575 11 16t.288.712Q11.575 17 12 17zm-1-4h2V7h-2v6zm1 9q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22z" />
          </svg>
          No se pudo obtener tu ubicación. Mostrando zona de ejemplo.
        </div>
      )}

      <main className="flex-1 relative overflow-hidden pb-16">
        {activeTab === 'perfil' ? (
          <PerfilView />
        ) : activeTab === 'notificaciones' ? (
          <NotificacionesView notificaciones={notificacionesList} cargando={cargandoNotifs} />
        ) : cargando ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-50">
            <div className="w-10 h-10 border-4 border-[#0f52ba] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-[#505f76] font-inter font-medium">Buscando tu ubicación…</p>
            <p className="text-xs text-slate-400 font-inter">Recopilando la lectura más precisa</p>
          </div>
        ) : userLocation ? (
          <>
            <MapaReportes reportes={reportesCercanos} userLocation={userLocation} />

            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[400] bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-md border border-slate-100 text-xs font-inter text-[#505f76] whitespace-nowrap">
              {reportesCercanos.length === 0
                ? 'Sin reportes en 1 km a la redonda'
                : `${reportesCercanos.length} reporte${reportesCercanos.length > 1 ? 's' : ''} en 1 km a la redonda`}
            </div>

            <button onClick={() => navigate('/crear-reporte')} className="absolute bottom-20 left-1/2 -translate-x-1/2 z-[400] flex items-center gap-2 bg-[#0f52ba] hover:bg-blue-700 active:scale-95 text-white text-sm font-semibold font-manrope px-6 py-3 rounded-2xl shadow-lg shadow-blue-900/30 transition-all duration-200">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                <path d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2v-6z" />
              </svg>
              Crear reporte
            </button>
          </>
        ) : null}
      </main>

      <BottomNavbar
        notificaciones={notificacionesCount}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
}
