import { usePerfilController } from '../controller/usePerfilController'

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  const icons: Record<string, string> = {
    email: 'M20 4H4q-.825 0-1.412.588Q2 5.175 2 6v12q0 .825.588 1.413Q3.175 20 4 20h16q.825 0 1.413-.587Q22 18.825 22 18V6q0-.825-.587-1.412Q20.825 4 20 4zm0 4-8 5-8-5V6l8 5 8-5v2z',
    phone: 'M6.6 10.8q1.4 2.8 4.6 5.8q3.2 3 6.2 4.4l2-2q.35-.35.85-.2q1.5.5 3 .7q.45.05.75.4q.3.35.3.85l-.3 3q-.05.45-.4.725Q23.25 24 22.8 24Q10.8 24 2.4 15.6Q-6 7.2-6 1.2q0-.425.288-.762Q-5.4.1-4.95.05l3-.3q.45-.05.8.25q.35.3.4.75q.2 1.55.7 3q.15.5-.2.85l-2 2z',
    location: 'M12 12q.825 0 1.413-.588Q14 10.825 14 10t-.587-1.413Q12.825 8 12 8q-.825 0-1.412.587Q10 9.175 10 10q0 .825.588 1.412Q11.175 12 12 12zm0 7.35q-3.65-3.15-5.325-5.838Q5 10.825 5 9q0-2.9 1.862-4.65Q8.725 2.6 12 2.6q3.275 0 5.138 1.75Q19 6.1 19 9q0 1.825-1.675 4.512Q15.65 16.2 12 19.35z',
    person: 'M12 12q-1.65 0-2.825-1.175Q8 9.65 8 8q0-1.65 1.175-2.825Q10.35 4 12 4q1.65 0 2.825 1.175Q16 6.35 16 8q0 1.65-1.175 2.825Q13.65 12 12 12zm-8 8v-2.8q0-.85.438-1.563.437-.712 1.162-1.087 1.55-.775 3.15-1.163Q10.35 13 12 13t3.25.387q1.6.388 3.15 1.163.725.375 1.163 1.087Q20 16.35 20 17.2V20H4z',
    building: 'M4 21V9l8-6 8 6v12h-5v-6H9v6H4zm2-2h3v-6h6v6h3V10l-6-4.5L6 10v9zm3-9h6v-2H9v2zm0 4h6v-2H9v2z',
  }
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-xl bg-[#f0f4ff] flex items-center justify-center shrink-0 mt-0.5">
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#0f52ba]">
          <path d={icons[icon]} />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] font-semibold font-manrope text-[#505f76] uppercase tracking-wide">{label}</span>
        <span className="text-sm font-inter text-[#191c1e] break-all">{value}</span>
      </div>
    </div>
  )
}

const USER_TYPE_CONFIG = {
  persona:  { label: 'Persona',  badge: 'bg-blue-50 text-[#0f52ba]',    nombreLabel: 'Nombre completo' },
  clinica:  { label: 'Clínica',  badge: 'bg-purple-50 text-purple-700', nombreLabel: 'Nombre de la clínica' },
  refugio:  { label: 'Refugio',  badge: 'bg-emerald-50 text-emerald-700', nombreLabel: 'Nombre del refugio' },
}

export function PerfilView() {
  const { perfil, cargando, logout } = usePerfilController()

  if (cargando || !perfil) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#0f52ba] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const iniciales = perfil.nombre
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const tipoConfig = USER_TYPE_CONFIG[perfil.userType]

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-lg mx-auto px-4 py-6 pb-8 flex flex-col gap-5">

        {/* Avatar + nombre + tipo */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col items-center text-center gap-3">
          <div className="w-20 h-20 rounded-full bg-[#0f52ba] flex items-center justify-center shadow-md shadow-blue-200">
            <span className="text-2xl font-bold font-manrope text-white tracking-wide">{iniciales}</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <h2 className="font-manrope text-xl font-extrabold text-[#191c1e] tracking-tight">
              {perfil.nombre}
            </h2>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold font-manrope ${tipoConfig.badge}`}>
              {tipoConfig.label}
            </span>
          </div>
          <button
            onClick={logout}
            className="mt-1 w-full py-2 rounded-xl text-sm font-semibold font-manrope text-red-500 border border-red-100 bg-red-50 hover:bg-red-100 transition-colors"
          >
            Cerrar sesión
          </button>
        </div>

        {/* Info según tipo */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col gap-4">
          <h3 className="font-manrope text-xs font-bold text-[#505f76] uppercase tracking-widest">
            Información de contacto
          </h3>
          <InfoRow icon={perfil.userType === 'persona' ? 'person' : 'building'} label={tipoConfig.nombreLabel} value={perfil.nombre} />
          <InfoRow icon="email" label="Correo electrónico" value={perfil.email} />
          <InfoRow icon="phone" label="Teléfono" value={perfil.telefono} />
          {perfil.direccion && (
            <InfoRow
              icon="location"
              label={perfil.userType === 'persona' ? 'Dirección' : 'Dirección del establecimiento'}
              value={perfil.direccion}
            />
          )}
        </div>

      </div>
    </div>
  )
}
