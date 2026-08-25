import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-[#051F20] text-[#8EB69B] border-t border-[#163832] mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Identidad Simplificada */}
        <div className="flex items-center gap-2">
          <span className="text-base">🌿</span>
          <span className="text-sm font-extrabold text-[#DAF1DE] tracking-wider">
            NATIVA VIAJES
          </span>
        </div>

        {/* Links Rápidos de Accesibilidad */}
        <div className="flex items-center gap-6 text-xs text-[#DAF1DE]/70 font-medium">
          <Link href="/" className="hover:text-[#DAF1DE] transition-colors">
            Destinos
          </Link>
          <Link href="/cart" className="hover:text-[#DAF1DE] transition-colors">
            Mi Carrito
          </Link>
          <Link href="/dashboard" className="hover:text-[#DAF1DE] transition-colors">
            Mi Cuenta
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-[11px] text-[#8EB69B]/60">
          © {new Date().getFullYear()} Nativa. Todos los derechos reservados.
        </p>

      </div>
    </footer>
  );
};