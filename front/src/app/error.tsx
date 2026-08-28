"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error capturado por Boundary:", error);
  }, [error]);

  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-5xl font-extrabold text-red-600 mb-2">500</h1>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Ocurrió un problema inesperado</h2>
      <p className="text-gray-600 mb-6 max-w-md">
        No pudimos conectar con los servicios de Nativa o la información no se encuentra disponible.
      </p>
      <button
        onClick={() => reset()}
        className="bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
      >
        Reintentar
      </button>
    </main>
  );
}