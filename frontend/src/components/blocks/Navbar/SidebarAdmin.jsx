"use client";
import { useState, useEffect } from "react";
import "./SidebarAdmin.css";

export default function SidebarAdmin() {
  const imagens = ["/imagens/img1.png", "/imagens/img2.png", "/imagens/img3.png"];
  const [atual, setAtual] = useState(0); 
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAtual((prev) => (prev + 1) % imagens.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside className={`sidebar ${!open ? "closed" : ""}`}>
      <button className="toggle" onClick={() => setOpen(!open)}>
        ❮
      </button>
      <div className="admin-logo">
        <img src="/imagens/logo-Preta.png" alt="Logo do administrador" style={{filter:"invert()"}}/>
        {open && <p className="admin-role">Administrador</p>}
      </div>

      <nav className="admin-menu">
        <a href="/Admin/Cadastro" className="admin-link admin-active">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 
            2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 
            0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zm8 
            0c-.29 0-.62.02-.97.05C16.11 13.64 18 14.81 18 
            16.5V19h4v-2.5c0-2.33-4.67-3.5-6-3.5z"/>
          </svg>
          {open && <p className="admin-text">Cadastro de Funcionário</p>}
        </a>

        <a href="#" className="admin-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
            <path d="M14 2H6c-1.1 0-2 .9-2 
            2v16c0 1.1.9 2 2 2h12c1.1 0 
            2-.9 2-2V8l-6-6zM13 9V3.5L18.5 
            9H13z"/>
          </svg>
          {open && <p className="admin-text">Gerenciar Funcionário</p>}
        </a>

        <a href="#" className="admin-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
            <path d="M4 22h16v-2H4V4H2v18c0 1.1.9 2 2 2zm16-6-5.5-7.5-4.5 
            6L7 10l-5 7h18z"/>
          </svg>
          {open && <p className="admin-text">Relatorios de Funcionários</p>}
        </a>
      </nav>

      <button className="admin-logout-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
          <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 
          1.41L12.67 11H3v2h9.67l-2.58 
          2.59zM19 3h-8v2h8v14h-8v2h8c1.1 
          0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
        </svg>
        {open && <p className="admin-text">Sair</p>}
      </button>
    </aside>
  );
}
