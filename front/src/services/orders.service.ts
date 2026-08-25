const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3005";

export interface IOrder {
  id: number;
  status: string;
  date: string;
  products: {
    id: number;
    name: string;
    price: number;
  }[];
}

export const getUserOrders = async (token: string): Promise<IOrder[]> => {
  const response = await fetch(`${API_URL}/users/orders`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  if (!response.ok) {
    throw new Error("No se pudieron cargar las órdenes");
  }

  return await response.json();
};

export const createOrder = async (productIds: number[], token: string) => {
  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      products: productIds,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Error al procesar la reserva. Intenta nuevamente.");
  }

  return await response.json();
};