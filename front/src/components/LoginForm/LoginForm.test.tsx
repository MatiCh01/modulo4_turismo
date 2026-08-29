import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "./LoginForm";
import { loginUser } from "@/services/auth.service";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock("@/services/auth.service", () => ({
  loginUser: jest.fn(),
}));

jest.mock("@/context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("@/helpers/validateLogin", () => ({
  validateLoginForm: jest.fn(() => ({})),
}));

describe("Pruebas del Componente LoginForm", () => {
  const mockPush = jest.fn();
  const mockSetUserData = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue("/cart"),
    });
    (useAuth as jest.Mock).mockReturnValue({ setUserData: mockSetUserData });
  });

  test("permite ingresar email y contraseña", async () => {
    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText("tu@email.com");
    const passwordInput = screen.getByPlaceholderText("••••••••");

    await userEvent.type(emailInput, "usuario@test.com");
    await userEvent.type(passwordInput, "Password123!");

    expect(emailInput).toHaveValue("usuario@test.com");
    expect(passwordInput).toHaveValue("Password123!");
  });

  test("inicia sesión con éxito y redirige a la ruta definida en el query param", async () => {
    const fakeUserData = {
      token: "jwt-token-123",
      user: { id: 1, name: "Matias" },
    };
    (loginUser as jest.Mock).mockResolvedValueOnce(fakeUserData);

    render(<LoginForm />);

    await userEvent.type(screen.getByPlaceholderText("tu@email.com"), "usuario@test.com");
    await userEvent.type(screen.getByPlaceholderText("••••••••"), "Password123!");

    const submitBtn = screen.getByRole("button", { name: /ingresar/i });
    await userEvent.click(submitBtn);

    expect(loginUser).toHaveBeenCalledWith({
      email: "usuario@test.com",
      password: "Password123!",
    });

    expect(mockSetUserData).toHaveBeenCalledWith({
      token: "jwt-token-123",
      user: { id: 1, name: "Matias" },
    });

    expect(mockPush).toHaveBeenCalledWith("/cart");
  });

  test("muestra mensaje de error si las credenciales son inválidas", async () => {
    (loginUser as jest.Mock).mockRejectedValueOnce(
      new Error("Credenciales inválidas")
    );

    render(<LoginForm />);

    await userEvent.type(screen.getByPlaceholderText("tu@email.com"), "wrong@test.com");
    await userEvent.type(screen.getByPlaceholderText("••••••••"), "WrongPass!");

    const submitBtn = screen.getByRole("button", { name: /ingresar/i });
    await userEvent.click(submitBtn);

    expect(await screen.findByText("Credenciales inválidas")).toBeInTheDocument();
  });
});