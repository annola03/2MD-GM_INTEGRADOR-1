"use client";

import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const UserContext = createContext(null);

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [carregando, setCarregando] = useState(true);

  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    // Se quiser redirecionar:
     window.location.href = "/";
  };

  useEffect(() => {
    async function carregarUsuario() {
      const token = localStorage.getItem("token");

      // Nenhum token → ninguém logado
      if (!token) {
        setCarregando(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:3001/api/auth/perfil", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          // Usuário carregado
          setUser(data.dados);
        } else {
          // Token inválido → apagar e redirecionar
          localStorage.removeItem("token");
          setUser(null);
          router.push("/");
        }
      } catch (error) {
        localStorage.removeItem("token");
        setUser(null);
        router.push("/");
      }

      setCarregando(false);
    }

    carregarUsuario();
  }, [router]);

  return (
    <UserContext.Provider value={{ user, setUser, carregando, logout }}>
      {children}
    </UserContext.Provider>
  );
}
