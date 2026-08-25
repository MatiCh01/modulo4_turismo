"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function CartPage() {
  const { userData } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!userData) {
      router.push("/auth/login");
    }
  }, [userData, router]);

  if (!userData) {
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">
          Tu Carrito de Compras 🛒
        </h1>
        <p className="text-slate-600 text-sm mb-6">
          Bienvenido, <span className="font-semibold text-slate-800">{userData.user.name}</span>.
        </p>

        {/* Contenido temporal del carrito */}
        <div className="p-6 bg-slate-100 rounded-xl border border-dashed border-slate-300 text-center">
          <p className="text-slate-500 text-sm">
            Actualmente no tienes productos agregados al carrito.
          </p>
        </div>
      </div>
    </main>
  );
}