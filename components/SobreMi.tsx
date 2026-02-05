"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaCss3Alt, FaDocker, FaFileExcel, FaGit, FaHtml5, FaJs, FaNodeJs, FaReact } from "react-icons/fa";
import { TbApi, TbPlugConnected } from "react-icons/tb";
import {
  SiDjango,
  SiExpo,
  SiGithub,
  SiLatex,
  SiLinux,
  SiNginx,
  SiNextdotjs,
  SiPostgresql,
  SiSap,
  SiSqlite,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

/* ===== data ===== */
type Skill = { name: string; Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; color: string };
type SkillGroup = { title: string; items: Skill[] };
const skillGroups: SkillGroup[] = [
  {
    title: "Front-End",
    items: [
      { name: "React", Icon: FaReact, color: "text-cyan-400" },
      { name: "Next.js", Icon: SiNextdotjs, color: "text-white" },
      { name: "TypeScript", Icon: SiTypescript, color: "text-blue-500" },
      { name: "JavaScript", Icon: FaJs, color: "text-yellow-400" },
      { name: "Tailwind CSS", Icon: SiTailwindcss, color: "text-sky-400" },
      { name: "NativeWind", Icon: SiTailwindcss, color: "text-sky-300" },
      { name: "HTML5", Icon: FaHtml5, color: "text-orange-500" },
      { name: "CSS3", Icon: FaCss3Alt, color: "text-blue-500" },
      { name: "UI/UX (usabilidad)", Icon: FaReact, color: "text-pink-300" },
    ],
  },
  {
    title: "Mobile",
    items: [
      { name: "React Native", Icon: FaReact, color: "text-purple-400" },
      { name: "Expo", Icon: SiExpo, color: "text-gray-200" },
    ],
  },
  {
    title: "Back-End",
    items: [
      { name: "Node.js", Icon: FaNodeJs, color: "text-green-500" },
      { name: "Django", Icon: SiDjango, color: "text-emerald-300" },
      { name: "APIs REST", Icon: TbApi, color: "text-indigo-300" },
      { name: "WebSockets (básico)", Icon: TbPlugConnected, color: "text-indigo-200" },
    ],
  },
  {
    title: "Bases de Datos",
    items: [
      { name: "SQLite", Icon: SiSqlite, color: "text-blue-300" },
      { name: "PostgreSQL", Icon: SiPostgresql, color: "text-blue-400" },
      { name: "SQL", Icon: SiPostgresql, color: "text-blue-200" },
    ],
  },
  {
    title: "DevOps / Infraestructura",
    items: [
      { name: "Docker", Icon: FaDocker, color: "text-sky-400" },
      { name: "Nginx", Icon: SiNginx, color: "text-green-400" },
      { name: "Linux (VPS)", Icon: SiLinux, color: "text-yellow-200" },
      { name: "Git", Icon: FaGit, color: "text-red-500" },
      { name: "GitHub", Icon: SiGithub, color: "text-gray-200" },
    ],
  },
  {
    title: "Herramientas y otros",
    items: [
      { name: "Excel (avanzado)", Icon: FaFileExcel, color: "text-green-400" },
      { name: "SAP", Icon: SiSap, color: "text-sky-200" },
      { name: "LaTeX", Icon: SiLatex, color: "text-emerald-400" },
    ],
  },
];

/* ===== hook in-view ===== */
function useInView<T extends Element>(opts?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setVisible(true)),
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px", ...opts }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [opts]);
  return { ref, visible };
}

const SobreMi = () => {
  const title = useInView<HTMLHeadingElement>();
  const p1 = useInView<HTMLParagraphElement>();
  const p2 = useInView<HTMLParagraphElement>();
  const p3 = useInView<HTMLParagraphElement>();
  const p4 = useInView<HTMLParagraphElement>();
  const skillsWrap = useInView<HTMLDivElement>();
  const imageWrap = useInView<HTMLDivElement>();

  return (
    <section id="sobre-mi" className="py-16 bg-[#0B1020]">
      <div className="container mx-auto px-4">
        {/* Título */}
        <h2
          ref={title.ref}
          className={[
            "text-4xl font-bold text-white mb-8 text-center transition-all duration-700",
            title.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
          ].join(" ")}
        >
          Sobre Mí
        </h2>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Texto */}
          <div className="space-y-6">
            <p
              ref={p1.ref}
              className={[
                "text-gray-300 leading-relaxed transition-all duration-700 delay-100",
                p1.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
              ].join(" ")}
            >
              Soy desarrollador Full Stack con orientación al Front-End, actualmente en la etapa final de la carrera de Ingeniería Civil en
              Informática. Me enfoco en el desarrollo de aplicaciones web y móviles, cuidando tanto la experiencia de usuario como la
              estructura y mantenibilidad del código.
            </p>

            <p
              ref={p2.ref}
              className={[
                "text-gray-300 leading-relaxed transition-all duration-700 delay-200",
                p2.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
              ].join(" ")}
            >
              He participado en proyectos académicos y reales que incluyen plataformas web, aplicaciones móviles y sistemas de gestión,
              integrando funcionalidades como autenticación, roles de usuario, dashboards, consumo de APIs y manejo de bases de datos.
            </p>

            <p
              ref={p3.ref}
              className={[
                "text-gray-300 leading-relaxed transition-all duration-700 delay-300",
                p3.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
              ].join(" ")}
            >
              Durante mi práctica profesional he podido trabajar con procesos empresariales reales, lo que me permitió entender la
              importancia de la eficiencia, la automatización y la seguridad en sistemas utilizados diariamente por usuarios no técnicos.
            </p>

            <p
              ref={p4.ref}
              className={[
                "text-gray-300 leading-relaxed transition-all duration-700 delay-400",
                p4.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
              ].join(" ")}
            >
              Actualmente me encuentro fortaleciendo mis conocimientos en buenas prácticas de desarrollo, arquitectura de software y
              seguridad de aplicaciones, con el objetivo de crear soluciones confiables, claras y preparadas para entornos productivos.
            </p>

            {/* Skills */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-white">Habilidades Técnicas</h3>
              <div ref={skillsWrap.ref} className="space-y-5">
                {skillGroups.map((group, groupIndex) => {
                  const offset = skillGroups
                    .slice(0, groupIndex)
                    .reduce((acc, g) => acc + g.items.length, 0);

                  return (
                    <div key={group.title} className="space-y-2">
                      <h4 className="text-sm font-semibold text-gray-200 tracking-wide">{group.title}</h4>
                      <div className="flex flex-wrap gap-3">
                        {group.items.map(({ name, Icon, color }, itemIndex) => {
                          const i = offset + itemIndex;
                          return (
                            <span
                              key={name}
                              style={{ transitionDelay: `${skillsWrap.visible ? 60 * i : 0}ms` }}
                              className={[
                                "bg-[#1E293B] text-white px-4 py-2 rounded-full text-sm flex items-center gap-2",
                                "transition-all duration-500 hover:bg-[#2E3B4B] hover:-translate-y-0.5",
                                skillsWrap.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
                                "shadow-[0_0_0_0_rgba(0,0,0,0)] hover:shadow-[0_6px_20px_rgba(83,124,242,.25)]",
                              ].join(" ")}
                            >
                              <Icon className={["h-4 w-4", color].join(" ")} />
                              {name}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Imagen con borde NEÓN */}
          <div
            ref={imageWrap.ref}
            className={[
              "relative w-full max-w-md mx-auto transition-all duration-700 group",
              imageWrap.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
            ].join(" ")}
          >
            {/* Glow exterior */}
            <div
              className="absolute -inset-4 rounded-3xl pointer-events-none blur-3xl opacity-40 group-hover:opacity-70 transition-opacity duration-500 animate-pulse"
              style={{
                background:
                  "linear-gradient(135deg,#537CF2 0%,#6C6FFB 50%,#8A5CFF 100%)",
              }}
            />
            {/* Marco gradiente */}
            <div
              className="relative w-full rounded-2xl p-0.5 transition-shadow duration-500 shadow-[0_0_22px_rgba(83,124,242,.25)] group-hover:shadow-[0_0_40px_rgba(108,111,251,.45)]"
              style={{
                background:
                  "linear-gradient(135deg,#537CF2 0%,#6C6FFB 50%,#8A5CFF 100%)",
              }}
            >
              <div className="relative h-[400px] w-full rounded-2xl overflow-hidden bg-black/20 ring-1 ring-white/10">
                <Image
                  src="/Dani2.png"
                  alt="Foto de Daniel"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SobreMi;