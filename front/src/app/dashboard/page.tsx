"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getUserOrders, IOrder } from "@/services/orders.service";

export default function DashboardPage() {
  const { userData, isInitialized } = useAuth();
  const router = useRouter();

  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loadingOrders, setLoadingOrders] = useState<boolean>(true);
  const [errorOrders, setErrorOrders] = useState<string | null>(null);

  // Guard de autenticación y Carga de órdenes unificados
  useEffect(() => {
    if (!isInitialized) return;

    if (!userData) {
      router.push("/auth/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        setErrorOrders(null);
        const userOrders = await getUserOrders(userData.token);
        setOrders(userOrders);
      } catch (error) {
        console.error("Error al obtener las órdenes:", error);
        setErrorOrders("No se pudieron cargar tus reservas en este momento.");
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, [userData, isInitialized, router]);

  // Previene el destello (FOUC) mientras hidrata o redirige
  if (!isInitialized || !userData) return null;

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Información de Perfil */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h1 className="text-2xl font-bold text-slate-900 mb-6">Mi Perfil</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="block text-xs text-slate-500 font-medium">Nombre completo</span>
              <p className="font-semibold text-slate-900 mt-0.5">{userData.user.name}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="block text-xs text-slate-500 font-medium">Email</span>
              <p className="font-semibold text-slate-900 mt-0.5">{userData.user.email}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="block text-xs text-slate-500 font-medium">Dirección</span>
              <p className="font-semibold text-slate-900 mt-0.5">{userData.user.address}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="block text-xs text-slate-500 font-medium">Teléfono</span>
              <p className="font-semibold text-slate-900 mt-0.5">{userData.user.phone}</p>
            </div>
          </div>
        </section>

        {/* Historial de Compras */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Mis Compras</h2>

          {loadingOrders ? (
            /* Skeleton Loader */
            <div className="space-y-4 animate-pulse">
              {[1, 2].map((i) => (
                <div key={i} className="h-20 bg-slate-100 rounded-xl w-full" />
              ))}
            </div>
          ) : errorOrders ? (
            /* Error State en la UI */
            <div className="p-6 bg-red-50 rounded-xl border border-red-200 text-center">
              <p className="text-red-700 font-medium text-sm">{errorOrders}</p>
              <p className="text-xs text-red-500 mt-1">
                Verifica tu conexión con el servidor o intenta nuevamente refrescando la página.
              </p>
            </div>
          ) : orders.length === 0 ? (
            /* Empty State */
            <div className="p-8 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-center">
              <p className="text-slate-600 font-medium text-sm">Aún no has realizado ninguna compra 🛍️</p>
              <p className="text-xs text-slate-400 mt-1">Explora nuestros paquetes turísticos y realiza tu primera reserva.</p>
            </div>
          ) : (
            /* Lista de Compras con Cálculo de Total */
            <div className="space-y-4">
              {orders.map((order) => {
                const totalOrder = order.products.reduce((acc, p) => acc + p.price, 0);

                return (
                  <div key={order.id} className="p-4 border border-slate-200 rounded-xl flex justify-between items-center bg-slate-50">
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">Orden #{order.id}</p>
                      <p className="text-xs text-slate-500">
                        Fecha: {new Date(order.date).toLocaleDateString("es-AR", { timeZone: "UTC" })}
                      </p>
                      <p className="text-xs text-blue-600 font-medium mt-1">
                        {order.products.map((p) => p.name).join(", ")}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="block text-sm font-bold text-slate-900 mb-1">
                        ${totalOrder.toLocaleString()}
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-700 font-semibold text-xs rounded-full inline-block">
                        {order.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}