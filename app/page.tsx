import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import PortfolioHero3D from "@/components/PortfolioHero3D";
import MisProyectos from "@/components/MisProyectos";
import SobreMi from "@/components/SobreMi";
import Contacto from "@/components/Contacto";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Home() {
  return (
    <div className="bg-[#0B1020] min-h-screen text-white">
      {/* NAVBAR con indicador activo y progreso */}
      <Navbar />

      <main>
        {/* INICIO */}
        <section id="inicio" className="scroll-mt-28">
          <PortfolioHero3D />
        </section>

        {/* PROYECTOS */}
        <section id="proyectos" className="scroll-mt-28">
          <MisProyectos />
        </section>

        {/* SOBRE MÍ */}
        <section id="sobre-mi" className="scroll-mt-28">
          <SobreMi />
        </section>
        <section id="contacto" className="scroll-mt-28">
          <Contacto />
        </section>
      </main>

      {/*  FOOTER */}
      <footer className="scroll-mt-28">
        <div className="mx-3 my-8">
          <div className="relative">
            {/* Aura suave */}
            <div
              className="absolute -inset-2 rounded-2xl opacity-40 blur-xl pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg,#537CF2 0%,#6C6FFB 50%,#8A5CFF 100%)",
              }}
            />

            {/* Borde gradiente */}
            <div
              className="relative rounded-xl p-[1.5px] shadow-[0_0_28px_rgba(83,124,242,.22)]"
              style={{
                background:
                  "linear-gradient(135deg,#537CF2 0%,#6C6FFB 50%,#8A5CFF 100%)",
              }}
            >
              <div className="rounded-[12px] bg-[#0F172A]/75 backdrop-blur-md p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Brand */}
                  <div>
                    <a href="#inicio" className="flex items-center gap-2">
                      <Image
                        src="/LogoDPB.png"
                        alt="Logo"
                        width={40}
                        height={40}
                        className="rounded-md"
                      />
                      <span className="font-semibold text-white">DPBascur</span>
                    </a>
                    <p className="mt-3 text-slate-300 text-sm">
                      Construyendo experiencias digitales elegantes con React,
                      Next.js y buen diseño.
                    </p>
                  </div>

                  {/* Navegación interna */}
                  <div>
                    <h4 className="font-semibold mb-3">Navegación</h4>
                    <ul className="space-y-2 text-slate-300">
                      <li>
                        <a href="#inicio" className="hover:text-white">
                          Inicio
                        </a>
                      </li>
                      <li>
                        <a href="#proyectos" className="hover:text-white">
                          Proyectos
                        </a>
                      </li>
                      <li>
                        <a href="#sobre-mi" className="hover:text-white">
                          Sobre Mí
                        </a>
                      </li>
                      <li>
                        <a href="#contacto" className="hover:text-white">
                          Contacto
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* Contacto / Social / CV */}
                  <div>
                    <h4 className="font-semibold mb-3">Contacto</h4>
                    <div className="space-y-2 text-slate-300">
                      <a
                        href="mailto:dpbascur.dev@gmail.com
"
                        className="hover:text-white"
                      >
                        dpbascur.dev@gmail.com

                      </a>

                      <div className="flex gap-3 pt-1">
                        <Link
                          href="https://github.com/DPBascur"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-300 hover:text-white transition-colors"
                          aria-label="GitHub"
                        >
                          <FaGithub size={20} />
                        </Link>
                        <Link
                          href="https://linkedin.com/in/dpbascur"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-300 hover:text-white transition-colors"
                          aria-label="LinkedIn"
                        >
                          <FaLinkedin size={20} />
                        </Link>
                      </div>

                      <a
                        href="/CV_DanielBascur.pdf"
                        className="inline-flex mt-3 rounded-full px-4 py-2 text-sm font-semibold text-white shadow-lg active:scale-95"
                        style={{
                          background:
                            "linear-gradient(135deg,#8A5CFF 0%,#6C6FFB 50%,#537CF2 100%)",
                        }}
                      >
                        Descargar CV
                      </a>
                    </div>
                  </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-6 border-t border-white/10 pt-4 text-sm text-slate-400 flex items-center justify-between flex-wrap gap-3">
                  <span>
                    © {new Date().getFullYear()} DPBascur. Todos los derechos
                    reservados.
                  </span>
                  <a href="#inicio" className="hover:text-white">
                    Volver arriba ↑
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}