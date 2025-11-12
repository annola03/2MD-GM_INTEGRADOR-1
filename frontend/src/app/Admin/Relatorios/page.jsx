"use client";
import { useState } from "react";
import "./relatorios.css";

export default function RelatoriosFuncionarios() {
  const [dados] = useState([
    { nome: "Anna", horas: 160 },
    { nome: "Willian", horas: 155 },
    { nome: "Rebecca", horas: 170 },
    { nome: "Lucas", horas: 150 },
    { nome: "Matheus", horas: 175 },
  ]);

  const totalFuncionarios = dados.length;
  const mediaHoras = Math.round(
    dados.reduce((acc, f) => acc + f.horas, 0) / totalFuncionarios
  );
  const melhorFuncionario = dados.reduce((a, b) => (a.horas > b.horas ? a : b));

  const maxHoras = Math.max(...dados.map((d) => d.horas));

  return (
    <div className="relatorios-dashboard">
      <h1>Relatórios de Funcionários</h1>
      <p className="descricao">Painel visual de desempenho e produtividade.</p>

      {/* 🔹 Cards principais */}
      <div className="cards-container">
        <div className="card-relatorio">
          <h3>Total de Funcionários</h3>
          <p>{totalFuncionarios}</p>
        </div>

        <div className="card-relatorio">
          <h3>Média de Horas</h3>
          <p>{mediaHoras}h</p>
        </div>

        <div className="card-relatorio destaque">
          <h3>Melhor Desempenho</h3>
          <p>{melhorFuncionario.nome}</p>
        </div>
      </div>

      {/* 🔹 Gráfico CSS */}
      <div className="grafico-section">
        <h2>Produtividade Mensal</h2>
        <div className="grafico-barras">
          {dados.map((func) => (
            <div key={func.nome} className="barra-item">
              <div
                className="barra"
                style={{
                  height: `${(func.horas / maxHoras) * 100}%`,
                }}
              ></div>
              <span className="nome-func">{func.nome}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 Destaques */}
      <div className="destaques-section">
        <h2>Top Colaboradores</h2>
        <ul>
          {dados
            .sort((a, b) => b.horas - a.horas)
            .slice(0, 3)
            .map((f, i) => (
              <li key={i}>
                <span>{f.nome}</span>
                <span>{f.horas}h</span>
              </li>
            ))}
        </ul>
      </div>

      <button className="btn-exportar">📄 Exportar Relatório</button>
    </div>
  );
}
