import { Card } from "@/components/Card/Card";
import { productsMock } from "@/helpers/products.helper";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto p-8">
      <section className="text-center my-8">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">
          Descubrí tu próximo destino
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Explorá nuestros paquetes turísticos exclusivos y reservá tu próxima aventura.
        </p>
      </section>

      <div className="flex flex-wrap gap-6 justify-center">
        {productsMock.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}