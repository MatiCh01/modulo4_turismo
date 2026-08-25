"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { IProduct } from "@/interface/product.interface";

export const AddToCart = ({ product }: { product: IProduct }) => {
  const router = useRouter();

  const handleAddToCart = () => {
    // Obtener los productos actuales del localStorage
    const cart: IProduct[] = JSON.parse(localStorage.getItem("cart") || "[]");

    // Verificar si el producto ya está agregado para evitar duplicados
    const isAlreadyInCart = cart.some((item) => item.id === product.id);

    if (isAlreadyInCart) {
      alert("Este destino ya se encuentra en tu carrito.");
      router.push("/cart");
      return;
    }

    // Guardar el nuevo producto y actualizar localStorage
    const updatedCart = [...cart, product];
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Redirigir al carrito
    router.push("/cart");
  };

  return (
    <button
      onClick={handleAddToCart}
      className="flex-1 bg-[#235347] hover:bg-[#163832] text-[#DAF1DE] font-semibold py-3 rounded-xl transition-all text-sm shadow-sm border border-[#8EB69B]/20 hover:scale-[1.01]"
    >
      Reservar Destino 🛒
    </button>
  );
};