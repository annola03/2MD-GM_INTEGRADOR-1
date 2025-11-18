"use client";

import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCarregando(false); 
      return;
    }

    async function carregarUsuario() {
      try {
        const res = await fetch("http://localhost:3001/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
console.log(token);
        const data = await res.json();

        if (res.ok) {
          setUser(data.dados);
        } else {
          setUser(null);
        }
      } catch (e) {
        setUser(null);
      }

      setCarregando(false);
    }

    carregarUsuario();
  }, []);
  console.log(user);

  return (
    <UserContext.Provider value={{ user, setUser, carregando }}>
      {children}
    </UserContext.Provider>
  );
}
