const values = [
  {
    number: "01",
    title: "Humildad",
    description:
      "Escuchamos antes de actuar. Aprendemos constantemente y ponemos el éxito de nuestros clientes por encima del nuestro propio.",
    gradient: "from-sky-500 to-blue-600",
    glow: "bg-sky-500",
  },
  {
    number: "02",
    title: "Integridad",
    description:
      "Actuamos con honestidad y transparencia en cada interacción, construyendo relaciones de confianza que perduran en el tiempo.",
    gradient: "from-brand-orange to-amber-500",
    glow: "bg-brand-orange",
  },
  {
    number: "03",
    title: "Excelencia",
    description:
      "Buscamos la perfección en cada proyecto. Aplicamos las mejores prácticas del sector y nos exigimos el máximo nivel en cada entrega.",
    gradient: "from-emerald-500 to-teal-500",
    glow: "bg-emerald-500",
  },
];

export default function Values() {
  return (
    <section className="py-32 bg-brand-navy overflow-hidden relative">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-brand-orange font-semibold text-sm tracking-[0.2em] uppercase mb-5 block">
            Lo que nos guía
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Nuestros Valores
          </h2>
          <p className="text-white/55 text-lg max-w-2xl mx-auto">
            La base sobre la que construimos cada relación y cada proyecto.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value) => (
            <div
              key={value.title}
              className="relative p-8 rounded-3xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition-all duration-300 group overflow-hidden"
            >
              {/* Number badge */}
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-7`}
              >
                <span className="text-white font-bold text-sm tracking-wider">
                  {value.number}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">
                {value.title}
              </h3>
              <p className="text-white/55 leading-relaxed text-[15px]">
                {value.description}
              </p>

              {/* Glow decoration */}
              <div
                className={`absolute -top-8 -right-8 w-40 h-40 ${value.glow} opacity-[0.06] rounded-full blur-2xl group-hover:opacity-[0.12] transition-opacity`}
              />
            </div>
          ))}
        </div>

        {/* Bottom tagline */}
        <div className="mt-20 text-center">
          <p className="text-white/30 text-sm tracking-[0.35em] uppercase font-medium">
            Compartir · Crear · Crecer
          </p>
        </div>
      </div>
    </section>
  );
}
