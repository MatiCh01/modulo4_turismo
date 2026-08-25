import { Card } from "@/components/Card/Card";
import { getProductsDB } from "@/services/products.service";

export default async function Home() {
  const products = await getProductsDB();

  return (
    <main className="max-w-7xl mx-auto px-6 py-10 flex flex-col gap-12">
      
      {/* Hero Banner Inspiracional */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#051F20] via-[#0B2B26] to-[#163832] text-white rounded-3xl p-8 sm:p-14 shadow-xl border border-[#235347]/40">
        <div className="relative z-10 max-w-2xl flex flex-col items-start gap-4">
          <span className="bg-[#235347]/80 backdrop-blur-md text-[#DAF1DE] text-xs font-bold px-3.5 py-1.5 rounded-full border border-[#8EB69B]/30 tracking-wide uppercase">
            🍃 Escapadas & Bienestar
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#DAF1DE] leading-tight">
            Desconectá del ritmo diario, reconectá con la naturaleza.
          </h1>
          <p className="text-[#8EB69B] text-base sm:text-lg leading-relaxed font-normal">
            Descubrí experiencias de viaje para el descanso, la calma y el rejuvenecimiento personal.
          </p>
        </div>
      </section>

      {/* Título de Sección */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-[#051F20]">Experiencias Disponibles</h2>
        <p className="text-sm text-slate-600">Seleccioná tu próximo destino de paz y aventura.</p>
      </div>

      {/* Grilla Responsiva de Tarjetas */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </section>

    </main>
  );
}