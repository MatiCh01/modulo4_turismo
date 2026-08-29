import { validateRegisterForm } from "./validateRegister";

describe("Pruebas del Helper validateRegisterForm", () => {
  test("debe retornar un objeto vacío si todos los campos son válidos", () => {
    const values = {
      name: "Matias Chocobar",
      email: "matias@test.com",
      password: "password123",
      address: "Calle 123",
      phone: "+541112345678",
    };

    const errors = validateRegisterForm(values);
    expect(errors).toEqual({});
  });

  test("debe requerir todos los campos si están vacíos", () => {
    const values = {
      name: "",
      email: "",
      password: "",
      address: "",
      phone: "",
    };

    const errors = validateRegisterForm(values);
    expect(errors.name).toBe("El nombre es requerido");
    expect(errors.email).toBe("El email es requerido");
    expect(errors.password).toBe("La contraseña es requerida");
    expect(errors.address).toBe("La dirección es requerida");
    expect(errors.phone).toBe("El teléfono es requerido");
  });

  test("debe validar el formato del email y la longitud de la contraseña", () => {
    const values = {
      name: "Matias",
      email: "correo-mal",
      password: "123",
      address: "Calle 123",
      phone: "+541112345678",
    };

    const errors = validateRegisterForm(values);
    expect(errors.email).toBe("El email es inválido");
    expect(errors.password).toBe("Debe tener al menos 6 caracteres");
  });
});