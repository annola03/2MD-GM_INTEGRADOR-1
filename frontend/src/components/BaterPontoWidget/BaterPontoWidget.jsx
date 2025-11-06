"use client";
import { useEffect, useState } from "react";
import "./BaterPontoWidget.css";

export default function BaterPontoWidget() {
  const [funcionarios, setFuncionarios] = useState([
    { id: 1, nome: "Rebecca " },
    { id: 2, nome: "Anna" },
    { id: 3, nome: "Willian" },
  ]);
  const [animando, setAnimando] = useState(false);
  const [cartaoAtivo, setCartaoAtivo] = useState(null);
  const [horaAtual, setHoraAtual] = useState(new Date());

  // Atualiza o relógio em tempo real
  useEffect(() => {
    const interval = setInterval(() => setHoraAtual(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatarHora = (date) =>
    date.toLocaleTimeString("pt-BR", { hour12: false });

  const tocarSom = () => {
    const audio = new Audio("/bip.mp3");
    audio.play();
  };

  const baterPonto = async (func) => {
    if (animando) return;
    setAnimando(true);
    setCartaoAtivo(func.id);

    // Reordena: o clicado vai para o final
    const novos = funcionarios.filter((f) => f.id !== func.id);
    novos.push(func);
    setFuncionarios(novos);

    // Delay antes de bater ponto (para ver o movimento)
    await new Promise((res) => setTimeout(res, 2000));

    // Animação + som
    tocarSom();

    // Simulação da API
    await fetch("/api/bater-ponto", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        funcionarioId: func.id,
        nome: func.nome,
        hora: formatarHora(new Date()),
      }),
    });

    // Finaliza
    await new Promise((res) => setTimeout(res, 1000));
    setAnimando(false);
    setCartaoAtivo(null);
  };

  return (
    <div className="ponto-widget">
      <div className="maquina">
        <img src="/imagens/GM-logo.png" alt="GM" className="logo-gm" />
        <div className="tela">
          <span>Relógio de Ponto</span>
          <span className="hora">{formatarHora(horaAtual)}</span>
        </div>
        <div className="leitor"></div>
      </div>

      <div className="cartoes">
        {funcionarios.map((f, index) => (
          <div
            key={f.id}
            className={`cartao pos-${index + 1} ${
              animando && cartaoAtivo === f.id ? "animando" : ""
            }`}
            onClick={() => baterPonto(f)}
          >
            <div className="foto">{f.foto}</div>
            <span>{f.nome}</span>
            <img src="/imagens/GM-logo.png" alt="GM" className="cartao-logo" />
          </div>
        ))}
      </div>
    </div>
  );
}
