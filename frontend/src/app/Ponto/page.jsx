"use client";
import { useState, useEffect, useContext } from "react";
import "./BaterPonto.css";
import { UserContext } from "@/context/UserContext"; // PEGAR USUÁRIO LOGADO

export default function BaterPontoPage() {
  const { user } = useContext(UserContext); // NOME DO FUNCIONÁRIO LOGADO

  const [horaAtual, setHoraAtual] = useState(new Date());
  const [animando, setAnimando] = useState(false);
  const [tipoPonto, setTipoPonto] = useState("Carregando...");

  const verificarTipoPonto = async () => {
    if (!user?.GMID) return;

    try {
      const res = await fetch(
        `http://localhost:3001/api/funcionarios/proximoPonto/${user.GMID}`
      );
      const data = await res.json();

      setTipoPonto(data.tipo);
    } catch (error) {
      console.error("Erro ao verificar tipo de ponto:", error);
    }
  };

  useEffect(() => {
    verificarTipoPonto();
  }, [user]);

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
      const res = await fetch(
        "http://localhost:3001/api/funcionarios/registrar",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ GMID, Turno: turno }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.error("Erro ao registrar ponto:", data);
        return;
      }

      console.log("Ponto registrado:", data);
      await verificarTipoPonto();

    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const formatarHora = (date) =>
    date.toLocaleTimeString("pt-BR", { hour12: false });

  const baterPonto = async () => {
    if (animando) return;

    setAnimando(true);

    setTimeout(() => setAnimando(false), 1500);
  };

  return (
    <main className="ponto-container">
      <div className="maquina-nova">
        <h2 className="titulo">Ponto Eletrônico</h2>
        <div className="info-ponto">
          <span className="label">Próximo Registro</span>
          <span className="tipo-ponto">{tipoPonto}</span>
        </div>

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
