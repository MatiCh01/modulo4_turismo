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

const formatToken = (token: string) => {
  if (!token) return "";
  return token.startsWith("Bearer ") ? token : token;
};

export const getUserOrders = async (token: string): Promise<IOrder[]> => {
  const response = await fetch(`${API_URL}/users/orders`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: formatToken(token),
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
      Authorization: formatToken(token),
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