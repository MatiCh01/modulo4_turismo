export default function Loading() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-4 border-[#235347]/20 border-t-[#235347] rounded-full animate-spin"></div>
      <p className="text-sm font-semibold text-[#051F20] animate-pulse">
        Cargando experiencias de Nativa...
      </p>
    </main>
  );
}