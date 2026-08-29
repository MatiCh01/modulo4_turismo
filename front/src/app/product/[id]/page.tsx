import { Metadata } from "next";
import { getProductById } from "@/services/products.service";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/AddToCart/AddToCart";

interface ProductDetailProps {
  params: Promise<{ id: string }>;
}

// Generador dinámico de Metadatos para SEO y redes sociales
export async function generateMetadata({ params }: ProductDetailProps): Promise<Metadata> {
  const { id } = await params;

  let product = null;
  try {
    product = await getProductById(id);
  } catch (error) {
    console.error("Error obteniendo metadatos del producto:", error);
  }

  if (!product) {
    return {
      title: "Destino no encontrado",
      description: "El destino solicitado no está disponible en Nativa Viajes.",
    };
  }

  return {
    title: product.name,
    description: product.description.slice(0, 160),
    openGraph: {
      title: `${product.name} | Nativa Viajes`,
      description: product.description.slice(0, 160),
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetail({ params }: ProductDetailProps) {
  const { id } = await params;

  // Capturamos el producto de la API de forma segura
  let product = null;
  try {
    product = await getProductById(id);
  } catch (error) {
    console.error("Error al obtener el producto:", error);
  }

  // Si no existe el producto o falla la respuesta, mandamos al 404 nativo
  if (!product) {
    notFound();
  }

  const { name, price, image, description, stock } = product;

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
        {/* Imagen del Destino Optimizada */}
        <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden bg-slate-100 border border-slate-100">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            className="object-cover"
          />
          <span className="absolute top-4 right-4 bg-[#051F20]/85 backdrop-blur-md text-[#DAF1DE] text-xs font-semibold px-3.5 py-1.5 rounded-full border border-[#8EB69B]/30 shadow-sm z-10">
            🍃 {stock} cupos disponibles
          </span>
        </div>

        {/* Información Detallada */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-[#235347] uppercase tracking-wider bg-[#DAF1DE] px-3 py-1 rounded-lg border border-[#8EB69B]/40 inline-block">
              Experiencia #{id}
            </span>
            <h1 className="text-3xl font-extrabold text-[#051F20] mt-3 mb-4 leading-tight">
              {name}
            </h1>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              {description}
            </p>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-3xl font-black text-[#051F20]">${price}</span>
              <span className="text-sm font-semibold text-slate-500">USD</span>
            </div>

            <div className="flex items-center gap-4">
              <AddToCart product={product} />

              <Link
                href="/"
                className="px-5 py-3 border border-slate-300 hover:bg-slate-50 text-[#051F20] rounded-xl font-semibold text-sm transition-colors"
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