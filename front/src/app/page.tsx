import { Card } from "@/components/Card/Card";
import { productsMock } from "@/helpers/products.helper";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-10 flex flex-col gap-10">
      {/* Hero Banner */}
      <section className="text-center py-10 px-6 bg-slate-900 text-white rounded-2xl shadow-lg border border-slate-800">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
          Descubrí tu próximo destino ✈️
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Explorá nuestros paquetes turísticos exclusivos y reservá tu próxima aventura.
        </p>
      </section>

      {/* Grilla Responsiva de Tarjetas */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {productsMock.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}