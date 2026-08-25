"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { IProduct } from "@/interface/product.interface";
import { createOrder } from "@/services/orders.service";

export default function CartPage() {
  const { userData } = useAuth();
  const router = useRouter();

  const [cart, setCart] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userData) {
      router.push("/auth/login");
      return;
    }

    // Cargar productos del localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, [userData, router]);

  // Quitar un producto en particular
  const handleRemoveItem = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Vaciar todo el carrito
  const handleClearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  // Procesar la compra
  const handleCheckout = async () => {
    if (!userData?.token || cart.length === 0) return;

    setLoading(true);
    setError(null);

    try {
      const productIds = cart.map((product) => product.id);
      await createOrder(productIds, userData.token);

      // Limpiar carrito y redirigir
      localStorage.removeItem("cart");
      setCart([]);
      alert("¡Reserva realizada con éxito!");
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error al procesar la reserva.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!userData) {
    return null;
  }

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <main className="min-h-[75vh] bg-[#F8FAF9] py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-sm border border-slate-200/80">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-100 pb-4">
          <div>
            <h1 className="text-2xl font-black text-[#051F20]">
              Tu Carrito de Reservas 🛒
            </h1>
            <p className="text-slate-600 text-sm">
              Bienvenido, <span className="font-semibold text-[#051F20]">{userData.user.name}</span>.
            </p>
          </div>

          {cart.length > 0 && (
            <button
              onClick={handleClearCart}
              className="text-xs font-semibold text-slate-400 hover:text-red-500 transition-colors w-fit"
            >
              Vaciar Carrito
            </button>
          )}
        </div>

        {/* Mensaje de Error */}
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-medium text-center">
            {error}
          </div>
        )}

        {/* Carrito Vacío */}
        {cart.length === 0 ? (
          <div className="p-10 bg-[#DAF1DE]/30 rounded-2xl border border-dashed border-[#8EB69B] text-center flex flex-col items-center gap-3">
            <span className="text-3xl">🍃</span>
            <p className="text-[#051F20] text-sm font-medium">
              Actualmente no tienes productos agregados al carrito.
            </p>
            <p className="text-xs text-slate-500 max-w-sm">
              Explora nuestros destinos para encontrar tu próxima experiencia de desconexión.
            </p>
            <Link
              href="/"
              className="mt-2 bg-[#235347] hover:bg-[#163832] text-[#DAF1DE] text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm border border-[#8EB69B]/20"
            >
              Ver Destinos
            </Link>
          </div>
        ) : (
          /* Lista de Productos y Resumen */
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200/60"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-[#051F20] text-sm">{item.name}</h3>
                      <p className="text-xs font-semibold text-[#235347]">${item.price} USD</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-xs font-medium text-slate-400 hover:text-red-500 transition-colors px-2 py-1"
                  >
                    Quitar
                  </button>
                </div>
              ))}
            </div>

            {/* Total y Checkout */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="block text-xs text-slate-500">Total acumulado:</span>
                <span className="text-2xl font-black text-[#051F20]">${total} USD</span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="bg-[#235347] hover:bg-[#163832] disabled:bg-slate-300 text-[#DAF1DE] font-bold px-6 py-3 rounded-xl transition-all text-sm shadow-sm border border-[#8EB69B]/20"
              >
                {loading ? "Procesando..." : "Confirmar Reserva"}
              </button>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}