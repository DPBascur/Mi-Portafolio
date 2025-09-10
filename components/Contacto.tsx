"use client";

import { useState } from "react";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaPhone,
  FaCopy,
  FaCheck,
} from "react-icons/fa";

const CONTACT = {
  email: "dpbascur.dev@gmail.com",
  github: "https://github.com/DPBascur",
  linkedin: "https://www.linkedin.com/in/daniel-pe%C3%B1a-0ba014384/",
  phone: "+56 9 9294 0729", // ← Reemplaza por tu número real
};

export default function Contacto() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (value: string, id: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(id);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      // fallback: abre prompt (algunos navegadores muy viejos)
      window.prompt("Copia este valor:", value);
    }
  };

  const telHref = `tel:${CONTACT.phone.replace(/\s+/g, "")}`;

  return (
    <section id="contacto" className="py-16 bg-[#0B1020] scroll-mt-28">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white mb-8 text-center">Contacto</h2>

        <div className="relative max-w-3xl mx-auto">
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
              <p className="text-slate-300 text-center mb-6">
                ¿Hablamos? Aquí tienes mis datos directos 👇
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                {/* Email */}
                <div className="flex items-center justify-between rounded-xl p-4 bg-[#1E293B] ring-1 ring-white/10">
                  <div className="flex items-center gap-3">
                    <FaEnvelope className="text-white/90" />
                    <div>
                      <p className="text-slate-400 text-xs">Email</p>
                      <a
                        href={`mailto:${CONTACT.email}`}
                        className="text-white font-medium hover:underline break-all"
                      >
                        {CONTACT.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copy(CONTACT.email, "email")}
                    className="ml-4 inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 text-white transition"
                    aria-label="Copiar email"
                    title="Copiar email"
                  >
                    {copied === "email" ? <FaCheck /> : <FaCopy />}
                  </button>
                </div>

                {/* Teléfono */}
                <div className="flex items-center justify-between rounded-xl p-4 bg-[#1E293B] ring-1 ring-white/10">
                  <div className="flex items-center gap-3">
                    <FaPhone className="text-white/90" />
                    <div>
                      <p className="text-slate-400 text-xs">Teléfono</p>
                      <a
                        href={telHref}
                        className="text-white font-medium hover:underline"
                      >
                        {CONTACT.phone}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copy(CONTACT.phone, "phone")}
                    className="ml-4 inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 text-white transition"
                    aria-label="Copiar teléfono"
                    title="Copiar teléfono"
                  >
                    {copied === "phone" ? <FaCheck /> : <FaCopy />}
                  </button>
                </div>

                {/* GitHub */}
                <div className="flex items-center justify-between rounded-xl p-4 bg-[#1E293B] ring-1 ring-white/10">
                  <div className="flex items-center gap-3">
                    <FaGithub className="text-white/90" />
                    <div>
                      <p className="text-slate-400 text-xs">GitHub</p>
                      <a
                        href={CONTACT.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white font-medium hover:underline break-all"
                      >
                        {CONTACT.github.replace("https://", "")}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copy(CONTACT.github, "github")}
                    className="ml-4 inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 text-white transition"
                    aria-label="Copiar URL de GitHub"
                    title="Copiar URL de GitHub"
                  >
                    {copied === "github" ? <FaCheck /> : <FaCopy />}
                  </button>
                </div>

                {/* LinkedIn */}
                <div className="flex items-center justify-between rounded-xl p-4 bg-[#1E293B] ring-1 ring-white/10">
                  <div className="flex items-center gap-3">
                    <FaLinkedin className="text-white/90" />
                    <div>
                      <p className="text-slate-400 text-xs">LinkedIn</p>
                      <a
                        href={CONTACT.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white font-medium hover:underline break-all"
                      >
                        {CONTACT.linkedin.replace("https://", "")}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copy(CONTACT.linkedin, "linkedin")}
                    className="ml-4 inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 text-white transition"
                    aria-label="Copiar URL de LinkedIn"
                    title="Copiar URL de LinkedIn"
                  >
                    {copied === "linkedin" ? <FaCheck /> : <FaCopy />}
                  </button>
                </div>
              </div>

              {/* pie */}
              <div className="mt-6 text-sm text-slate-400 text-center">
                También puedes escribirme directo a{" "}
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-white hover:underline"
                >
                  {CONTACT.email}
                </a>
                .
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}