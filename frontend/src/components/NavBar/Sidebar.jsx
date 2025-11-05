"use client";
import { useState } from "react";
import SidebarItem from "./SidebarItem";
import "./sidebar.css";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <aside className={`sidebar ${!open ? "closed" : ""}`}>
      <button className="toggle" onClick={() => setOpen(!open)}>
        ❮
      </button>

      <div className="logo">
        <img src="/favicon.ico" width="28" height="28" alt="logo" />
        {open && <span>Painek de controle</span>}
      </div>

      <ul>
        <SidebarItem icon="👤" text="Profile" open={open} />
        <SidebarItem icon="👥" text="Users" open={open} />
        <SidebarItem icon="📁" text="Projects" open={open} />
        <SidebarItem icon="✅" text="Tasks" open={open} />
        <SidebarItem icon="💬" text="Group Chats" open={open} />
        <SidebarItem icon="📊" text="Reports" open={open} />
      </ul>
    </aside>
  );
}
