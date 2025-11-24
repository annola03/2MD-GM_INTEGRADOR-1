"use client";
import { useState, useEffect } from "react";
import "./chat.css";

export default function Chats() {
  const [selectedChat, setSelectedChat] = useState("Suporte");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState({
    Suporte: [],
    Shop: [],
    Time: [],
  });

  // --- Lista de membros do chat Time ---
  const membrosTime = [
    { nome: "Ana – RH", personalidade: "Empática e comunicativa" },
    { nome: "Carlos – TI", personalidade: "Técnico e direto" },
    { nome: "Marcos – Gestor", personalidade: "Formal e líder" },
  ];

  // --- Add mensagem no estado ---
  function addMessage(chatId, newMessage) {
    setMessages(prev => ({
      ...prev,
      [chatId]: [...prev[chatId], newMessage],
    }));
  }

  // --- IA SUPORTE ---
  async function iaSuporte(text) {
    const res = await fetch("http://localhost:3001/ia/suporte", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });

    const data = await res.json();
    addMessage("Suporte", { sender: "ia", text: data.reply });
  }

  // --- IA TIME ---
  async function iaTime(text) {
    const membro = membrosTime[Math.floor(Math.random() * membrosTime.length)];

    const res = await fetch("http://localhost:3001/ia/time", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text, membro }),
    });

    const data = await res.json();
    addMessage("Time", { sender: membro.nome, text: data.reply });
  }

  // --- SHOP AUTO ---
  async function shopAutoMessage() {
    const res = await fetch("http://localhost:3001/ia/shop");
    const data = await res.json();

    addMessage("Shop", { sender: "bot", text: data.reply });
  }

  // Mensagens automáticas do Shop quando o chat é aberto
  useEffect(() => {
    if (selectedChat === "Shop") {
      const loop = setInterval(shopAutoMessage, 8000);
      return () => clearInterval(loop);
    }
  }, [selectedChat]);

  // --- Enviar mensagem ---
  function handleSend() {
    if (message.trim() === "") return;

    addMessage(selectedChat, { sender: "user", text: message });

    if (selectedChat === "Suporte") iaSuporte(message);
    if (selectedChat === "Time") iaTime(message);
    if (selectedChat === "Shop") shopAutoMessage();

    setMessage("");
  }

  const chats = [
    {
      id: "Suporte",
      title: "Suporte",
      subtitle: "Atendimento técnico",
      icon: <img src="https://img.icons8.com/windows/32/online-support.png" />,
    },
    {
      id: "Shop",
      title: "Shop",
      subtitle: "Pedidos e compras",
      icon: (
        <img
          width="32"
          height="32"
          src="https://img.icons8.com/pulsar-line/48/FFFFFF/permanent-job.png"
        />
      ),
    },
    {
      id: "Time",
      title: "Time",
      subtitle: "Comunicação interna",
      icon: (
        <img
          width="32"
          height="32"
          src="https://img.icons8.com/water-color/50/group-foreground-selected.png"
        />
      ),
    },
  ];

  return (
    <div className="uiContainer">
      {/* SIDEBAR */}
      <aside className="uiSidebar">
        <h2 className="uiSidebarTitle">Conversas</h2>

        {chats.map(chat => (
          <div
            key={chat.id}
            className={`uiChatItem ${
              selectedChat === chat.id ? "active" : ""
            }`}
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

      {/* MAIN CHAT */}
      <main className="uiChatMain">
        <header className="uiChatHeader">
          <h3>{selectedChat}</h3>
        </header>

        <div className="uiChatBody">
          {messages[selectedChat].map((msg, index) => (
            <div
              key={index}
              className={`uiMsgRow ${msg.sender === "user" ? "sent" : ""}`}
            >
              {msg.sender !== "user" && (
                <div className="uiAvatar">
                  {msg.sender[0].toUpperCase()}
                </div>
              )}

              <div className="uiBubble">{msg.text}</div>
            </div>
          ))}
        </div>

        {/* INPUT */}
        <div className="uiInputArea">
          <input
            type="text"
            placeholder="Digite sua mensagem..."
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend}>Enviar</button>
        </div>
      </main>
    </div>
  );
}
