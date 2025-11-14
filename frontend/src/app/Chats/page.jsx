"use client";
import { useState } from "react";
import "./chat.css";

export default function Chats() {
  const [selectedChat, setSelectedChat] = useState("Suporte");

  const cards = [
    { id: "Suporte", title: "Suporte", description: "Atendimento geral e ajuda técnica.", icon: "🛠️" },
    { id: "Shop", title: "Shop", description: "Status de pedidos e compras.", icon: "" },
    { id: "Time", title: "Time", description: "Comunicação interna com o time.", icon: "👥" },
  ];

  return (
    <div className="chatContainer">

      <div className="leftPanel">
        <h3 className="title">Conversas</h3>

        {cards.map((card) => (
          <div
            key={card.id}
            className={`card ${selectedChat === card.id ? "activeCard" : ""}`}
            onClick={() => setSelectedChat(card.id)}
          >
            <div className="cardIcon">{card.icon}</div>
            <div>
              <h4>{card.title}</h4>
              <p>{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rightPanel">
        <div className="chatHeader">
          <h3>{selectedChat}</h3>
        </div>

        <div className="chatBody">
          <div className="messageReceived">
            Olá! Como posso ajudar em <b>{selectedChat}</b>?
          </div>

          <div className="messageSent">
            Testando o chat de {selectedChat}.
          </div>
        </div>

        <div className="chatInput">
          <input type="text" placeholder="Digite uma mensagem..." />
          <button>Enviar</button>
        </div>
      </div>

    </div>
  );
}
