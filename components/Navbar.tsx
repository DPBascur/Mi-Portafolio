"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type NavItem = { id: string; label: string; href: string };

const LINKS: NavItem[] = [
  { id: "inicio", label: "Inicio", href: "#inicio" },
  { id: "proyectos", label: "Proyectos", href: "#proyectos" },
  { id: "sobre-mi", label: "Sobre Mí", href: "#sobre-mi" },
  { id: "contacto", label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("inicio");

  // refs a <a> por id
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  // scroll-spy básico
  useEffect(() => {
    const onScroll = () => {
      const hits = LINKS.map((l) => {
        const el = document.getElementById(l.id);
        if (!el) return { id: l.id, top: Number.POSITIVE_INFINITY };
        const r = el.getBoundingClientRect();
        return { id: l.id, top: r.top };
      });

      // sección más cercana a la parte superior (visible)
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

  const classLink = (id: string) =>
    [
      "px-3 py-2 rounded-md text-sm font-medium transition-colors",
      active === id
        ? "text-white bg-white/10"
        : "text-slate-200 hover:text-white hover:bg-white/5",
    ].join(" ");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0F172A]/80 backdrop-blur p-2 border-b border-[#1E293B] m-3 rounded-[12px]">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold flex items-center gap-2">
          <Image src="/LogoDPB.png" alt="Logo" width={32} height={32} />
          DPBascur
        </Link>

        <button
          className="md:hidden text-white px-3 py-2 rounded hover:bg-white/10"
          onClick={() => setOpen((o) => !o)}
          aria-label="Abrir/cerrar menú"
        >
          ☰
        </button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={l.href}
              ref={(el) => {
                // ✅ callback ref SIN return
                linkRefs.current[l.id] = el;
              }}
              className={classLink(l.id)}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>

      {/* Mobile */}
      {open && (
        <div className="md:hidden mt-2 grid gap-1">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={l.href}
              ref={(el) => {
                linkRefs.current[l.id] = el;
              }}
              className={classLink(l.id)}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}