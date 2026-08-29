import { validateLoginForm } from "./validateLogin";

describe("Pruebas del Helper validateLoginForm", () => {
  test("debe retornar un objeto vacío si las credenciales son válidas", () => {
    const values = {
      email: "matias@test.com",
      password: "password123",
    };

    const errors = validateLoginForm(values);
    expect(errors).toEqual({});
  });

  test("debe retornar errores si los campos están vacíos", () => {
    const values = {
      email: "",
      password: "",
    };

    const errors = validateLoginForm(values);
    expect(errors.email).toBe("El email es requerido");
    expect(errors.password).toBe("La contraseña es requerida");
  });

  test("debe detectar si el formato de email es inválido", () => {
    const values = {
      email: "email-invalido",
      password: "password123",
    };

    const errors = validateLoginForm(values);
    expect(errors.email).toBe("El email es inválido");
    expect(errors.password).toBeUndefined();
  });
});