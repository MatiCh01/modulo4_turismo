"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export const Navbar = () => {
  const { userData, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm text-white border-b border-slate-800 shadow-sm">
      <nav className="max-w-7xl mx-auto px-6 py-3.5 flex justify-between items-center">
        <Link 
          href="/" 
          className="text-xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300 hover:opacity-90 transition-opacity"
        >
          ViajesGlobal <span className="text-blue-400 font-normal">✈️</span>
        </Link>
        
        <div className="flex items-center gap-6 text-sm font-medium text-slate-300">
          <Link href="/" className="hover:text-white transition-colors">
            Inicio
          </Link>

          {/* Renderizado condicional basado en la sesión */}
          {userData ? (
            <>
              <Link href="/dashboard" className="hover:text-white transition-colors">
                Mi Perfil
              </Link>
              <Link 
                href="/cart" 
                className="bg-blue-600/20 text-blue-300 border border-blue-500/30 px-3 py-1.5 rounded-full hover:bg-blue-600 hover:text-white transition-all text-xs font-semibold"
              >
                Carrito 🛒
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-300 transition-colors text-xs font-semibold"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link 
                href="/auth/login" 
                className="hover:text-white transition-colors"
              >
                Ingresar
              </Link>
              <Link 
                href="/auth/register" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-full transition-all text-xs font-semibold shadow-sm"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};