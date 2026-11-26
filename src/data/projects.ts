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
    title: "Lochcraft",
    description:
      "Un robot que se encargaba de recolectar basura en zonas pequeñas como lo son lagos y lagunas presentado en la competencia steam passion 2024.",
    tags: ["Robótica", "Arduino", "Diseño Mecánico", "Hardware"],
    image: "/images/Lochcraft.jpeg",
  },
  {
    title: "WRO",
    description:
      "Participación en la Olimpiada Mundial de Robótica (WRO), en la categoría seguidor de línea, donde estuvimos creando un robot por jornadas de tiempo de 5 rondas, desarrollada en la academia británica cuscatleca.",
    tags: ["Robótica", "Programación", "WRO", "Hardware"],
    image: "/images/wro.jpeg",
  },
  {
    title: "TOEIC Practice",
    description:
      "Plataforma web interactiva de práctica y preparación para el examen TOEIC, orientada a evaluar y preparación para la prueba oficial.",
    tags: ["HTML5", "CSS3", "JavaScript", "Inglés"],
    image: "/images/toeic.png", // (puedes ajustar el nombre del archivo de imagen si lo guardas distinto)
    demoUrl: "https://toeicpracticee.netlify.app/",
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