import { ArrowRight, ChevronDown } from "lucide-react";

const stats = [
  { value: "+15", label: "Años de experiencia" },
  { value: "+500", label: "Empresas atendidas" },
  { value: "3", label: "Áreas especializadas" },
  { value: "100%", label: "Compromiso" },
];

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen bg-brand-navy flex flex-col justify-center overflow-hidden"
    >
      {/* Dot grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-[#1a2d4e] to-slate-900" />

      {/* Orange glow accents */}
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-brand-orange/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 left-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24">
        <div className="max-w-4xl">
          {/* Tagline badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-10">
            <span className="w-2 h-2 bg-brand-orange rounded-full animate-pulse" />
            <span className="text-white/80 text-sm font-medium tracking-[0.2em] uppercase">
              Compartir · Crear · Crecer
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-8">
            Personas que{" "}
            <span className="text-brand-orange relative">
              impulsan
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 10 C50 2, 150 2, 298 8"
                  stroke="#F97316"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.4"
                />
              </svg>
            </span>
            <br />
            tu empresa
          </h1>

          <p className="text-xl text-white/65 max-w-2xl mb-12 leading-relaxed">
            Somos tu socio estratégico en Recursos Humanos. Más de 15 años
            ayudando a empresas a encontrar, desarrollar y retener el mejor
            talento.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#servicios"
              className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:shadow-2xl hover:-translate-y-1 hover:gap-3"
            >
              Nuestros servicios
              <ArrowRight size={20} />
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 text-white hover:bg-white/10 px-8 py-4 rounded-full font-semibold text-lg transition-all"
            >
              Contáctanos
            </a>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-12">
          {stats.map((stat) => (
            <div key={stat.label} className="pl-5 border-l-2 border-brand-orange/50">
              <div className="text-4xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-white/45 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <a
        href="#nosotros"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/35 hover:text-white/70 transition-colors animate-bounce"
        aria-label="Scroll hacia abajo"
      >
        <ChevronDown size={32} />
      </a>
    </section>
  );
}
