"use client";

import React, { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", "3c06c31d-0f1b-4a95-b0bd-d2dcdc6d2dcf");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-20 px-6 max-w-4xl mx-auto">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Contacto
        </h2>
        <p className="text-zinc-400 max-w-xl mx-auto">
          ¿Tienes algún proyecto, oportunidad o consulta? Envíame un mensaje y te responderé lo antes posible.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 md:p-8 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Tu nombre"
              className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="tu@correo.com"
              className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-2">
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            placeholder="Cuéntame sobre tu idea o consulta..."
            className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold transition-colors disabled:opacity-50 cursor-pointer"
        >
          {status === "submitting" ? "Enviando..." : "Enviar mensaje"}
        </button>

        {status === "success" && (
          <p className="text-emerald-400 text-sm text-center font-medium">
            ¡Mensaje enviado con éxito! Gracias por contactarme.
          </p>
        )}

        {status === "error" && (
          <p className="text-red-400 text-sm text-center font-medium">
            Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.
          </p>
        )}
      </form>
    </section>
  );
}