import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Navbar } from "./Navbar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

describe("Pruebas del Componente Navbar", () => {
  const mockPush = jest.fn();
  const mockLogout = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  test("renderiza enlaces de Ingresar y Registrarse cuando NO hay usuario autenticado", () => {
    (useAuth as jest.Mock).mockReturnValue({
      userData: null,
      logout: mockLogout,
    });

    render(<Navbar />);

    expect(screen.getByRole("link", { name: /ingresar/i })).toHaveAttribute("href", "/auth/login");
    expect(screen.getByRole("link", { name: /registrarse/i })).toHaveAttribute("href", "/auth/register");
    expect(screen.queryByText(/cerrar sesión/i)).not.toBeInTheDocument();
  });

  test("renderiza Mi Perfil, Carrito y botón Cerrar Sesión cuando SI hay usuario autenticado", () => {
    (useAuth as jest.Mock).mockReturnValue({
      userData: {
        user: { name: "Matias Chocobar" },
        token: "token-123",
      },
      logout: mockLogout,
    });

    render(<Navbar />);

    expect(screen.getByRole("link", { name: /mi perfil \(matias\)/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /carrito/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cerrar sesión/i })).toBeInTheDocument();
  });

  test("ejecuta logout y redirige a /auth/login al hacer clic en Cerrar Sesión", async () => {
    (useAuth as jest.Mock).mockReturnValue({
      userData: {
        user: { name: "Matias Chocobar" },
        token: "token-123",
      },
      logout: mockLogout,
    });

    render(<Navbar />);

    const logoutBtn = screen.getByRole("button", { name: /cerrar sesión/i });
    await userEvent.click(logoutBtn);

    expect(mockLogout).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith("/auth/login");
  });
});