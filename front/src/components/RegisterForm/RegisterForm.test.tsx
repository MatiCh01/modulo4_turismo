import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RegisterForm } from "./RegisterForm";
import { registerUser } from "@/services/auth.service";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/services/auth.service", () => ({
  registerUser: jest.fn(),
}));

jest.mock("@/helpers/validateRegister", () => ({
  validateRegisterForm: jest.fn(() => ({})),
}));

describe("Pruebas de Integración - RegisterForm", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  test("debe permitir escribir en los campos del formulario", async () => {
    render(<RegisterForm />);

    const nameInput = screen.getByPlaceholderText("Juan Pérez");
    const emailInput = screen.getByPlaceholderText("tu@email.com");

    await userEvent.type(nameInput, "Matias Chocobar");
    await userEvent.type(emailInput, "matias@test.com");

    expect(nameInput).toHaveValue("Matias Chocobar");
    expect(emailInput).toHaveValue("matias@test.com");
  });

  test("debe registrar al usuario con éxito, mostrar mensaje y redirigir luego de 2 segundos", async () => {
    jest.useFakeTimers();
    (registerUser as jest.Mock).mockResolvedValueOnce({ success: true });

    const { container } = render(<RegisterForm />);
    const form = container.querySelector("form")!;

    fireEvent.submit(form);

    await waitFor(() => {
      expect(registerUser).toHaveBeenCalled();
    });

    expect(await screen.findByText(/¡registro exitoso!/i)).toBeInTheDocument();

    jest.advanceTimersByTime(2000);

    expect(mockPush).toHaveBeenCalledWith("/auth/login");

    jest.useRealTimers();
  });

  test("debe mostrar un mensaje de error si el servicio de registro falla", async () => {
    (registerUser as jest.Mock).mockRejectedValueOnce(
      new Error("El email ya está registrado")
    );

    const { container } = render(<RegisterForm />);
    const form = container.querySelector("form")!;

    fireEvent.submit(form);

    expect(await screen.findByText("El email ya está registrado")).toBeInTheDocument();
  });
});