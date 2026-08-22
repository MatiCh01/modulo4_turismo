import Link from "next/link";

export const Navbar = () => {
  return (
    <header className="bg-slate-900 text-white shadow-md">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-400">
          ViajesGlobal ✈️
        </Link>
        <div className="flex gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-blue-300 transition-colors">
            Inicio
          </Link>
          <Link href="/dashboard" className="hover:text-blue-300 transition-colors">
            Mi Perfil
          </Link>
          <Link href="/cart" className="hover:text-blue-300 transition-colors">
            Carrito 🛒
          </Link>
        </div>
      </nav>
    </header>
  );
};