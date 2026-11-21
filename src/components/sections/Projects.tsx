"use client";

import { projectsData } from "@/data/projects";

export default function Projects() {
  return (
    <section id="proyectos" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <header className="mb-10">
          <p className="text-[#ffb21f] font-bold text-sm mb-1">Proyectos</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#ece9e2] mb-3">
            Cosas que he construido
          </h2>
          <p className="text-[#9fada6] max-w-2xl">
            Plataformas web full-stack, temporizadores y herramientas creadas para resolver problemas reales.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project, idx) => (
            <article
              key={idx}
              className="p-5 rounded-2xl border border-[#2f403a] bg-[#17221e] hover:border-[#ff6a1a] transition flex flex-col"
            >
              <div className="aspect-video mb-4 rounded-xl overflow-hidden bg-[#0c1311] border border-dashed border-[#2f403a] flex items-center justify-center">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    if (e.currentTarget.parentElement) {
                      e.currentTarget.parentElement.innerHTML = `<span class="text-xs text-[#9fada6] p-4 text-center">Guarda captura en:<br/><code class="text-[#ffb21f]">public${project.image}</code></span>`;
                    }
                  }}
                />
              </div>

              <h3 className="text-2xl font-extrabold text-[#ece9e2] mb-2">
                {project.title}
              </h3>

              <p className="text-sm text-[#9fada6] leading-relaxed mb-4 flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-5">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 text-xs font-medium rounded-md bg-[#1f2d28] border border-[#2f403a] text-[#ece9e2]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 pt-3 border-t border-[#2f403a] text-sm font-bold text-[#6fd9a3]">
                {project.demoUrl && project.demoUrl !== "#" && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Ver sitio ↗
                  </a>
                )}
                {project.codeUrl && project.codeUrl !== "#" && (
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Plataforma / Código ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}