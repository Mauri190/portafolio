"use client";

export default function Hero() {
  return (
    <section id="inicio" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-[#ffb21f] font-bold text-sm uppercase tracking-wider mb-2">Hola, soy</p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-4 text-[#ece9e2]">
            Mauricio Guzmán
          </h1>
          <p className="text-xl md:text-2xl font-bold text-[#ffb21f] mb-4">
            Desarrollador Web · Speedcuber WCA · Robótica
          </p>
          <p className="text-[#9fada6] text-base md:text-lg mb-6 max-w-xl leading-relaxed">
            Estudiante salvadoreño apasionado por crear aplicaciones web completas, competir con el cubo Rubik a nivel oficial y a la vez programar robots.
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            <span className="px-3 py-1 bg-[#1f2d28] border border-[#2f403a] rounded-md text-xs font-medium text-[#ece9e2]">
              Speedcuber WCA (2024RIVE33)
            </span>
            <span className="px-3 py-1 bg-[#1f2d28] border border-[#2f403a] rounded-md text-xs font-medium text-[#ece9e2]">
              Team El Salvador FIRST Global 2024
            </span>
            <span className="px-3 py-1 bg-[#1f2d28] border border-[#2f403a] rounded-md text-xs font-medium text-[#ece9e2]">
              El Salvador 🇸🇻
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            <a href="#proyectos" className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#ff5800] to-[#ffb000] text-[#17100a] font-extrabold hover:brightness-110 transition">
              Ver proyectos
            </a>
            <a href="#contacto" className="px-6 py-3 rounded-lg border-2 border-[#2f403a] text-[#ece9e2] font-bold hover:border-[#ff6a1a] transition">
              Contáctame
            </a>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl p-1 bg-gradient-to-tr from-[#ff5800] to-[#ffb000]">
            <div className="w-full h-full bg-[#17221e] rounded-xl overflow-hidden flex items-center justify-center">
              <img
                src="/images/foto-personal.jpeg"
                alt="Mauricio Guzmán"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentElement!.innerHTML =
                    '<span class="text-[#9fada6] text-sm p-4 text-center">Guarda tu foto en:<br/><b>public/images/foto-personal.jpeg</b></span>';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}