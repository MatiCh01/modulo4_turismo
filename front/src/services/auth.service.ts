import { ILoginProps, IRegisterProps } from "@/interface/auth.interface";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3005";

export const registerUser = async (user: IRegisterProps) => {
  const response = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();

  if (!response.ok) {
    // Capturamos el mensaje de error devuelto por la API para notificar al usuario
    throw new Error(data.message || "Error al registrar el usuario");
  }

  return data;
};

export const loginUser = async (credentials: ILoginProps) => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Credenciales inválidas");
  }

  return data;
};