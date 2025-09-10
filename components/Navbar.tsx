"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

type NavLink = { id: string; label: string; href: `#${string}` };

const LINKS: NavLink[] = [
  { id: "inicio", label: "Inicio", href: "#inicio" },
  { id: "proyectos", label: "Proyectos", href: "#proyectos" },
  { id: "sobre-mi", label: "Sobre Mí", href: "#sobre-mi" },
  { id: "contacto", label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [active, setActive] = useState<string>("inicio");
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  // refs para el "magic underline"
  const barRef = useRef<HTMLDivElement | null>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [underline, setUnderline] = useState<{ left: number; width: number }>({ left: 0, width: 0 });

  // Observa secciones para resaltar el link activo
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        // toma la que esté mayormente visible
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0));
        if (vis[0]?.target?.id) setActive(vis[0].target.id);
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: "-10% 0px -35% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Barra de progreso + estado "scrolled"
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? h.scrollTop / max : 0;
      setProgress(p);
      setScrolled(window.scrollY > 6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Actualiza la posición del subrayado cuando cambia el activo o el tamaño
  const updateUnderline = () => {
    const bar = barRef.current;
    const a = linkRefs.current[active];
    if (!bar || !a) return;
    const aRect = a.getBoundingClientRect();
    const barRect = bar.getBoundingClientRect();
    setUnderline({ left: aRect.left - barRect.left, width: aRect.width });
  };
  useEffect(updateUnderline, [active]);
  useEffect(() => {
    const on = () => updateUnderline();
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);

  const classLink = (id: string) =>
    [
      "relative z-10 px-3 py-2 text-sm sm:text-[15px] transition-colors",
      active === id ? "text-white" : "text-slate-300 hover:text-white",
    ].join(" ");

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "pt-2" : "pt-4",
      ].join(" ")}
    >
      <div className="mx-3">
        <div className="relative">
          {/* aura suave */}
          <div
            className="absolute -inset-2 rounded-2xl opacity-50 blur-xl pointer-events-none"
            style={{
              background: "linear-gradient(135deg,#537CF2 0%,#6C6FFB 50%,#8A5CFF 100%)",
            }}
          />

          {/* borde gradiente */}
          <div
            className="relative rounded-xl p-[1.5px] shadow-[0_0_28px_rgba(83,124,242,.22)]"
            style={{
              background: "linear-gradient(135deg,#537CF2 0%,#6C6FFB 50%,#8A5CFF 100%)",
            }}
          >
            <nav
              className={[
                "rounded-[12px] bg-[#0F172A]/75 backdrop-blur-md",
                "px-4 sm:px-5",
                scrolled ? "py-2" : "py-3",
              ].join(" ")}
              aria-label="Navegación principal"
            >
              <div className="flex items-center justify-between">
                {/* Brand */}
                <a href="#inicio" className="flex items-center gap-2 text-white font-semibold">
                  <Image src="/LogoDPB.png" alt="Logo" width={40} height={40} className="rounded-md" />
                  <span>DPBascur</span>
                </a>

                {/* Links desktop */}
                <div ref={barRef} className="relative hidden md:flex items-center gap-1">
                  {LINKS.map((l) => (
                    <a
                      key={l.id}
                      href={l.href}
                      ref={(el) => (linkRefs.current[l.id] = el)}
                      className={classLink(l.id)}
                      onClick={() => setOpen(false)}
                    >
                      {l.label}
                    </a>
                  ))}

                  {/* underline animado */}
                  <span
                    className="absolute bottom-0 h-[2px] rounded-full bg-gradient-to-r from-[#8A5CFF] via-[#6C6FFB] to-[#537CF2] transition-all duration-300"
                    style={{ left: underline.left, width: underline.width }}
                  />
                </div>

                {/* Actions */}
                <div className="hidden md:flex items-center gap-3">
                  <Link
                    href="https://github.com/DPBascur"
                    target="_blank"
                    className="text-slate-300 hover:text-white transition-colors"
                    aria-label="GitHub"
                  >
                    <FaGithub size={20} />
                  </Link>
                  <Link
                    href="https://linkedin.com/in/dpbascur"
                    target="_blank"
                    className="text-slate-300 hover:text-white transition-colors"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin size={20} />
                  </Link>
                  <a
                    href="/CV_DanielBascur.pdf"
                    className="ml-1 rounded-full px-4 py-2 text-sm font-semibold text-white shadow-lg transition active:scale-95"
                    style={{
                      background: "linear-gradient(135deg,#8A5CFF 0%,#6C6FFB 50%,#537CF2 100%)",
                    }}
                  >
                    Descargar CV
                  </a>
                </div>

                {/* Burger móvil */}
                <button
                  className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-slate-200 hover:bg-white/5"
                  onClick={() => setOpen((v) => !v)}
                  aria-label="Abrir menú"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Menú móvil */}
              <div
                className={[
                  "md:hidden grid overflow-hidden transition-[grid-template-rows] duration-300",
                  open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                ].join(" ")}
              >
                <div className="min-h-0">
                  <div className="pt-2 pb-3 flex flex-col">
                    {LINKS.map((l) => (
                      <a
                        key={l.id}
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className={[
                          "px-2 py-2 rounded-md text-[15px]",
                          active === l.id ? "text-white bg-white/5" : "text-slate-300 hover:text-white hover:bg-white/5",
                        ].join(" ")}
                      >
                        {l.label}
                      </a>
                    ))}

                    <div className="mt-2 flex items-center gap-3 px-2">
                      <Link
                        href="https://github.com/DPBascur"
                        target="_blank"
                        className="text-slate-300 hover:text-white"
                        aria-label="GitHub"
                      >
                        <FaGithub size={20} />
                      </Link>
                      <Link
                        href="https://www.linkedin.com/in/daniel-pe%C3%B1a-0ba014384/"
                        target="_blank"
                        className="text-slate-300 hover:text-white"
                        aria-label="LinkedIn"
                      >
                        <FaLinkedin size={20} />
                      </Link>
                      <a
                        href="/CV_DanielBascur.pdf"
                        className="ml-auto rounded-full px-4 py-2 text-sm font-semibold text-white shadow-lg"
                        style={{
                          background: "linear-gradient(135deg,#8A5CFF 0%,#6C6FFB 50%,#537CF2 100%)",
                        }}
                      >
                        Descargar CV
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </nav>

            {/* barra de progreso (arriba de la tarjeta) */}
            <span
              className="absolute -top-[3px] left-0 h-[3px] w-full origin-left rounded-full bg-gradient-to-r from-[#8A5CFF] via-[#6C6FFB] to-[#537CF2]"
              style={{ transform: `scaleX(${progress})` }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}