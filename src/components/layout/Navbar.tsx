"use client";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0c1311]/95 backdrop-blur border-b border-[#2f403a]">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#inicio" className="font-extrabold text-xl md:text-2xl tracking-tight text-[#ece9e2]">
          Mauricio <span className="text-[#ff6a1a]">Guzmán</span>
        </a>

        <nav className={`${open ? "flex" : "hidden"} md:flex flex-col md:flex-row absolute md:static top-16 left-0 right-0 bg-[#17221e] md:bg-transparent border-b md:border-0 border-[#2f403a] p-4 md:p-0 gap-4 md:gap-6 text-sm font-medium text-[#9fada6]`}>
          <a href="#sobre-mi" onClick={() => setOpen(false)} className="hover:text-white">Sobre mí</a>
          <a href="#logros" onClick={() => setOpen(false)} className="hover:text-white">Logros</a>
          <a href="#proyectos" onClick={() => setOpen(false)} className="hover:text-white">Proyectos</a>
          <a href="#gustos" onClick={() => setOpen(false)} className="hover:text-white">Mis gustos</a>
          <a href="#habilidades" onClick={() => setOpen(false)} className="hover:text-white">Habilidades</a>
          <a href="#educacion" onClick={() => setOpen(false)} className="hover:text-white">Educación</a>
          <a href="#contacto" onClick={() => setOpen(false)} className="hover:text-white">Contacto</a>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden px-3 py-1.5 rounded-lg border border-[#2f403a] text-[#ece9e2]"
          aria-label="Menú"
        >
          ☰
        </button>
      </div>
    </header>
  );
}