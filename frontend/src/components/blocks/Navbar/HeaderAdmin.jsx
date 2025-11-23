"use client";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import "./header.css";

export default function Header() {
    const { user, carregando } = useContext(UserContext);
  
    if (carregando) {
      return null;
    }
  return (
    <header className="header">
      <div className="header-left">
        <h2 className="header-title">Painel Administrativo</h2>
      </div>

      <div className="header-right">
        <div className="stats">
          <span>
            <strong>Total:</strong> 75
          </span>
          <span>
            <strong>Usando:</strong> 60
          </span>
        </div>

        <div className="profile">
          <img src="https://i.pravatar.cc/40" alt="User" className="avatar" />
          <div className="profile-info">
            <p className="profile-name">{user?.Nome}</p>
            <p className="profile-role">{user?.tipo}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
