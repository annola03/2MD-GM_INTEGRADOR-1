"use client";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Carregar usuário do localStorage ao iniciar
  useEffect(() => {
    const token = localStorage.getItem("token");
    const email_padrao = localStorage.getItem("email_padrao");

    if (token && email_padrao) {
      setUser({ token, email_padrao });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
