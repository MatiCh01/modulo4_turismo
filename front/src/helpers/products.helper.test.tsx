import { productsMock } from "./products.helper";

describe("Pruebas del Helper productsMock", () => {
  test("debe contener una lista válida de productos iniciales", () => {
    expect(Array.isArray(productsMock)).toBe(true);
    expect(productsMock.length).toBeGreaterThan(0);
  });

  test("cada producto debe tener las propiedades requeridas", () => {
    productsMock.forEach((product) => {
      expect(product).toHaveProperty("id");
      expect(product).toHaveProperty("name");
      expect(product).toHaveProperty("price");
      expect(product).toHaveProperty("stock");
      expect(product).toHaveProperty("image");
      expect(product).toHaveProperty("categoryId");
    });
  });
});