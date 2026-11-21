export interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  demoUrl?: string;
  codeUrl?: string;
}

export const projectsData: Project[] = [
  {
    title: "Kiroo",
    description:
      "Plataforma web full-stack de mantenimiento vehicular y educación vial con portales diferenciados para conductores y mecánicos, citas y directorio de emergencias.",
    tags: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
    image: "/images/kiroo.png",
    demoUrl: "https://kiroo.page.gd/",
  },
  {
    title: "SpeedTimerSV",
    description:
      "Temporizador web de speedcubing con scrambles oficiales de la WCA, seguimiento de récords mundiales y librería de algoritmos para todas las categorías oficiales.",
    tags: ["HTML5", "CSS3", "JavaScript", "WCA Scrambles"],
    image: "/images/speedtimersv.png",
    demoUrl: "https://speedtimersv.page.gd/",
  },
  {
    title: "Cubing Contest",
    description:
      "Plataforma de competencias virtuales desarrollada junto a la comunidad Speedcubing SV para que cuberos salvadoreños e internacionales compitan en línea.",
    tags: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
    image: "/images/cubingcontest.png",
    demoUrl: "https://cubingcontest.page.gd/",
  },
];