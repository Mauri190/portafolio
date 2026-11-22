"use client";

import { useState } from "react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
        form.reset();
      } else {
        alert("Ocurrió un error al enviar el mensaje.");
      }
    } catch (err) {
      // Si ocurre un error de red local, mandamos el formulario por método tradicional de respaldo
      form.submit();
    } finally {
      setIsSubmitting(false);
    }
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
            {/* Clave de Web3Forms */}
            <input type="hidden" name="access_key" value="7dbc68e5-a74e-4a68-90ff-7782b18b1b54" />

            <label className="block text-sm font-bold text-[#ece9e2]">
              Nombre
              <input type="text" name="name" required className="mt-1 w-full px-3 py-2 rounded-lg border border-[#2f403a] bg-[#0c1311] text-[#ece9e2] focus:border-[#ff6a1a] outline-none" />
            </label>
            <label className="block text-sm font-bold text-[#ece9e2]">
              Correo
              <input type="email" name="email" required className="mt-1 w-full px-3 py-2 rounded-lg border border-[#2f403a] bg-[#0c1311] text-[#ece9e2] focus:border-[#ff6a1a] outline-none" />
            </label>
            <label className="block text-sm font-bold text-[#ece9e2]">
              Mensaje
              <textarea name="message" rows={4} required className="mt-1 w-full px-3 py-2 rounded-lg border border-[#2f403a] bg-[#0c1311] text-[#ece9e2] focus:border-[#ff6a1a] outline-none" />
            </label>
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#ff5800] to-[#ffb000] text-[#17100a] font-extrabold hover:brightness-110 transition disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? "Enviando..." : "Enviar mensaje"}
            </button>

            {submitted && <p className="text-sm font-bold text-[#6fd9a3] mt-2">¡Mensaje enviado con éxito! Revisa tu correo.</p>}
          </form>
        </div>
      </div>
    </section>
  );
}