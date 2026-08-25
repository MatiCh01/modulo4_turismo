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
    <header className="sticky top-0 z-50 bg-[#051F20]/95 backdrop-blur-md text-white border-b border-[#163832] shadow-sm">
      <nav className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#235347] flex items-center justify-center text-xl text-[#DAF1DE] font-black group-hover:scale-105 transition-transform">
            🌿
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-[#DAF1DE]">
              NATIVA
            </span>
            <span className="text-[10px] tracking-widest text-[#8EB69B] uppercase font-semibold">
              Viajes & Experiencias
            </span>
          </div>
        </Link>
        
        {/* Navigation Links */}
        <div className="flex items-center gap-6 text-sm font-medium text-[#DAF1DE]/80">
          <Link href="/" className="hover:text-[#DAF1DE] transition-colors">
            Inicio
          </Link>

          {/* Renderizado condicional basado en la sesión */}
          {userData ? (
            <>
              <Link href="/dashboard" className="hover:text-[#DAF1DE] transition-colors">
                Mi Perfil ({userData.user.name.split(" ")[0]})
              </Link>
              <Link 
                href="/cart" 
                className="bg-[#235347] text-[#DAF1DE] border border-[#8EB69B]/30 px-3.5 py-1.5 rounded-full hover:bg-[#163832] transition-all text-xs font-semibold flex items-center gap-1"
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
                className="hover:text-[#DAF1DE] transition-colors"
              >
                Ingresar
              </Link>
              <Link 
                href="/auth/register" 
                className="bg-[#235347] hover:bg-[#163832] text-[#DAF1DE] px-4 py-2 rounded-full transition-all text-xs font-semibold shadow-sm border border-[#8EB69B]/30"
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