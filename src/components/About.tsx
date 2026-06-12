import { Target, Heart, Zap } from "lucide-react";

const highlights = [
  {
    icon: Target,
    title: "Nuestra Misión",
    text: "Ser el socio de referencia en la gestión del Capital Humano, aportando valor real y sostenible a las organizaciones con las que colaboramos.",
  },
  {
    icon: Heart,
    title: "Nuestro Enfoque",
    text: "Ponemos a las personas en el centro de todo. Creemos que el talento humano es el activo más valioso de cualquier organización.",
  },
  {
    icon: Zap,
    title: "Nuestro Diferencial",
    text: "Combinamos metodologías innovadoras con experiencia sectorial profunda para ofrecer soluciones únicas con resultados medibles.",
  },
];

export default function About() {
  return (
    <section id="nosotros" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left */}
          <div>
            <span className="text-brand-orange font-semibold text-sm tracking-[0.2em] uppercase mb-5 block">
              Sobre Nosotros
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-navy leading-tight mb-6">
              Tu socio estratégico en el crecimiento empresarial
            </h2>
            <p className="text-slate-600 text-lg mb-5 leading-relaxed">
              Sibberia nació con la convicción de que las empresas que cuidan a
              su gente, crecen. Somos un equipo con más de{" "}
              <strong className="text-brand-navy font-semibold">
                15 años de experiencia
              </strong>{" "}
              en el sector, comprometidos con ayudar a las organizaciones a
              mejorar sus procesos de personas.
            </p>
            <p className="text-slate-600 text-lg mb-10 leading-relaxed">
              Nuestra labor tiene impacto directo en otras áreas del negocio y
              en los resultados financieros, aportando agilidad, flexibilidad,
              calidad y reducción de costes.
            </p>

            <a
              href="#servicios"
              className="inline-flex items-center gap-2 text-brand-orange font-semibold hover:gap-4 transition-all text-lg group"
            >
              Conoce nuestros servicios
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>

          {/* Right: highlights */}
          <div className="space-y-5">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="flex gap-5 p-6 rounded-2xl bg-slate-50 hover:bg-brand-orange/5 transition-all duration-200 group cursor-default"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-brand-orange/10 rounded-xl flex items-center justify-center group-hover:bg-brand-orange/20 transition-colors">
                  <item.icon className="text-brand-orange" size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-brand-navy mb-1.5 text-base">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
