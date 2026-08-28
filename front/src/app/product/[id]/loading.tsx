export default function ProductLoading() {
  return (
    <main className="min-h-[75vh] bg-[#F8FAF9] py-12 px-6 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 shadow-sm animate-pulse">
        {/* Skeleton de la Imagen */}
        <div className="h-72 md:h-96 rounded-2xl bg-slate-200 w-full"></div>

        {/* Skeleton de los Detalles */}
        <div className="flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="h-4 w-24 bg-slate-200 rounded-lg"></div>
            <div className="h-8 w-3/4 bg-slate-200 rounded-xl"></div>
            <div className="h-6 w-1/3 bg-slate-200 rounded-lg"></div>
            <div className="space-y-2 pt-2">
              <div className="h-4 w-full bg-slate-200 rounded"></div>
              <div className="h-4 w-5/6 bg-slate-200 rounded"></div>
              <div className="h-4 w-4/6 bg-slate-200 rounded"></div>
            </div>
          </div>
          <div className="h-12 w-full bg-slate-200 rounded-xl pt-4"></div>
        </div>
      </div>
    </main>
  );
}