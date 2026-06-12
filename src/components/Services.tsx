import { Users, GraduationCap, LineChart, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Users,
    number: "01",
    title: "Selección",
    subtitle: "Encontramos el talento que tu empresa necesita",
    description:
      "Asumimos el proceso de selección completo para encontrar el mejor talento mediante metodologías de búsqueda innovadoras y tradicionales. Trabajamos con garantía de éxito.",
    features: [
      "Headhunting ejecutivo",
      "Selección por competencias",
      "Assessment Centers",
      "Garantía de proceso",
    ],
  },
  {
    icon: GraduationCap,
    number: "02",
    title: "Formación",
    subtitle: "Desarrollamos el potencial de tus equipos",
    description:
      "Diseñamos planes de formación a medida basados en las necesidades reales de tu empresa para desarrollar el pleno potencial de tus equipos y alcanzar tus objetivos.",
    features: [
      "Formación in-company",
      "Planes personalizados",
      "Coaching ejecutivo",
      "E-learning adaptativo",
    ],
  },
  {
    icon: LineChart,
    number: "03",
    title: "Consultoría Estratégica",
    subtitle: "Optimizamos tu capital humano",
    description:
      "Trabajamos en la estrategia y gestión operativa de tu empresa para conseguir el mayor rendimiento de tu capital humano, con impacto medible en los resultados.",
    features: [
      "Auditoría de RRHH",
      "Diseño organizacional",
      "Gestión del cambio",
      "KPIs de personas",
    ],
  },
];

export default function Services() {
  return (
    <section id="servicios" className="py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-brand-orange font-semibold text-sm tracking-[0.2em] uppercase mb-5 block">
            Lo que hacemos
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-6">
            Nuestros Servicios
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Tres áreas de especialización para cubrir todas las necesidades de
            tu departamento de personas.
          </p>
        </div>

        {/* Cards */}
        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group flex flex-col"
            >
              {/* Large number */}
              <span className="text-slate-100 font-bold text-7xl leading-none mb-6 group-hover:text-brand-orange/15 transition-colors select-none">
                {service.number}
              </span>

              {/* Icon */}
              <div className="w-14 h-14 bg-brand-orange/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-orange transition-all duration-300">
                <service.icon
                  className="text-brand-orange group-hover:text-white transition-colors"
                  size={26}
                />
              </div>

              <h3 className="text-2xl font-bold text-brand-navy mb-1">
                {service.title}
              </h3>
              <p className="text-brand-orange font-medium text-sm mb-4">
                {service.subtitle}
              </p>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">
                {service.description}
              </p>

              {/* Feature list */}
              <ul className="space-y-2 mb-8">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2.5 text-sm text-slate-500"
                  >
                    <span className="w-1.5 h-1.5 bg-brand-orange rounded-full flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#contacto"
                className="inline-flex items-center gap-2 text-brand-orange font-semibold text-sm hover:gap-3 transition-all"
              >
                Solicitar información <ArrowRight size={16} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
