import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

describe("Pruebas del Componente Footer", () => {
  test("debe renderizar el logo, título, enlaces de navegación y copyright", () => {
    render(<Footer />);

    // Verifica que el footer como etiqueta estructural exista
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();

    // Verifica la imagen del logo e identidad
    const logoImg = screen.getByAltText("Nativa Icono");
    expect(logoImg).toBeInTheDocument();
    expect(screen.getByText("NATIVA VIAJES")).toBeInTheDocument();

    // Verifica los enlaces y sus rutas de navegación
    const linkDestinos = screen.getByRole("link", { name: /destinos/i });
    const linkCarrito = screen.getByRole("link", { name: /mi carrito/i });
    const linkCuenta = screen.getByRole("link", { name: /mi cuenta/i });

    expect(linkDestinos).toHaveAttribute("href", "/");
    expect(linkCarrito).toHaveAttribute("href", "/cart");
    expect(linkCuenta).toHaveAttribute("href", "/dashboard");

    // Verifica el texto de copyright con el año actual
    const currentYear = new Date().getFullYear().toString();
    expect(
      screen.getByText(new RegExp(`${currentYear} Nativa. Todos los derechos reservados.`, "i"))
    ).toBeInTheDocument();
  });
});