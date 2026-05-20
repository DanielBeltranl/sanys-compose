import { useNavigate } from "react-router";

const ROLES_DATA = [
    {
        id: 'clinica',
        rol: 'Clínica',
        desc: 'Proporciona atención médica, gestiona citas y ayuda a la comunidad.',
        svgPath: "M7 15h3v3h4v-3h3v-4h-3V8h-4v3H7v4zm-2 4q-.825 0-1.412-.587Q3 17.825 3 17V7q0-.825.588-1.412Q4.175 5 5 5h4V3h6v2h4q.825 0 1.413.588Q21 6.175 21 7v10q0 .825-.587 1.413Q19.825 19 19 19H5zm0-2h14V7H5v10zm0 0V7v10z"
    },
    {
        id: 'refugio',
        rol: 'Refugio',
        desc: 'Gestiona espacios de acogida, recursos y servicios de emergencia.',
        svgPath: "M6 19h3v-6h6v6h3v-9l-6-4.5L6 10v9zm-2 2V9l8-6 8 6v12h-7v-6h-2v6H4zm8-8.75z"
    },
    {
        id: 'persona',
        rol: 'Persona',
        desc: 'Busca ayuda, conecta con profesionales o colabora como voluntario.',
        svgPath: "M12 12q-1.65 0-2.825-1.175Q8 9.65 8 8q0-1.65 1.175-2.825Q10.35 4 12 4q1.65 0 2.825 1.175Q16 6.35 16 8q0 1.65-1.175 2.825Q13.65 12 12 12zm0 2q2.725 0 4.362 1.3q1.638 1.3 1.638 3.7V20H6v-1q0-2.4 1.638-3.7Q9.275 14 12 14z"
    }
];

const RoleSelection = () => {
    const navigate = useNavigate();

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 m-3">
            {ROLES_DATA.map((item) => (
                <button
                    key={item.id}
                    onClick={() => navigate(`/register/${item.id}`)}
                    className="group relative flex flex-col items-center justify-center p-8 rounded-xl transition-all duration-300 text-center bg-white border border-slate-200 hover:border-[#0f52ba] hover:shadow-xl hover:bg-slate-50 hover:scale-[1.02] active:scale-95"
                >
                    <div className="w-20 h-20 rounded-full bg-[#f0f4ff] flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#0f52ba]">
                        <svg
                            viewBox="0 0 24 24"
                            className="w-10 h-10 fill-[#0f52ba] transition-colors duration-300 group-hover:fill-white"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d={item.svgPath} />
                        </svg>
                    </div>

                    <h3 className="font-manrope text-2xl font-semibold mb-2 text-[#191c1e] transition-colors group-hover:text-[#0f52ba]">
                        {item.rol}
                    </h3>
                    <p className="font-inter text-sm leading-relaxed px-2 text-[#505f76]">
                        {item.desc}
                    </p>
                </button>
            ))}
        </div>
    );
};

export default RoleSelection;
