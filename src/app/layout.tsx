import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sibberia | Compartir, Crear, Crecer",
  description:
    "Sibberia – Tu socio estratégico en Recursos Humanos. Selección de personal, formación y consultoría de RRHH en Madrid. Más de 15 años de experiencia.",
  keywords:
    "recursos humanos, selección personal, formación empresarial, consultoría RRHH, Madrid",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
