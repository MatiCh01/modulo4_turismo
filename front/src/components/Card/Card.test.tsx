import { render, screen } from "@testing-library/react";
import { Card } from "./Card";

const mockProduct = {
  id: 101,
  name: "Cataratas del Iguazú",
  description: "Excursión por el parque nacional con guía.",
  price: 350,
  stock: 8,
  image: "https://example.com/iguazu.jpg",
  categoryId: 2,
};

describe("Pruebas del Componente Card", () => {
  test("renderiza la información del producto correctamente", () => {
    render(<Card product={mockProduct} />);

    expect(screen.getByRole("heading", { name: "Cataratas del Iguazú" })).toBeInTheDocument();
    expect(screen.getByText("Excursión por el parque nacional con guía.")).toBeInTheDocument();
    expect(screen.getByText("$350")).toBeInTheDocument();
    expect(screen.getByText("🍃 8 cupos")).toBeInTheDocument();
  });

  test("el enlace dirige a la página de detalle correcta", () => {
    render(<Card product={mockProduct} />);

    const link = screen.getByRole("link", { name: /ver detalles del destino cataratas del iguazú/i });
    expect(link).toHaveAttribute("href", "/product/101");
  });
});