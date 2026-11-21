import { educationData } from "@/data/education";

export default function Education() {
  return (
    <section id="educacion" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-[#ffb21f] font-bold text-sm mb-1">Educación</p>
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#ece9e2] mb-10">Mi formación</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {educationData.map((edu, idx) => (
            <article key={idx} className="p-6 rounded-xl border border-[#2f403a] bg-[#17221e]">
              <span className="inline-block mb-3 px-3 py-1 text-xs font-bold rounded-md bg-[#1f2d28] border border-[#2f403a] text-[#ffb21f]">
                {edu.period}
              </span>
              <h3 className="text-xl font-extrabold text-[#ece9e2] mb-1">{edu.title}</h3>
              <p className="text-sm text-[#9fada6] font-medium mb-3">{edu.institution}</p>
              <p className="text-sm text-[#ece9e2]/85">{edu.details}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}