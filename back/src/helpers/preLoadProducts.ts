import { AppDataSource } from "../config/dataSource";
import { Product } from "../entities/Product";
import { ProductRepository } from "../repositories/product.repository";

interface IProduct {
  name: string;
  price: number;
  description: string;
  image: string;
  categoryId: number;
  stock: number;
}

const productsToPreLoad: IProduct[] = [
  {
    name: "Escapada a Bariloche",
    price: 450,
    description:
      "Disfrutá de 5 días inolvidables entre montañas, lagos cristalinos y las mejores chocolaterías artesanal de la Patagonia.",
    image:
      "https://images.unsplash.com/photo-1702263525855-385a520842cf?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    categoryId: 1,
    stock: 8,
  },
  {
    name: "Cataratas del Iguazú",
    price: 380,
    description:
      "Viví la fuerza de la naturaleza con este paquete de 4 días en plena selva misionera con excursiones y paseos en lancha incluidos.",
    image:
      "https://images.unsplash.com/photo-1648510399328-b8981e9fc1bb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    categoryId: 1,
    stock: 12,
  },
  {
    name: "Mendoza y Rutas del Vino",
    price: 520,
    description:
      "3 noches de alojamiento con visitas guiadas a bodegas boutique, degustaciones exclusivas y cenas al pie de los Andes.",
    image:
      "https://images.unsplash.com/photo-1592783914986-a489c83c7aea?q=80&w=1514&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    categoryId: 2,
    stock: 5,
  },
  {
    name: "Aventura en Salta y Jujuy",
    price: 490,
    description:
      "Recorré el Tren a las Nubes, las Salinas Grandes y los coloridos cerros del norte argentino en una expedición de 6 días.",
    image:
      "https://images.unsplash.com/photo-1603415017286-5c4e3492610f?q=80&w=1504&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    categoryId: 1,
    stock: 10,
  },
  {
    name: "Ushuaia Fin del Mundo",
    price: 650,
    description:
      "Navegación por el Canal Beagle, visita al Parque Nacional Tierra del Fuego y experiencia gastronómica de centolla austral.",
    image:
      "https://images.unsplash.com/photo-1615656637621-5aa19f1ef847?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    categoryId: 2,
    stock: 6,
  },
  {
    name: "Calafate y Glaciar Perito Moreno",
    price: 720,
    description:
      "Maravillate con los imponentes glaciares patagónicos, caminatas sobre hielo y pasarelas panorámicas durante 4 noches.",
    image:
      "https://images.unsplash.com/photo-1593434820349-0ca11844c957?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    categoryId: 2,
    stock: 7,
  },
];

export const preLoadProducts = async () => {
  const products = await ProductRepository.find();
  if (!products.length)
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(Product)
      .values(productsToPreLoad)
      .execute();
  console.log("Products preloaded");
};