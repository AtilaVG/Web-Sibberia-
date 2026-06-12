"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Send } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    label: "Dirección",
    value: "C/ Nuñez de Balboa, 120\nMadrid 28006",
  },
  {
    icon: Phone,
    label: "Teléfono",
    value: "919 319 738",
    href: "tel:919319738",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@sibberia.com",
    href: "mailto:info@sibberia.com",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("success");
    setFormData({
      name: "",
      company: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    });
    setTimeout(() => setStatus("idle"), 4000);
  };

  const inputClass =
    "w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-orange/25 focus:border-brand-orange transition-all bg-white";

  return (
    <section id="contacto" className="py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-brand-orange font-semibold text-sm tracking-[0.2em] uppercase mb-5 block">
            Hablemos
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-6">
            Contacta con Nosotros
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            ¿Listo para transformar la gestión de personas en tu empresa?
            Cuéntanos tu proyecto y te asesoramos sin compromiso.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact info sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {contactInfo.map((item) => (
              <div key={item.label} className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-brand-orange/10 rounded-xl flex items-center justify-center">
                  <item.icon className="text-brand-orange" size={20} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    {item.label}
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-brand-navy text-sm font-medium hover:text-brand-orange transition-colors whitespace-pre-line"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-brand-navy text-sm font-medium whitespace-pre-line">
                      {item.value}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* Quick call CTA */}
            <div className="mt-8 p-6 bg-brand-navy rounded-2xl">
              <h3 className="text-white font-bold text-base mb-2">
                ¿Necesitas respuesta rápida?
              </h3>
              <p className="text-white/55 text-sm mb-4">
                Llámanos directamente y te atendemos de inmediato.
              </p>
              <a
                href="tel:919319738"
                className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-600 text-white px-5 py-3 rounded-full text-sm font-semibold transition-all hover:shadow-lg"
              >
                <Phone size={15} /> 919 319 738
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl p-8 shadow-sm"
            >
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-navy uppercase tracking-wider mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className={inputClass}
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-navy uppercase tracking-wider mb-2">
                    Empresa
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className={inputClass}
                    placeholder="Nombre de tu empresa"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-navy uppercase tracking-wider mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={inputClass}
                    placeholder="tu@empresa.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-navy uppercase tracking-wider mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className={inputClass}
                    placeholder="+34 600 000 000"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold text-brand-navy uppercase tracking-wider mb-2">
                  Servicio de interés
                </label>
                <select
                  value={formData.service}
                  onChange={(e) =>
                    setFormData({ ...formData, service: e.target.value })
                  }
                  className={inputClass}
                >
                  <option value="">Selecciona un servicio</option>
                  <option value="seleccion">Selección de Personal</option>
                  <option value="formacion">Formación Empresarial</option>
                  <option value="consultoria">Consultoría Estratégica</option>
                  <option value="otro">Consulta general</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-semibold text-brand-navy uppercase tracking-wider mb-2">
                  Mensaje *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className={`${inputClass} resize-none`}
                  placeholder="Cuéntanos en qué podemos ayudarte..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full bg-brand-navy hover:bg-brand-navy-light text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "sending" ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Enviando...
                  </span>
                ) : status === "success" ? (
                  "✓ Mensaje enviado correctamente"
                ) : (
                  <>
                    <Send size={17} /> Enviar mensaje
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
