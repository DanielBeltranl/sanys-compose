interface FormFieldProps {
  label: string
  error?: string
  children: React.ReactNode
}

export const inputClassName =
  'w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-[#191c1e] placeholder-slate-400 font-inter transition-all outline-none focus:ring-2 focus:ring-[#0f52ba]/25 focus:border-[#0f52ba]'

export const FormField = ({ label, error, children }: FormFieldProps) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-semibold text-[#191c1e] font-manrope">{label}</label>
    {children}
    {error && <span className="text-xs text-red-500 font-inter">{error}</span>}
  </div>
)
