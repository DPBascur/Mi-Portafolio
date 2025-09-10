"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiMenu, FiX, FiDownload } from "react-icons/fi";

type NavItem = { id: string; label: string; href: string };

const LINKS: NavItem[] = [
  { id: "inicio", label: "Inicio", href: "#inicio" },
  { id: "proyectos", label: "Proyectos", href: "#proyectos" },
  { id: "sobre-mi", label: "Sobre Mí", href: "#sobre-mi" },
  { id: "contacto", label: "Contacto", href: "#contacto" },
];

// Ajusta si cambias la altura del navbar
const NAV_HEIGHT = 72;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("inicio");

  // refs a <a> por id (para medir y mover el indicador)
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const listRef = useRef<HTMLDivElement | null>(null);
  const [indicator, setIndicator] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  // Mover la píldora bajo el enlace activo
  const moveIndicator = (id: string) => {
    const el = linkRefs.current[id];
    const list = listRef.current;
    if (!el || !list) return setIndicator((s) => ({ ...s, opacity: 0 }));
    const lr = list.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    setIndicator({
      left: er.left - lr.left,
      width: er.width,
      opacity: 1,
    });
  };

  // Scroll Spy
  useEffect(() => {
    const onScroll = () => {
      const hits = LINKS.map((l) => {
        const sec = document.getElementById(l.id);
        if (!sec) return { id: l.id, top: Number.POSITIVE_INFINITY };
        // posición real respecto a la ventana menos offset del navbar
        const top = sec.getBoundingClientRect().top - NAV_HEIGHT;
        return { id: l.id, top };
      });

      const current = hits
        .filter((h) => h.top <= window.innerHeight * 0.35)
        .sort((a, b) => b.top - a.top)[0];

      if (current?.id) setActive(current.id);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Reposicionar el indicador cuando cambia el activo o el tamaño
  useEffect(() => {
    moveIndicator(active);
    const onResize = () => moveIndicator(active);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  // Scroll suave con compensación del navbar
  const handleNavClick = (href: string, id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!href.startsWith("#")) return; // enlaces externos no se interceptan
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const y = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT - 8; // -8 px por aire
      window.scrollTo({ top: y, behavior: "smooth" });
      setOpen(false);
      setActive(id);
    }
  };

  const classLink = (id: string) =>
    [
      "relative z-10 px-3 py-2 rounded-md text-sm font-medium transition-colors",
      "text-slate-200 hover:text-white",
      active === id ? "text-white" : "hover:bg-white/5",
    ].join(" ");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-3 pt-3">
      {/* Marco con borde gradiente y glass */}
      <div
        className="
          mx-auto max-w-6xl
          rounded-2xl p-[1.5px]
          bg-gradient-to-r from-[#537CF2] via-[#6C6FFB] to-[#8A5CFF]
          shadow-[0_10px_40px_-10px_rgba(83,124,242,.45)]
        "
      >
        <div className="rounded-2xl bg-[#0F172A]/80 backdrop-blur-md border border-white/10">
          <div className="h-[72px] px-3 sm:px-4 flex items-center justify-between">
            {/* Brand */}
            <Link href="/" className="text-white text-lg sm:text-xl font-bold flex items-center gap-2">
              <Image src="/LogoDPB.png" alt="Logo" width={32} height={32} className="rounded-md" />
              DPBascur
            </Link>

            {/* Links Desktop */}
            <div className="hidden md:flex items-center gap-1 relative" ref={listRef}>
              {/* Indicador activo (píldora luminosa) */}
              <div
                aria-hidden
                style={{
                  transform: `translateX(${indicator.left}px)`,
                  width: indicator.width,
                  opacity: indicator.opacity,
                }}
                className="
                  pointer-events-none absolute left-0 top-1/2 -translate-y-1/2
                  h-8 rounded-lg transition-all duration-300
                  bg-white/10 ring-1 ring-white/10
                "
              />
              {LINKS.map((l) => (
                <a
                  key={l.id}
                  href={l.href}
                  ref={(el) => {
                    // ✅ callback ref sin return (evita el error de tipos de Vercel)
                    linkRefs.current[l.id] = el;
                  }}
                  className={classLink(l.id)}
                  onClick={handleNavClick(l.href, l.id)}
                >
                  {l.label}
                </a>
              ))}
            </div>

            {/* Acciones (CTA + social) Desktop */}
            <div className="hidden md:flex items-center gap-2">
              <a
                href="https://github.com/DPBascur"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/15 transition"
                aria-label="GitHub"
                title="GitHub"
              >
                <FaGithub className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/daniel-pe%C3%B1a-0ba014384/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/15 transition"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a
                href="/CV_DanielBascur.pdf"
                className="
                  ml-1 inline-flex items-center gap-2 rounded-xl
                  bg-gradient-to-r from-[#8A5CFF] to-[#537CF2]
                  px-3.5 py-2 text-sm font-semibold text-white
                  ring-1 ring-white/10 hover:shadow-[0_6px_22px_rgba(83,124,242,.35)]
                  transition
                "
                download
              >
                <FiDownload className="h-4 w-4" />
                Descargar CV
              </a>
            </div>

            {/* Toggle móvil */}
            <button
              className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition"
              onClick={() => setOpen((o) => !o)}
              aria-label="Abrir/cerrar menú"
              aria-expanded={open}
            >
              {open ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>

          {/* Menú móvil */}
          <div
            className={[
              "md:hidden overflow-hidden transition-[max-height,opacity] duration-300",
              open ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
            ].join(" ")}
          >
            <div className="px-3 pb-3 grid gap-1">
              {LINKS.map((l) => (
                <a
                  key={l.id}
                  href={l.href}
                  ref={(el) => {
                    linkRefs.current[l.id] = el;
                  }}
                  className={[
                    "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    active === l.id ? "text-white bg-white/10" : "text-slate-200 hover:text-white hover:bg-white/5",
                  ].join(" ")}
                  onClick={handleNavClick(l.href, l.id)}
                >
                  {l.label}
                </a>
              ))}

              <div className="mt-1 flex items-center gap-2">
                <a
                  href="https://github.com/DPBascur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-white/10 text-white py-2 hover:bg-white/15 transition"
                >
                  <FaGithub className="h-4 w-4" />
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/daniel-pe%C3%B1a-0ba014384/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-white/10 text-white py-2 hover:bg-white/15 transition"
                >
                  <FaLinkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </div>

              <a
                href="/CV_DanielBascur.pdf"
                download
                className="
                  mt-2 inline-flex items-center justify-center gap-2 rounded-xl
                  bg-gradient-to-r from-[#8A5CFF] to-[#537CF2]
                  px-4 py-2.5 text-sm font-semibold text-white w-full
                  ring-1 ring-white/10
                "
              >
                <FiDownload className="h-4 w-4" />
                Descargar CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}