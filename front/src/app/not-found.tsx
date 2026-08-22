import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-6xl font-extrabold text-blue-600 mb-2">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Destino no encontrado</h2>
      <p className="text-gray-600 mb-6 max-w-md">
        Parece que la ruta a la que intentás acceder no existe o se encuentra fuera del mapa.
      </p>
      <Link
        href="/"
        className="bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
      >
        Volver al Inicio
      </Link>
    </main>
  );
}