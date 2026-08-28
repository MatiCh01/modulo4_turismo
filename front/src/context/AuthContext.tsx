"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { IUserSession } from "@/interface/auth.interface";

interface AuthContextType {
  userData: IUserSession | null;
  setUserData: (userData: IUserSession | null) => void;
  logout: () => void;
  isInitialized: boolean;
}

const AuthContext = createContext<AuthContextType>({
  userData: null,
  setUserData: () => {},
  logout: () => {},
  isInitialized: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<IUserSession | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Carga inicial del localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("userSession");
      if (storedUser) {
        try {
          setUserData(JSON.parse(storedUser));
        } catch {
          localStorage.removeItem("userSession");
        }
      }
      setIsInitialized(true);
    }
  }, []);

  // Sincronización continua de userData hacia localStorage
  useEffect(() => {
    if (!isInitialized) return;

    if (userData) {
      localStorage.setItem("userSession", JSON.stringify(userData));
    } else {
      localStorage.removeItem("userSession");
    }
  }, [userData, isInitialized]);

  const logout = () => {
    setUserData(null);
    localStorage.removeItem("userSession");
    localStorage.removeItem("cart");
  };

  return (
    <AuthContext.Provider value={{ userData, setUserData, logout, isInitialized }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);