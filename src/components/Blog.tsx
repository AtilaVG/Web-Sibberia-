import { Clock, ArrowRight } from "lucide-react";

const posts = [
  {
    category: "Selección",
    title:
      "Headhunting: la búsqueda directa de talento ejecutivo que tu empresa necesita",
    excerpt:
      "Descubre cómo el headhunting puede transformar la captación de directivos y perfiles altamente especializados en tu organización.",
    date: "15 May 2025",
    readTime: "5 min",
    color: "from-brand-navy to-[#1E2D4A]",
  },
  {
    category: "Liderazgo",
    title:
      "Inteligencia emocional: el factor diferencial del liderazgo moderno",
    excerpt:
      "La inteligencia emocional se ha convertido en una de las competencias más valoradas en los líderes empresariales del siglo XXI.",
    date: "3 Abr 2025",
    readTime: "7 min",
    color: "from-[#1E2D4A] to-brand-orange/80",
  },
  {
    category: "Tendencias",
    title:
      "Generación Z en el mercado laboral: claves para atraer y retener el nuevo talento",
    excerpt:
      "Los trabajadores de la Gen Z tienen expectativas y valores muy diferentes. ¿Está preparada tu empresa para adaptarse?",
    date: "18 Mar 2025",
    readTime: "6 min",
    color: "from-slate-700 to-slate-900",
  },
];

export default function Blog() {
  return (
    <section id="blog" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-brand-orange font-semibold text-sm tracking-[0.2em] uppercase mb-5 block">
              Blog & Recursos
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-navy">
              Últimas Noticias
            </h2>
          </div>
          <a
            href="#blog"
            className="inline-flex items-center gap-2 text-brand-orange font-semibold hover:gap-3 transition-all flex-shrink-0 group"
          >
            Ver todos los artículos
            <ArrowRight
              size={20}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        </div>

        {/* Posts grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.title} className="group cursor-pointer">
              {/* Card image */}
              <div
                className={`aspect-video bg-gradient-to-br ${post.color} rounded-2xl mb-6 overflow-hidden relative`}
              >
                <div className="absolute inset-0 flex items-end p-5">
                  <span className="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <span className="text-slate-400 text-xs flex items-center gap-1.5">
                  <Clock size={11} /> {post.readTime} de lectura
                </span>
                <span className="text-slate-300">·</span>
                <span className="text-slate-400 text-xs">{post.date}</span>
              </div>

              <h3 className="text-lg font-bold text-brand-navy mb-3 group-hover:text-brand-orange transition-colors leading-snug">
                {post.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">
                {post.excerpt}
              </p>

              <a
                href="#blog"
                className="text-brand-orange text-sm font-semibold hover:underline inline-flex items-center gap-1 group-hover:gap-2 transition-all"
              >
                Leer artículo →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
