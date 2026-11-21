import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Gustos from "@/components/sections/Gustos";
import Skills from "@/components/sections/Skills";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0c1311] via-[#0e1512] to-[#170f0c] text-[#ece9e2]">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Gustos /> {/* <-- La agregamos aquí */}
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}