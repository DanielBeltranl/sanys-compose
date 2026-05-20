
export const Navbar = () => {
    return (
        <header
            className="sticky top-0 z-50 w-full h-16 flex justify-between items-center px-6 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900 shadow-sm shadow-blue-900/5 font-manrope antialiased">
            <div className="flex items-center gap-3">
                <span className="text-xl font-extrabold tracking-tight text-blue-700 dark:text-blue-400">
      Sanos y Salvos
    </span>
            </div>
                <div className="hidden md:flex gap-8">
                    <span className="text-slate-400 dark:text-slate-500 font-medium">
                      Registro de Prestadores
                    </span>
                </div>
            <div className="flex items-center gap-4">
            </div>
        </header>
    )
}