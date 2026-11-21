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
    description: "Plataforma web full-stack orientada al mantenimiento vehicular y educación vial, con portales diferenciados para usuarios y mecánicos.",
    tags: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
    image: "/images/kiroo.png",
    demoUrl: "https://kiroo.page.gd/",
    codeUrl: "#",
  },
  {
    title: "SpeedTimerSV & Cubing Contest",
    description: "Temporizador web de speedcubing y plataforma de competición virtual creada junto a la comunidad Speedcubing SV para El Salvador.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "WCA API"],
    image: "/images/speedtimersv.png",
    demoUrl: "https://speedtimersv.page.gd",
    codeUrl: "https://cubingcontest.page.gd/",
  },
];