"use client";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import "./header.css";

export default function Header() {
  const { user, carregando, logout } = useContext(UserContext);

  if (carregando) {
    return null;
  }

  return (
    <header className="header">
      <div className="header-left">
        <h2 className="header-title">Painel do Ponto Eletronico</h2>
      </div>

      <div className="header-right">
        <div className="stats">
          <span>
            <strong>Horas totais:</strong> 220
          </span>
        </div>

        <div className="profile">
          <img
            src="https://i.pravatar.cc/40"
            alt="User"
            className="avatar"
          />

          <div className="profile-info">
            <p className="profile-name">{user?.Nome}</p>
            <p className="profile-role">{user?.tipo}</p>
          </div>

          {/* 🔴 BOTÃO DE LOGOUT */}
          <button className="logout-btn" onClick={logout}>
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}
