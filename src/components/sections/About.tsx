export default function About() {
  return (
    <section id="sobre-mi" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-[#ffb21f] font-bold text-sm mb-1">Sobre mí</p>
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#ece9e2] mb-10">Un poco de mi historia</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4 text-[#ece9e2]/90 leading-relaxed">
            <p>
              Soy Mauricio Enrique Guzmán Rivera (todos me dicen <strong>Mauri</strong>). Desde que aprendí a armar el cubo Rubik en 2023 y empecé a programar aplicaciones web, descubrí que me apasiona resolver problemas complejos con lógica y creatividad.
            </p>
            <p>
              Actualmente curso mi último año de bachillerato y soy becario del programa <strong>¡Supérate!</strong>, donde desarrollo proyectos full-stack con PHP, MySQL, JavaScript y Next.js, mientras me preparo para estudiar Ingeniería en Ciencias de la Computación y Ciberseguridad.
            </p>
          </div>

          <ul className="bg-[#17221e] border border-[#2f403a] rounded-xl p-5 space-y-3 text-sm">
            <li className="flex justify-between border-b border-[#2f403a] pb-2">
              <strong className="text-[#ece9e2]">Ubicación</strong>
              <span className="text-[#9fada6]">El Salvador</span>
            </li>
            <li className="flex justify-between border-b border-[#2f403a] pb-2">
              <strong className="text-[#ece9e2]">Idiomas</strong>
              <span className="text-[#9fada6]">Español, Inglés</span>
            </li>
            <li className="flex justify-between border-b border-[#2f403a] pb-2">
              <strong className="text-[#ece9e2]">Intereses</strong>
              <span className="text-[#9fada6]">Speedcubing, Robótica, Web</span>
            </li>
            <li className="flex justify-between">
              <strong className="text-[#ece9e2]">WCA ID</strong>
              <span className="text-[#6fd9a3]">2024RIVE33</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}