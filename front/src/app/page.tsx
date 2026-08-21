import { Card } from "@/components/Card/Card";
import { productsMock } from "@/helpers/products.helper";

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Explorá Nuestros Destinos
      </h1>

      <div className="flex flex-wrap gap-6 justify-center">
        {productsMock.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}