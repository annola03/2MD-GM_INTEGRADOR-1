"use client";
import { useState, useEffect, useContext } from "react";
import "./BaterPonto.css";
import { UserContext } from "@/context/UserContext"; // PEGAR USUÁRIO LOGADO

export default function BaterPontoPage() {
  const { user } = useContext(UserContext); // NOME DO FUNCIONÁRIO LOGADO

  const [horaAtual, setHoraAtual] = useState(new Date());
  const [animando, setAnimando] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setHoraAtual(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const registrarPonto = async () => {
    const GMID = user?.GMID;
    const turno = user?.Turno;

    if (!GMID || !turno) {
      console.error("Erro: GMID ou Turno não encontrados no user");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/funcionarios/registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ GMID, Turno: turno }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Erro ao registrar ponto:", data);
        return;
      }

      console.log("Ponto registrado:", data);
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const formatarHora = (date) =>
    date.toLocaleTimeString("pt-BR", { hour12: false });

  const baterPonto = async () => {
    if (animando) return;

    setAnimando(true);

    await fetch("http://localhost:3001/api/funcionarios/registrar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        funcionarioId: user?.id,
        nome: user?.nome,
        hora: formatarHora(new Date()),
      }),
    });

    setTimeout(() => setAnimando(false), 1500);
  };

  return (
    <main className="ponto-container">
      <div className="maquina-nova">
        <h2 className="titulo">Ponto Eletrônico</h2>

        <div className="visor">
          <span className="label">Horário Atual</span>
          <span className="hora-visivel">{formatarHora(horaAtual)}</span>
        </div>

        <div className="leitor-novo"></div>
      </div>

      <div
        className={`cartao-unico ${animando ? "animando" : ""}`}
        onClick={() => {
          baterPonto(); // sua animação
          registrarPonto(); // agora registra o ponto com GMID e Turno do user
        }}
      >
        <div className="foto-user"></div>
        <span className="nome-user">{user?.Nome || "Usuário"}</span>

        <img src="/imagens/GM-logo.png" className="logo-cartao" />
      </div>
    </main>
  );
}
