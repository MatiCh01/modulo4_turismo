import { IProduct } from "@/interface/productinterface";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3005";

// Obtener todos los productos
export const getProductsDB = async (): Promise<IProduct[]> => {
  try {
    const res = await fetch(`${API_URL}/products`, {
      method: "GET",
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error("Error al obtener los productos desde la API");
    }

    const products: IProduct[] = await res.json();
    return products;
  } catch (error) {
    throw new Error(error as string);
  }
};

// Obtener un producto por ID
export const getProductById = async (id: string): Promise<IProduct> => {
  try {
    const allProducts = await getProductsDB();
    const product = allProducts.find((p) => p.id === Number(id));

    if (!product) {
      throw new Error("No se encontró un producto con ese ID");
    }

    return product;
  } catch (error) {
    throw new Error(error as string);
  }
};