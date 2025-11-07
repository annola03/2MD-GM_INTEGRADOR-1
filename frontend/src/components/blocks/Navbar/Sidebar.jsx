"use client";
import { useState } from "react";
import SidebarItem from "./SidebarItem";
import "./sidebar.css";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <aside className={`sidebar ${!open ? "closed" : ""}`}>
      <button className="toggle" onClick={() => setOpen(!open)}>
        ❮
      </button>

      <div className="logo">
        <img src="/imagens/logo-Preta.png" width="28" height="28" alt="logo" style={{filter:"invert()"}}/>
        {open && <span>Painel de controle</span>}
      </div>

      <ul>
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

        <SidebarItem
          icon={
            <img
              src="https://img.icons8.com/ios-filled/50/FFFFFF/folder-invoices.png"
              alt="Projetos"
              width="22"
              height="22"
            />
          }
          text="Projects"
          open={open}
        />

        <SidebarItem
          icon={
            <img
              src="https://img.icons8.com/ios-filled/50/FFFFFF/checked-checkbox.png"
              alt="Tarefas"
              width="22"
              height="22"
            />
          }
          text="Tasks"
          open={open}
        />

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
      </ul>
    </aside>
  );
}
