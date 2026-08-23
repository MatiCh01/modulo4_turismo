import { getProductById } from "@/services/products.service";
import Link from "next/link";

interface ProductDetailProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetail({ params }: ProductDetailProps) {
  const { id } = await params;
  const product = await getProductById(id);

  const { name, price, image, description, stock } = product;

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
        
        {/* Imagen del Producto */}
        <div className="relative h-72 md:h-96 rounded-xl overflow-hidden bg-slate-100">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full">
            {stock} cupos disponibles
          </span>
        </div>

        {/* Información del Producto */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-md">
              Destino #{id}
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 mt-3 mb-4">
              {name}
            </h1>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              {description}
            </p>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-3xl font-black text-slate-900">${price}</span>
              <span className="text-sm font-semibold text-slate-500">USD</span>
            </div>

            <div className="flex items-center gap-4">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors text-sm shadow-sm">
                Añadir al Carrito 🛒
              </button>
              <Link
                href="/"
                className="px-4 py-3 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl font-semibold text-sm transition-colors"
              >
                Volver
              </Link>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}