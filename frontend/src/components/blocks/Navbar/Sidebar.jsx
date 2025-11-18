"use client";
import { useState, useContext } from "react";
import { UserContext } from "@/context/UserContext";
import SidebarItem from "./SidebarItem";
import Link from "next/link";
import "./sidebar.css";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const { user } = useContext(UserContext);

  // Permissões
  const podeVerAdmin = user?.tipo === "admin" || user?.tipo === "gestor";

  return (
    <aside className={`sidebar ${!open ? "closed" : ""}`}>
      <button className="toggle" onClick={() => setOpen(!open)}>
        ❮
      </button>
      <Link href="/Principal">
        <div className="logo">
          <img
            src="/imagens/logoNova.png"
            width="28"
            height="28"
            alt="logo"
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: "white",
              borderRadius: "10px",
            }}
          />
          {open && <span>Painel de controle</span>}
        </div>
      </Link>

      <ul>
        {/* Perfil */}
        <Link href="/Perfil">
          <SidebarItem
            icon={
              <img
                src="https://img.icons8.com/ios-filled/50/FFFFFF/user-male-circle.png"
                alt="Perfil"
                width="22"
                height="22"
              />
            }
            text="Profile"
            open={open}
          />
        </Link>

        {/* Usuários - só admin e gestor */}
        {podeVerAdmin && (
          <Link href="/Users">
            <SidebarItem
              icon={
                <img
                  src="https://img.icons8.com/?size=100&id=MBPMOlrj4qML&format=png&color=FFFFFF"
                  alt="Usuários"
                  width="22"
                  height="22"
                />
              }
              text="Usuários"
              open={open}
            />
          </Link>
        )}

        {/* Chats */}
        <Link href="/Chats">
          <SidebarItem
            icon={
              <img
                src="https://img.icons8.com/ios-filled/50/FFFFFF/speech-bubble-with-dots.png"
                alt="Chats"
                width="22"
                height="22"
              />
            }
            text="Group Chats"
            open={open}
          />
        </Link>

        {/* Dashboard - só admin e gestor */}
        {podeVerAdmin && (
          <Link href="/Dashboard">
            <SidebarItem
              icon={
                <img
                  src="https://img.icons8.com/ios-filled/50/FFFFFF/combo-chart.png"
                  alt="Relatórios"
                  width="22"
                  height="22"
                />
              }
              text="Reports"
              open={open}
            />
          </Link>
        )}

        {/* Ponto demonstrativo */}
        <Link href="/Ponto">
          <SidebarItem
            icon={
              <img
                src="https://img.icons8.com/ios-filled/50/clock.png"
                alt="Ponto demonstrativo"
                width="22"
                height="22"
                style={{ filter: "invert()" }}
              />
            }
            text="Ponto demonstrativo"
            open={open}
          />
        </Link>
      </ul>
    </aside>
  );
}
