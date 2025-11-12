"use client";
import { useState } from "react";
import SidebarItem from "./SidebarItem";
import Link from "next/link"; 
import "./sidebar.css";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <aside className={`sidebar ${!open ? "closed" : ""}`}>
      <button className="toggle" onClick={() => setOpen(!open)}>
        ❮
      </button>

      <div className="logo">
        <img
          src="/imagens/logoNova.png"
          width="28"
          height="28"
          alt="logo"
          style={{ width:"50px", height:"50px", backgroundColor:"white", borderRadius:"10px"}}
        />
        {open && <span>Painel de controle</span>}
      </div>

      <ul>
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

        <Link href="/projects">
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
        </Link>

        <Link href="/tasks">
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
        </Link>

        <Link href="/chats">
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

        <Link href="/reports">
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

        <Link href="/Ponto">
          <SidebarItem
            icon={
              <img
                src="https://img.icons8.com/ios-filled/50/FFFFFF/combo-chart.png"
                alt="Ponto demonstrativo"
                width="22"
                height="22"
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
