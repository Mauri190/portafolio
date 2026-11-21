"use client";
import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("¡Mensaje listo! Luego lo conectamos a tu correo o API.");
    e.currentTarget.reset();
  };

  return (
    <section id="contacto" className="py-20 bg-[#121c18]">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-[#ffb21f] font-bold text-sm mb-1">Contacto</p>
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#ece9e2] mb-2">Hablemos</h2>
        <p className="text-[#9fada6] mb-10">¿Tienes una idea, una oportunidad o quieres competir conmigo? Escríbeme.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ul className="space-y-3">
            <li className="p-4 rounded-xl border border-[#2f403a] bg-[#17221e]">
              <strong className="block text-xs text-[#9fada6]">Instagram</strong>
              <a href="https://www.instagram.com/magu_023/" target="_blank" rel="noopener noreferrer" className="text-[#6fd9a3] font-bold hover:underline">
                @magu_023
              </a>
            </li>
            <li className="p-4 rounded-xl border border-[#2f403a] bg-[#17221e]">
              <strong className="block text-xs text-[#9fada6]">Perfil Oficial WCA</strong>
              <a href="https://www.worldcubeassociation.org/persons/2024RIVE33" target="_blank" rel="noopener noreferrer" className="text-[#6fd9a3] font-bold hover:underline">
                2024RIVE33 ↗
              </a>
            </li>
            <li className="p-4 rounded-xl border border-[#2f403a] bg-[#17221e]">
              <strong className="block text-xs text-[#9fada6]">Proyecto Destacado</strong>
              <a href="https://speedtimersv.page.gd" target="_blank" rel="noopener noreferrer" className="text-[#6fd9a3] font-bold hover:underline">
                speedtimersv.page.gd ↗
              </a>
            </li>
          </ul>

          <form onSubmit={handleSubmit} className="p-6 rounded-xl border border-[#2f403a] bg-[#17221e] space-y-4">
            <label className="block text-sm font-bold text-[#ece9e2]">
              Nombre
              <input type="text" required className="mt-1 w-full px-3 py-2 rounded-lg border border-[#2f403a] bg-[#0c1311] text-[#ece9e2]" />
            </label>
            <label className="block text-sm font-bold text-[#ece9e2]">
              Correo
              <input type="email" required className="mt-1 w-full px-3 py-2 rounded-lg border border-[#2f403a] bg-[#0c1311] text-[#ece9e2]" />
            </label>
            <label className="block text-sm font-bold text-[#ece9e2]">
              Mensaje
              <textarea rows={4} required className="mt-1 w-full px-3 py-2 rounded-lg border border-[#2f403a] bg-[#0c1311] text-[#ece9e2]" />
            </label>
            <button type="submit" className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#ff5800] to-[#ffb000] text-[#17100a] font-extrabold hover:brightness-110 transition">
              Enviar mensaje
            </button>
            {status && <p className="text-sm font-bold text-[#ffb21f]">{status}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}