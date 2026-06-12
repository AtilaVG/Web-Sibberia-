import Link from "next/link";
import { Linkedin, Twitter, Instagram } from "lucide-react";

const footerLinks = [
  {
    title: "Servicios",
    links: [
      { label: "Selección de Personal", href: "#servicios" },
      { label: "Formación Empresarial", href: "#servicios" },
      { label: "Consultoría Estratégica", href: "#servicios" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre Nosotros", href: "#nosotros" },
      { label: "Nuestros Valores", href: "#" },
      { label: "Blog", href: "#blog" },
      { label: "Contacto", href: "#contacto" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Política de Privacidad", href: "#" },
      { label: "Aviso Legal", href: "#" },
      { label: "Política de Cookies", href: "#" },
    ],
  },
];

const social = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">
        <div className="grid lg:grid-cols-5 gap-12 mb-16">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="text-2xl font-bold tracking-widest block mb-5"
            >
              SIBBERIA
            </Link>
            <p className="text-white/45 text-sm leading-relaxed mb-6 max-w-xs">
              Tu socio estratégico en Recursos Humanos. Compartimos, creamos y
              crecemos contigo desde Madrid.
            </p>
            <p className="text-brand-orange text-xs font-semibold tracking-[0.3em] uppercase mb-6">
              Compartir · Crear · Crecer
            </p>

            {/* Social */}
            <div className="flex gap-3">
              {social.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 bg-white/10 hover:bg-brand-orange rounded-full flex items-center justify-center transition-colors"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Link groups */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="font-semibold text-xs tracking-[0.2em] uppercase mb-6 text-white/60">
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/45 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/35 text-xs">
            © {new Date().getFullYear()} Sibberia Servicios Empresariales SL.
            Todos los derechos reservados.
          </p>
          <p className="text-white/35 text-xs">
            C/ Nuñez de Balboa, 120 · Madrid 28006 · 919 319 738
          </p>
        </div>
      </div>
    </footer>
  );
}
