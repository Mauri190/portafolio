export default function Footer() {
  return (
    <footer className="border-t border-[#2f403a] py-6 text-sm text-[#9fada6]">
      <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-between gap-4">
        <p>© {new Date().getFullYear()} Mauricio Guzmán. Hecho en El Salvador.</p>
        <a href="#inicio" className="text-[#6fd9a3] hover:underline">Volver arriba ↑</a>
      </div>
    </footer>
  );
}