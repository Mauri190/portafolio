import { experienceData } from "@/data/experience";

export default function Experience() {
  return (
    <section id="logros" className="py-20 bg-[#121c18]">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-[#ffb21f] font-bold text-sm mb-1">Experiencia y logros</p>
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#ece9e2] mb-10">Lo que he hecho</h2>

        <div className="space-y-5">
          {experienceData.map((item, idx) => (
            <article
              key={idx}
              className={`p-6 rounded-xl border bg-[#17221e] grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 ${
                item.featured ? "border-l-4 border-l-[#ff6a1a] border-[#2f403a]" : "border-[#2f403a]"
              }`}
            >
              <div className="text-2xl font-extrabold text-[#ffb21f]">{item.date}</div>
              <div>
                {item.badge && (
                  <span className="inline-block mb-2 px-3 py-0.5 rounded-md text-xs font-bold bg-gradient-to-r from-[#ff5800] to-[#ffb000] text-[#17100a]">
                    {item.badge}
                  </span>
                )}
                <h3 className="text-xl font-extrabold text-[#ece9e2]">{item.title}</h3>
                <p className="text-sm text-[#9fada6] font-medium mb-2">{item.org}</p>
                <p className="text-[#ece9e2]/85 text-sm leading-relaxed">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}