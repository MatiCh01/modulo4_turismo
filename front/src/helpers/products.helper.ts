import { IProduct } from "@/interface/productinterface";

export const productsMock: IProduct[] = [
  {
    id: 1,
    name: "Escapada a Bariloche",
    description: "Disfrutá de 5 días inolvidables entre montañas, lagos cristalinos y las mejores chocolaterías.",
    price: 450,
    stock: 8,
    image: "https://images.unsplash.com/photo-1589802829985-817e51171b92?q=80&w=800",
    categoryId: 1,
  },
  {
    id: 2,
    name: "Cataratas del Iguazú",
    description: "Viví la fuerza de la naturaleza con este paquete de 4 días en plena selva misionera con excursiones incluidas.",
    price: 380,
    stock: 12,
    image: "https://www.exoticca.com/_next/image?url=https%3A%2F%2Fuploads.exoticca.com%2Fglobal%2Fdestination%2Fpoi%2Fcataratas-de-iguazu.png&w=1080&q=75",
    categoryId: 1,
  },
  {
    id: 3,
    name: "Mendoza y Rutas del Vino",
    description: "3 noches de alojamiento con visitas guiadas a bodegas boutique y degustaciones exclusivas al pie de los Andes.",
    price: 520,
    stock: 5,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800",
    categoryId: 2,
  },
];