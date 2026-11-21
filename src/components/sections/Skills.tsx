import { skillsData } from "@/data/skills";

export default function Skills() {
  return (
    <section id="habilidades" className="py-20 bg-[#121c18]">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-[#ffb21f] font-bold text-sm mb-1">Habilidades</p>
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#ece9e2] mb-10">Con qué trabajo</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {skillsData.map((group, idx) => (
            <div key={idx} className="p-5 rounded-xl border border-[#2f403a] bg-[#17221e]">
              <h3 className="text-xl font-extrabold text-[#ece9e2] mb-4">{group.category}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill, i) => (
                  <span key={i} className="px-2.5 py-1 text-xs rounded-md bg-[#1f2d28] border border-[#2f403a] text-[#ece9e2]">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}