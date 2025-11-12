"use client";
import { useState } from "react";
import "./gestor.css";

export default function GestorPage() {
  const [areaSelecionada, setAreaSelecionada] = useState("Todos");
  const [timeSelecionado, setTimeSelecionado] = useState("Todos");

  const areas = ["Todos", "Produção", "RH", "TI", "Financeiro"];
  const times = ["Todos", "Time A", "Time B", "Time C"];

  const colaboradores = [
    { nome: "Anna Costa", area: "RH", time: "Time A", status: "Ativo" },
    { nome: "João Pedro", area: "TI", time: "Time B", status: "Ausente" },
    { nome: "Mariana Silva", area: "Produção", time: "Time C", status: "Ativo" },
  ];

  const [form, setForm] = useState({ nome: "", horarioAntigo: "", novoHorario: "", motivo: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Solicitação enviada para ${form.nome}`);
    setForm({ nome: "", horarioAntigo: "", novoHorario: "", motivo: "" });
  };

  const filtrados = colaboradores.filter(
    (c) =>
      (areaSelecionada === "Todos" || c.area === areaSelecionada) &&
      (timeSelecionado === "Todos" || c.time === timeSelecionado)
  );

  return (
    <div className="gestor-container">
      <h1>Gestão de Equipes e Ponto</h1>
      
      <section className="gestor-card">
        <h2>Solicitar Ajuste de Horário</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome do colaborador"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
            required
          />
          <input
            type="time"
            value={form.horarioAntigo}
            onChange={(e) => setForm({ ...form, horarioAntigo: e.target.value })}
            required
          />
          <input
            type="time"
            value={form.novoHorario}
            onChange={(e) => setForm({ ...form, novoHorario: e.target.value })}
            required
          />
          <textarea
            placeholder="Motivo da solicitação"
            value={form.motivo}
            onChange={(e) => setForm({ ...form, motivo: e.target.value })}
            required
          />
          <button type="submit">Enviar Solicitação</button>
        </form>
      </section>

  
      <section className="gestor-card">
        <h2>Dashboard de Equipes</h2>
        <div className="filtros">
          <select value={areaSelecionada} onChange={(e) => setAreaSelecionada(e.target.value)}>
            {areas.map((a) => <option key={a}>{a}</option>)}
          </select>
          <select value={timeSelecionado} onChange={(e) => setTimeSelecionado(e.target.value)}>
            {times.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>

        <div className="time-grid">
          {filtrados.map((colab, i) => (
            <div key={i} className="time-card">
              <h3>{colab.nome}</h3>
              <p><strong>Área:</strong> {colab.area}</p>
              <p><strong>Time:</strong> {colab.time}</p>
              <p className={`status ${colab.status === "Ativo" ? "ativo" : "ausente"}`}>
                {colab.status}
              </p>
            </div>
          ))}
          {filtrados.length === 0 && <p>Nenhum colaborador encontrado.</p>}
        </div>
      </section>
    </div>
  );
}
