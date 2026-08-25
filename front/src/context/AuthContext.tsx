"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { IUserSession } from "@/interface/auth.interface";

interface AuthContextType {
  userData: IUserSession | null;
  setUserData: (userData: IUserSession | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  userData: null,
  setUserData: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<IUserSession | null>(null);

  // Al montar la app en el cliente, leemos la sesión guardada en localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("userSession");
      if (storedUser) {
        setUserData(JSON.parse(storedUser));
      }
    }
  }, []);

  // Cada vez que userData cambia, actualizamos o limpiamos el localStorage
  useEffect(() => {
    if (userData) {
      localStorage.setItem("userSession", JSON.stringify(userData));
    } else {
      localStorage.removeItem("userSession");
    }
  }, [userData]);

  const logout = () => {
    setUserData(null);
    localStorage.removeItem("userSession");
  };

  return (
    <AuthContext.Provider value={{ userData, setUserData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);