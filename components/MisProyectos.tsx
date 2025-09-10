"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaDocker,
  FaGit,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiMongodb,
  SiTailwindcss,
  SiPostgresql,
  SiTypescript,
  SiExpress,
  SiPrisma,
  SiVite,
  SiSqlite,
  SiExpo,      // Expo
  SiDjango,    // Django
  SiBlazor,    // ✅ Blazor (faltaba)
} from "react-icons/si";
import { TbWind } from "react-icons/tb";

/* ========= Tipado ========= */
interface Proyecto {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  tecnologias: string[];
  githubUrl?: string;
  demoUrl?: string;
  /** Si es true, la tarjeta se muestra como Próximamente (deshabilita acciones) */
  comingSoon?: boolean;
}

/* ========= Data de ejemplo ========= */
const proyectos: Proyecto[] = [
  {
    id: 1,
    titulo: "AraucariApp",
    descripcion:
      "Trabajo para la Municipalidad de Temuco en respuesta a la problemática de la Agenda para los Adultos mayores del sector.",
    imagen: "/AraucaniaApp.png",
    tecnologias: ["React", "React Native", "Expo", "NativeWind", "SQLite", "Django", "Tailwind"],
    githubUrl: "https://github.com/Linich14/INFO1166_G1-Programa-Proteccion-Adulto-Mayor-Temuco",
  },
  {
    id: 2,
    titulo: "Infracheck",
    descripcion:
      "Infracheck es una plataforma ciudadana para Temuco que permite reportar y geolocalizar problemas de infraestructura con fotos, seguimiento y métricas públicas.",
    imagen: "/InfraCheck.png",
    tecnologias: ["React Native", "TypeScript", "PostgreSQL", "NativeWind", "Docker", "Expo"],
    githubUrl: "https://github.com/Linich14/G3-INFO1173-Infracheck",
    comingSoon: true,
  },
  {
    id: 3,
    titulo: "TemuComercio",
    descripcion:
      "Gestión del comercio ambulante: asigna puestos, gestiona permisos, búsqueda de vendedores y panel para fiscalizadores.",
    imagen: "/TemuComercio.png",
    tecnologias: ["React Native", "NativeWind", "PostgreSQL", "Blazor", "Tailwind"],
    githubUrl: "https://github.com/Linich14/TemuComercio-INFO1189-G4",
    comingSoon: true,
  },
];

/* ========= Map de iconos por tecnología ========= */
type IconDef = {
  Icon: React.ComponentType<{ className?: string }>;
  color?: string; // tailwind optional
};
const TECH_ICON_MAP: Record<string, IconDef> = {
  React: { Icon: FaReact, color: "text-cyan-400" },
  "React Native": { Icon: FaReact, color: "text-purple-400" },
  "Next.js": { Icon: SiNextdotjs, color: "text-white" },
  TypeScript: { Icon: SiTypescript, color: "text-blue-500" },
  JavaScript: { Icon: FaJs, color: "text-yellow-400" },
  Node: { Icon: FaNodeJs, color: "text-green-500" },
  "Node.js": { Icon: FaNodeJs, color: "text-green-500" },
  Express: { Icon: SiExpress, color: "text-white" },
  MongoDB: { Icon: SiMongodb, color: "text-green-500" },
  PostgreSQL: { Icon: SiPostgresql, color: "text-blue-400" },
  Tailwind: { Icon: SiTailwindcss, color: "text-cyan-400" },
  TailwindCSS: { Icon: SiTailwindcss, color: "text-cyan-400" },
  Prisma: { Icon: SiPrisma, color: "text-white" },
  Vite: { Icon: SiVite, color: "text-purple-400" },
  Docker: { Icon: FaDocker, color: "text-blue-400" },
  Python: { Icon: FaPython, color: "text-yellow-300" },
  HTML: { Icon: FaHtml5, color: "text-orange-500" },
  CSS: { Icon: FaCss3Alt, color: "text-blue-500" },
  Git: { Icon: FaGit, color: "text-red-500" },
  SQLite: { Icon: SiSqlite, color: "text-blue-400" },
  Sql: { Icon: SiSqlite, color: "text-blue-400" },
  NativeWind: { Icon: TbWind, color: "text-cyan-300" },
  Expo: { Icon: SiExpo, color: "text-white" },
  Django: { Icon: SiDjango, color: "text-green-500" },
  Blazor: { Icon: SiBlazor, color: "text-indigo-300" }, // ✅ nuevo
};

/* ========= Hook: in-view ========= */
function useInView<T extends Element>(opts?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setVisible(true));
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px", ...opts }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [opts]);
  return { ref, visible };
}

/* ========= Chip de tecnología ========= */
function TechChip({ name }: { name: string }) {
  const def = TECH_ICON_MAP[name] || TECH_ICON_MAP[name.replace(".js", "")] || null;
  const Ico = def?.Icon;
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs text-slate-200 bg-[#0B1020] ring-1 ring-white/10">
      {Ico ? <Ico className={["h-3.5 w-3.5", def?.color || ""].join(" ")} /> : null}
      {name}
    </span>
  );
}

/* ========= Badge Próximamente ========= */
function SoonBadge() {
  return (
    <div
      className="absolute left-3 top-3 z-10 select-none rounded-full px-2.5 py-1 text-[11px] font-semibold text-white shadow"
      style={{
        background:
          "linear-gradient(135deg,#8A5CFF 0%,#6C6FFB 50%,#537CF2 100%)",
        boxShadow: "0 0 18px rgba(99,102,241,.35)",
      }}
    >
      Próximamente
    </div>
  );
}

/* ========= Card de proyecto ========= */
function ProyectoCard({
  proyecto,
  index,
}: {
  proyecto: Proyecto;
  index: number;
}) {
  const { ref, visible } = useInView<HTMLDivElement>();
  const [hover, setHover] = useState(false);

  const isSoon = Boolean(proyecto.comingSoon);

  return (
    <div
      ref={ref}
      className={[
        "group relative h-full transition-all duration-700",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
        isSoon ? "cursor-not-allowed" : "",
      ].join(" ")}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-disabled={isSoon}
    >
      {/* Borde gradiente */}
      <div
        className="relative h-full rounded-xl p-[1.5px] shadow-[0_0_28px_rgba(83,124,242,.18)] hover:shadow-[0_0_40px_rgba(108,111,251,.35)] transition-shadow"
        style={{
          background:
            "linear-gradient(135deg,#537CF2 0%,#6C6FFB 50%,#8A5CFF 100%)",
        }}
      >
        {/* Card */}
        <div className="flex h-full flex-col rounded-[12px] bg-[#0F172A]/75 backdrop-blur-md overflow-hidden">
          {/* Imagen */}
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            {isSoon && <SoonBadge />}

            <Image
              src={proyecto.imagen}
              alt={proyecto.titulo}
              fill
              className={[
                "object-cover transition-transform duration-700 group-hover:scale-105",
                isSoon ? "grayscale opacity-80" : "",
              ].join(" ")}
              sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
              priority={index === 0}
            />

            {/* Overlay acciones (solo si NO es próximamente) */}
            {!isSoon && (
              <div
                className={[
                  "absolute inset-0 flex items-center justify-center gap-4",
                  "bg-black/0 transition-all duration-300",
                  hover ? "bg-black/40 opacity-100" : "opacity-0",
                ].join(" ")}
              >
                {proyecto.githubUrl && (
                  <Link
                    href={proyecto.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Código en GitHub: ${proyecto.titulo}`}
                    className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/90 text-black hover:bg-white transition shadow"
                    title="Ver código"
                  >
                    <FaGithub className="w-6 h-6" />
                  </Link>
                )}

                {proyecto.demoUrl && (
                  <Link
                    href={proyecto.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Demo: ${proyecto.titulo}`}
                    className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/90 text-black hover:bg-white transition shadow"
                    title="Ver demo"
                  >
                    <FaExternalLinkAlt className="w-5 h-5" />
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Contenido */}
          <div className="flex flex-1 flex-col p-5">
            <h3 className="text-lg font-semibold text-white mb-2">{proyecto.titulo}</h3>

            <p className="text-slate-300 text-sm mb-4 min-h-[64px] max-h-[96px] overflow-hidden">
              {proyecto.descripcion}
            </p>

            {/* Tecnologías */}
            <div className="mt-auto flex flex-wrap gap-2">
              {proyecto.tecnologias.map((tech) => (
                <TechChip key={tech} name={tech} />
              ))}
            </div>

            {/* Acciones móviles */}
            <div className="mt-4 flex gap-3 md:hidden">
              {isSoon ? (
                <span
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold text-white"
                  style={{
                    background:
                      "linear-gradient(135deg,#8A5CFF 0%,#6C6FFB 50%,#537CF2 100%)",
                  }}
                >
                  Próximamente
                </span>
              ) : (
                <>
                  {proyecto.githubUrl && (
                    <Link
                      href={proyecto.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium text-white"
                      style={{
                        background:
                          "linear-gradient(135deg,#8A5CFF 0%,#6C6FFB 50%,#537CF2 100%)",
                      }}
                    >
                      <FaGithub className="w-4 h-4" />
                      Código
                    </Link>
                  )}

                  {proyecto.demoUrl && (
                    <Link
                      href={proyecto.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium text-white bg-white/10 hover:bg-white/15"
                    >
                      <FaExternalLinkAlt className="w-3.5 h-3.5" />
                      Demo
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Capa bloqueadora para evitar clicks si es próximamente (desktop) */}
          {isSoon && <div className="absolute inset-0 pointer-events-auto" />}
        </div>
      </div>
    </div>
  );
}

/* ========= Sección ========= */
export default function MisProyectos() {
  const title = useInView<HTMLHeadingElement>();

  return (
    <section id="proyectos" className="py-16 bg-[#0B1020] scroll-mt-28">
      <div className="container mx-auto px-4">
        <h2
          ref={title.ref}
          className={[
            "text-4xl font-bold text-white mb-12 text-center transition-all duration-700",
            title.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
          ].join(" ")}
        >
          Mis Proyectos
        </h2>

        {/* Grid con alturas uniformes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[1fr]">
          {proyectos.map((proyecto, i) => (
            <ProyectoCard key={proyecto.id} proyecto={proyecto} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}