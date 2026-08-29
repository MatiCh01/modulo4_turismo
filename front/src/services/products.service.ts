import { IProduct } from "@/interface/product.interface";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3005";

// Obtener todos los productos con caché e ISR
export const getProductsDB = async (): Promise<IProduct[]> => {
  try {
    const res = await fetch(`${API_URL}/products`, {
      method: "GET",
      next: {
        revalidate: 3600,
        tags: ["products"],
      },
    });

    if (!res.ok) {
      throw new Error("Error al obtener los productos desde la API");
    }

    const products: IProduct[] = await res.json();
    return products;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Ocurrió un error inesperado al consultar los productos.");
  }
};

// Obtener un producto por ID reutilizando la caché del servidor
export const getProductById = async (id: string): Promise<IProduct> => {
  try {
    const allProducts = await getProductsDB();
    const product = allProducts.find((p) => p.id === Number(id));

    if (!product) {
      throw new Error("No se encontró un producto con ese ID");
    }

    return product;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Ocurrió un error al buscar el detalle del producto.");
  }
};