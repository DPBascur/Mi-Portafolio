"use client";

import Image from "next/image";
import React, { useMemo, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, useTexture, AdaptiveDpr, Preload } from "@react-three/drei";
import * as THREE from "three";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiMail, FiDownload } from "react-icons/fi";

type ActiveRef = React.MutableRefObject<boolean>;

export default function PortfolioHero3D() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const activeRef = useRef(true);

  // Pausar animación si el hero no está visible
  useEffect(() => {
    if (!wrapRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => (activeRef.current = entry.isIntersecting),
      { threshold: 0.1 }
    );
    obs.observe(wrapRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative">
      <div
        ref={wrapRef}
        className="
          relative mx-1 sm:mx-2 md:mx-3 lg:mx-4
          h-[92svh] sm:h-[88vh]            /* ⬅️ más alto y con svh para iOS */
          min-h-[760px] sm:min-h-[640px]   /* ⬅️ asegura espacio en móviles */
          overflow-hidden
          rounded-b-[72px] md:rounded-b-[96px]
          ring-1 ring-white/5
          bg-[#0B1020] text-white
        "
      >
        {/* Glows sutiles */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(600px circle at 20% 10%, #537CF233, transparent 60%)," +
              "radial-gradient(520px circle at 80% 20%, #8A5CFF22, transparent 55%)," +
              "radial-gradient(800px circle at 50% 80%, #22D3EE22, transparent 60%)",
          }}
        />

        {/* Escena 3D */}
        <Canvas
          camera={{ position: [0, 0, 6], fov: 50 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            preserveDrawingBuffer: false,
          }}
          dpr={[1, 1.5]}
        >
          {/* @ts-ignore */}
          <color attach="background" args={["#0B1020"]} />
          <AdaptiveDpr />
          <Preload all />

          <Stars radius={80} depth={50} count={5500} factor={4} fade speed={0.6} />
          <ambientLight intensity={1.1} />
          <directionalLight position={[4, 6, 4]} intensity={1.5} />
          <LogoRain activeRef={activeRef} />
        </Canvas>

        {/* Aurora */}
        <div
          className="
            pointer-events-none absolute inset-x-0 bottom-0
            h-[45%]
            blur-2xl md:blur-[28px] lg:blur-[36px]
            mix-blend-screen
            bg-gradient-to-t from-[#8A5CFF59] via-[#6C6FFB47] to-transparent
          "
          style={{
            maskImage: "linear-gradient(to top, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 95%)",
            WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 95%)",
          }}
        />

        {/* Overlay UI */}
        <div
          className="
            pointer-events-none absolute inset-x-0 top-0
            flex h-full justify-center items-start
            pt-[16svh] sm:pt-[18vh]
            pb-28 sm:pb-[12vh]              /* ⬅️ más espacio abajo por si se apilan botones */
          "
          style={{
            // Asegura espacio extra en iPhone con notch
            paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 112px)",
          }}
        >
          <div className="mx-auto w-full max-w-5xl text-center px-4 sm:px-6">
            <h1 className="text-[clamp(32px,6vw,64px)] font-bold tracking-tight drop-shadow-[0_0_30px_rgba(83,124,242,.65)]">
              DPBascur — UI/UX & Dev
            </h1>

            <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-slate-300/85">
              React · TypeScript · Python · React Native · Node — Soy un Estudiante de
              Ingeniería Civil en Informática de 4to año, amante de la creación de
              aplicaciones tanto web como móviles.
            </p>

            <Image
              src="/dani.jpg"
              alt="Foto de perfil"
              width={200}
              height={200}
              className="mx-auto mt-6 sm:mt-8 rounded-full border-2 border-white/30 shadow-lg"
              priority
            />

            {/* Botones */}
            <div className="mt-6 pointer-events-auto z-20">
              {/* Grid responsiva: 1 col (xs), 2 cols (sm), 4 cols (md+) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
                <ButtonHero href="https://github.com/DPBascur" icon={<FaGithub className="h-5 w-5" />}>
                  GitHub
                </ButtonHero>

                <ButtonHero
                  href="https://www.linkedin.com/in/daniel-pe%C3%B1a-0ba014384/"
                  icon={<FaLinkedin className="h-5 w-5" />}
                >
                  LinkedIn
                </ButtonHero>

                <ButtonHero href="mailto:dpbascur.dev@gmail.com" icon={<FiMail className="h-5 w-5" />}>
                  dpbascur.dev@gmail.com
                </ButtonHero>

                <ButtonHero href="/CV_DanielBascur.pdf" download icon={<FiDownload className="h-5 w-5" />}>
                  Descargar CV
                </ButtonHero>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** ===================== Botón reutilizable ===================== */
function ButtonHero({
  href,
  children,
  icon,
  download,
}: {
  href: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  download?: boolean;
}) {
  return (
    <a
      href={href}
      {...(download ? { download: true } : {})}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="
        inline-flex w-full items-center justify-center gap-2
        rounded-full bg-gradient-to-r from-[#8A5CFF] to-[#537CF2]
        px-4 py-3
        min-h-[44px]
        text-sm sm:text-base font-semibold text-white
        ring-1 ring-white/10
        shadow-lg shadow-[#537CF233]
        transition hover:shadow-[#537CF266]
        active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60
      "
    >
      {icon}
      <span className="truncate">{children}</span>
    </a>
  );
}

/** ============== Logos cayendo (con aspecto correcto y fade-in) ============== */
function LogoRain({ activeRef }: { activeRef: ActiveRef }) {
  const urls = useMemo(
    () => [
      "/logos/Python.png",
      "/logos/JavaScript.png",
      "/logos/TS.png",
      "/logos/React.png",
      "/logos/HTML.png",
      "/logos/css.png",
      "/logos/tailwindcss.png",
      "/logos/java.png",
      "/logos/Microsoft.png",
      "/logos/Next.png",
      "/logos/Node.png",
      "/logos/Docker.png",
      "/logos/Django.png",
    ],
    []
  );

  const textures = useTexture(urls) as THREE.Texture[];
  useEffect(() => {
    textures.forEach((t) => {
      if ("colorSpace" in t) (t as any).colorSpace = (THREE as any).SRGBColorSpace;
      else (t as any).encoding = (THREE as any).sRGBEncoding;
      t.anisotropy = 2;
      t.minFilter = THREE.LinearMipmapLinearFilter;
      t.magFilter = THREE.LinearFilter;
      t.generateMipmaps = true;
      t.needsUpdate = true;
    });
  }, [textures]);

  // Spawn más bajo para aparecer rápido
  const items = useMemo(
    () =>
      Array.from({ length: 48 }, (_, i) => {
        const tex = textures[i % textures.length];
        return {
          tex,
          x: (Math.random() - 0.5) * 14,
          y: 4 + Math.random() * 2.5,
          z: Math.random() * -8,
          s: 0.35 + Math.random() * 0.4,
          speed: 0.12 + Math.random() * 0.25,
        };
      }),
    [textures]
  );

  // Inercia por scroll
  const scrollMomentum = useRef(0);
  const lastY = useRef(0);
  useEffect(() => {
    if (typeof window === "undefined") return;
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY.current;
      lastY.current = y;
      scrollMomentum.current += dy * 0.015;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame((_, dt) => {
    scrollMomentum.current *= Math.pow(0.9, dt * 60);
  });

  return (
    <group>
      {items.map((p, idx) => (
        <InteractiveLogo
          key={idx}
          texture={p.tex}
          x={p.x}
          y={p.y}
          z={p.z}
          s={p.s}
          speed={p.speed}
          scrollRef={scrollMomentum}
          activeRef={activeRef}
        />
      ))}
    </group>
  );
}

function InteractiveLogo({
  texture,
  x,
  y,
  z,
  s,
  speed,
  scrollRef,
  activeRef,
}: {
  texture: THREE.Texture;
  x: number;
  y: number;
  z: number;
  s: number;
  speed: number;
  scrollRef: React.MutableRefObject<number>;
  activeRef: ActiveRef;
}) {
  const group = useRef<THREE.Group>(null!);
  const hover = useRef(false);
  const matRef = useRef<THREE.MeshBasicMaterial>(null!);

  // Mantener proporción del PNG/SVG
  const getAspect = () => {
    const img: any = (texture as any).source?.data ?? (texture as any).image;
    const w = img?.width ?? img?.naturalWidth ?? 1;
    const h = img?.height ?? img?.naturalHeight ?? 1;
    return w && h ? w / h : 1;
  };
  const [aspect, setAspect] = useState(1);
  useEffect(() => setAspect(getAspect()), [texture]);

  // Fade-in inicial
  const [visibleTarget, setVisibleTarget] = useState(1);
  useEffect(() => {
    if (matRef.current) matRef.current.opacity = 0.15;
    setVisibleTarget(1);
  }, []);

  useFrame((state, dt) => {
    if (!group.current || !activeRef.current) return;

    const g = group.current;
    const fall = hover.current ? speed * 0.35 : speed;

    g.position.y -= (fall + scrollRef.current) * dt;
    if (hover.current) g.position.y += 0.25 * dt;

    g.position.x += Math.sin(state.clock.elapsedTime * 0.2 + g.position.y) * 0.01;

    const targetScale = hover.current ? 1.25 : 1.0;
    const dampScale = THREE.MathUtils.damp(g.scale.x, targetScale, 8, dt);
    g.scale.setScalar(dampScale);

    if (matRef.current) {
      matRef.current.opacity = THREE.MathUtils.damp(matRef.current.opacity, visibleTarget, 16, dt);
    }

    if (g.position.y < -7) {
      g.position.y = 6.5 + Math.random() * 1.5;
      g.position.x = (Math.random() - 0.5) * 14;
      g.position.z = Math.random() * -8;
      g.scale.setScalar(1);
      if (matRef.current) matRef.current.opacity = 0.15;
      setVisibleTarget(1);
    }
  });

  const onOver = (e: any) => {
    e.stopPropagation();
    hover.current = true;
    if (typeof document !== "undefined") document.body.style.cursor = "pointer";
  };
  const onOut = (e: any) => {
    e.stopPropagation();
    hover.current = false;
    if (typeof document !== "undefined") document.body.style.cursor = "";
  };

  const height = s;
  const width = s * aspect;

  return (
    <group ref={group} position={[x, y, z]} onPointerOver={onOver} onPointerOut={onOut}>
      <mesh>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial
          ref={matRef}
          map={texture}
          transparent
          depthWrite={false}
          alphaTest={0.05}     
          side={THREE.DoubleSide}
          toneMapped={false}
          opacity={0.15}
        />
      </mesh>
    </group>
  );
}