import React, { ReactNode } from "react";
import { renderHook, act } from "@testing-library/react";
import { AuthProvider, useAuth } from "./AuthContext";

const mockUserSession = {
  token: "fake-jwt-token",
  user: {
    id: 1,
    name: "Matias",
    email: "matias@test.com",
    address: "Calle 123",
    phone: "123456",
    role: "user",
  },
};

describe("Pruebas de AuthContext", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test("inicializa con userData en null si localStorage está vacío", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.userData).toBeNull();
    expect(result.current.isInitialized).toBe(true);
  });

  test("carga los datos desde localStorage si existe una sesión previa", () => {
    localStorage.setItem("userSession", JSON.stringify(mockUserSession));

    const wrapper = ({ children }: { children: ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.userData).toEqual(mockUserSession);
  });

  test("permite establecer sesión (login) y guardar en localStorage", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.setUserData(mockUserSession);
    });

    expect(result.current.userData).toEqual(mockUserSession);
    expect(JSON.parse(localStorage.getItem("userSession") || "")).toEqual(
      mockUserSession
    );
  });

  test("limpia la sesión y localStorage al ejecutar logout", () => {
    localStorage.setItem("userSession", JSON.stringify(mockUserSession));
    localStorage.setItem("cart", JSON.stringify([{ id: 1 }]));

    const wrapper = ({ children }: { children: ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.logout();
    });

    expect(result.current.userData).toBeNull();
    expect(localStorage.getItem("userSession")).toBeNull();
    expect(localStorage.getItem("cart")).toBeNull();
  });
});