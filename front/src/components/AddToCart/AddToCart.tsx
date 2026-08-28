"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IProduct } from "@/interface/product.interface";
import { useAuth } from "@/context/AuthContext";

export const AddToCart = ({ product }: { product: IProduct }) => {
  const router = useRouter();
  const { userData } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [added, setAdded] = useState<boolean>(false);

  const handleAddToCart = () => {
    setLoading(true);

    // Guardar o actualizar carrito en localStorage
    const cart: IProduct[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const isAlreadyInCart = cart.some((item) => item.id === product.id);

    if (isAlreadyInCart) {
      alert("Este destino ya se encuentra en tu carrito.");
      setLoading(false);
      router.push(userData ? "/cart" : "/auth/login?redirect=/cart");
      return;
    }

    const updatedCart = [...cart, product];
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Si el usuario no está logueado, redirigir al login con la ruta de retorno
    if (!userData) {
      setLoading(false);
      router.push("/auth/login?redirect=/cart");
      return;
    }

    // Si está logueado, continuar con el feedback de éxito
    setAdded(true);
    setLoading(false);

    setTimeout(() => {
      router.push("/cart");
    }, 400);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading || added}
      className={`flex-1 font-semibold py-3 rounded-xl transition-all text-sm shadow-sm border border-[#8EB69B]/20 flex items-center justify-center gap-2 ${
        added
          ? "bg-[#163832] text-[#DAF1DE] cursor-default"
          : "bg-[#235347] hover:bg-[#163832] text-[#DAF1DE] hover:scale-[1.01] active:scale-95 disabled:bg-slate-300 disabled:text-slate-500"
      }`}
    >
      {loading ? (
        <>
          <svg className="animate-spin h-4 w-4 text-[#DAF1DE]" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
          Procesando...
        </>
      ) : added ? (
        <span>✓ ¡Agregado! Redirigiendo...</span>
      ) : (
        <span>Reservar Destino 🛒</span>
      )}
    </button>
  );
};