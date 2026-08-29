import { render, screen, fireEvent } from "@testing-library/react";
import { AddToCart } from "./AddToCart";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

const mockProduct = {
  id: 1,
  name: "Bariloche Eco Tour",
  description: "Aventura en la Patagonia",
  price: 500,
  stock: 5,
  image: "/bariloche.jpg",
  categoryId: 1,
};

describe("Pruebas del Componente AddToCart", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  test("redirige al login con el query parameter de retorno si el usuario no está autenticado", () => {
    (useAuth as jest.Mock).mockReturnValue({ userData: null });

    render(<AddToCart product={mockProduct} />);

    const button = screen.getByRole("button", { name: /reservar destino/i });
    fireEvent.click(button);

    expect(mockPush).toHaveBeenCalledWith("/auth/login?redirect=/cart");
    const cartInStorage = JSON.parse(localStorage.getItem("cart") || "[]");
    expect(cartInStorage).toHaveLength(1);
  });

  test("agrega el producto a localStorage y redirige a /cart tras timeout si está autenticado", () => {
    jest.useFakeTimers();
    (useAuth as jest.Mock).mockReturnValue({
      userData: { user: { name: "Matias" }, token: "fake-token" },
    });

    render(<AddToCart product={mockProduct} />);

    const button = screen.getByRole("button", { name: /reservar destino/i });
    fireEvent.click(button);

    expect(screen.getByText(/¡agregado! redirigiendo/i)).toBeInTheDocument();

    jest.advanceTimersByTime(400);

    expect(mockPush).toHaveBeenCalledWith("/cart");
    const cartInStorage = JSON.parse(localStorage.getItem("cart") || "[]");
    expect(cartInStorage).toEqual([mockProduct]);

    jest.useRealTimers();
  });

  test("muestra alert si el producto ya está en el carrito", () => {
    window.alert = jest.fn();
    localStorage.setItem("cart", JSON.stringify([mockProduct]));
    (useAuth as jest.Mock).mockReturnValue({
      userData: { user: { name: "Matias" }, token: "fake-token" },
    });

    render(<AddToCart product={mockProduct} />);

    const button = screen.getByRole("button", { name: /reservar destino/i });
    fireEvent.click(button);

    expect(window.alert).toHaveBeenCalledWith("Este destino ya se encuentra en tu carrito.");
    expect(mockPush).toHaveBeenCalledWith("/cart");
  });
});