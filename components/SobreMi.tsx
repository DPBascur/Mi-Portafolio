"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaJs, FaReact, FaPython, FaGit, FaNodeJs } from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiPostgresql, SiLatex } from "react-icons/si";

/* ===== data ===== */
type Skill = { name: string; Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; color: string };
const skills: Skill[] = [
  { name: "JavaScript", Icon: FaJs, color: "text-yellow-400" },
  { name: "TypeScript", Icon: SiTypescript, color: "text-blue-500" },
  { name: "React", Icon: FaReact, color: "text-cyan-400" },
  { name: "React Native", Icon: FaReact, color: "text-purple-400" },
  { name: "Next.js", Icon: SiNextdotjs, color: "text-white" },
  { name: "Node.js", Icon: FaNodeJs, color: "text-green-500" },
  { name: "Python", Icon: FaPython, color: "text-yellow-300" },
  { name: "SQL", Icon: SiPostgresql, color: "text-blue-400" },
  { name: "Git", Icon: FaGit, color: "text-red-500" },
  // ✅ Nuevo
  { name: "LaTeX", Icon: SiLatex, color: "text-emerald-400" },
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
              Soy un desarrollador Full Stack orientado al Front-End. Trabajo en el desarrollo web y aplicaciones móviles, utilizando
              tecnologías modernas como React, React Native, Next.js y Node.js, entre otras.
            </p>

            <p
              ref={p2.ref}
              className={[
                "text-gray-300 leading-relaxed transition-all duration-700 delay-200",
                p2.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
              ].join(" ")}
            >
              He trabajado en proyectos diversos, desde plataformas web hasta apps móviles. Me enfoco
              en crear experiencias atractivas para las personas, siempre cuidando la usabilidad y el
              detalle visual.
            </p>

            {/* Skills */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-white">Habilidades Técnicas</h3>
              <div ref={skillsWrap.ref} className="flex flex-wrap gap-3">
                {skills.map(({ name, Icon, color }, i) => (
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
                ))}
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
                  src="/yo.jpg"
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