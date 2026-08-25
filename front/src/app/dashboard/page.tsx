"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getUserOrders, IOrder } from "@/services/orders.service";

export default function DashboardPage() {
  const { userData } = useAuth();
  const router = useRouter();

  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loadingOrders, setLoadingOrders] = useState<boolean>(true);

  // Guard de autenticación
  useEffect(() => {
    if (!userData) {
      router.push("/auth/login");
    }
  }, [userData, router]);

  // Carga de órdenes desde el backend
  useEffect(() => {
    const fetchOrders = async () => {
      if (userData?.token) {
        try {
          const userOrders = await getUserOrders(userData.token);
          setOrders(userOrders);
        } catch (error) {
          console.error("Error al obtener las órdenes:", error);
        } finally {
          setLoadingOrders(false);
        }
      }
    };

    if (userData) {
      fetchOrders();
    }
  }, [userData]);

  if (!userData) return null;

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
            <p className="text-slate-500 text-sm">Cargando tus compras...</p>
          ) : orders.length === 0 ? (
            /* Empty State */
            <div className="p-8 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-center">
              <p className="text-slate-600 font-medium text-sm">Aún no has realizado ninguna compra 🛍️</p>
              <p className="text-xs text-slate-400 mt-1">Explora nuestros paquetes turísticos y realiza tu primera reserva.</p>
            </div>
          ) : (
            /* Lista de Compras */
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="p-4 border border-slate-200 rounded-xl flex justify-between items-center bg-slate-50">
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">Orden #{order.id}</p>
                    <p className="text-xs text-slate-500">Fecha: {new Date(order.date).toLocaleDateString()}</p>
                    <p className="text-xs text-blue-600 font-medium mt-1">
                      {order.products.map((p) => p.name).join(", ")}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 font-semibold text-xs rounded-full">
                    {order.status.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}