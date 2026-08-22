interface ProductDetailProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetail({ params }: ProductDetailProps) {
  const { id } = await params;

  return (
    <main className="max-w-4xl mx-auto p-8 flex flex-col gap-6">
      <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
          Destino #{id}
        </span>

        <h1 className="text-3xl font-extrabold text-gray-900 mt-4 mb-2">
          Detalle del Paquete Turístico
        </h1>

        <p className="text-gray-600 mb-6 leading-relaxed">
          Esta es la maquetación inicial para el producto seleccionado con el ID:{" "}
          <strong className="text-gray-800">{id}</strong>. En las próximas lecciones obtendremos los datos reales desde el backend/mock utilizando este identificador.
        </p>

        <div className="flex gap-4 border-t pt-6 border-gray-100">
          <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow">
            Añadir al Carrito
          </button>
        </div>
      </div>
    </main>
  );
}