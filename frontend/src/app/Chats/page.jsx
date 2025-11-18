"use client";
import { useState } from "react";
import "./chat.css";

export default function Chats() {
  const [selectedChat, setSelectedChat] = useState("Suporte");

  const chats = [
    { id: "Suporte", title: "Suporte", subtitle: "Atendimento técnico", icon: <img src="https://img.icons8.com/windows/32/online-support.png"/>},
    { id: "Shop", title: "Shop", subtitle: "Pedidos e compras", icon: <img width="32" height="32" src="https://img.icons8.com/pulsar-line/48/FFFFFF/permanent-job.png" alt="permanent-job"/> },
    { id: "Time", title: "Time", subtitle: "Comunicação interna", icon: <img width="32" height="32" src="https://img.icons8.com/water-color/50/group-foreground-selected.png" alt="group-foreground-selected"/>},
  ];

  return (
    <div className="uiContainer">

      <aside className="uiSidebar">
        <h2 className="uiSidebarTitle">Conversas</h2>

        {chats.map(chat => (
          <div
            key={chat.id}
            className={`uiChatItem ${selectedChat === chat.id ? "active" : ""}`}
            onClick={() => setSelectedChat(chat.id)}
          >
            <div className="uiChatIcon">{chat.icon}</div>
            <div>
              <h4>{chat.title}</h4>
              <p>{chat.subtitle}</p>
            </div>
          </div>
        ))}
      </aside>

      
      <main className="uiChatMain">
        <header className="uiChatHeader">
          <h3>{selectedChat}</h3>
        </header>

        <div className="uiChatBody">

          <div className="uiMsgRow">
            <div className="uiAvatar">S</div>
            <div className="uiBubble">
              Olá! Como posso ajudar em <b>{selectedChat}</b>?
            </div>
          </div>

          <div className="uiMsgRow sent">
            <div className="uiBubble">
              Testando o chat de {selectedChat}.
            </div>
          </div>

        </div>

        <div className="uiInputArea">
          <input type="text" placeholder="Digite sua mensagem..." />
          <button>Enviar</button>
        </div>
      </main>

    </div>
  );
}
