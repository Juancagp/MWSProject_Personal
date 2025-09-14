// app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { School } from "lucide-react"; // <-- ¡No olvides importar el ícono!

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CAIBook - Gestión de Espacios",
  description: "Plataforma para la reserva de salas y eventos de Ingeniería UC.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="bg-brand-light text-brand-dark">
          {/* 1. Barra de Navegación (Ahora vive aquí) */}
          <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
              <a href="/Landing" className="flex items-center gap-2"> {/* Apunta a la raíz */}
                 <School className="h-8 w-8 text-brand-primary" />
                 <span className="text-2xl font-bold text-brand-dark">CAIBook</span>
              </a>
              <div className="flex items-center gap-6 md:gap-8">
                <a href="/#features" className="hidden md:block font-medium text-slate-600 hover:text-brand-primary transition-colors duration-300">
                  Características
                </a>
                <a href="/About" className="hidden md:block font-medium text-slate-600 hover:text-brand-primary transition-colors duration-300">
                  Sobre Nosotros
                </a>
                <a
              href="/LogIn"
              className="bg-slate-600 text-white font-bold py-2 px-6 rounded-full hover:bg-slate-800 transition-colors duration-300"
            >
              Iniciar Sesión
            </a>
              </div>
            </nav>
          </header>

          {/* El contenido de cada página se renderizará aquí */}
          {children}

          {/* 6. Footer (Ahora vive aquí) */}
          <footer className="bg-brand-dark text-white">
            <div className="container mx-auto px-6 py-8 text-center text-slate-400">
                <p>&copy; {new Date().getFullYear()} Mapocho Web Services. Un proyecto para IIC3143.</p>
                <p className="text-sm mt-2">Desarrollado para la comunidad de la Escuela de Ingeniería de la Pontificia Universidad Católica de Chile.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}