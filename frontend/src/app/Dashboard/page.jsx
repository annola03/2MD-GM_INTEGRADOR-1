"use client";
import { useEffect, useState } from "react";
import "./Dashboard.css";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell
} from "recharts";

export default function Dashboard() {
  const [usuarios, setUsuarios] = useState([]);
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [diasFiltro, setDiasFiltro] = useState("7");

  // ========= FORMATAR DATA =========
  function formatarData(d) {
    const date = new Date(d);
    return date.toLocaleDateString("pt-BR", {
      timeZone: "America/Sao_Paulo"
    });
  }

  function limparISO(d) {
    return d.split("T")[0]; // 2025-11-29
  }

  async function carregarDados() {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const [usuariosRes, registrosRes] = await Promise.all([
        fetch("http://localhost:3001/api/usuarios?limite=70", { headers }),
        fetch("http://localhost:3001/api/funcionarios?limite=3000", { headers }),
      ]);

      const usuariosData = await usuariosRes.json();
      const registrosData = await registrosRes.json();

      // FORMATAÇÃO DA DATA NA TABELA E NO GRÁFICO
      const registrosLimpos = (registrosData.funcionarios || []).map((r) => ({
        ...r,
        dataISO: limparISO(r.data_registro),     // YYYY-MM-DD
        dataFormatada: formatarData(r.data_registro),
      }));

      setUsuarios(usuariosData.dados || usuariosData.funcionarios || []);
      setRegistros(registrosLimpos);

    } catch (err) {
      console.error("Erro ao carregar API:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  const listaRegistros = Array.isArray(registros) ? registros : [];

  // ========= KPIs =========
  const totalFuncionarios = usuarios.length;
  // -------- FILTRAR SOMENTE O DIA DE HOJE --------
  const hojeISOonly = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  const registrosHoje = listaRegistros.filter(r => r.dataISO === hojeISOonly);

  // KPIs do dia
  const totalRegistros = registrosHoje.length;

  const totalAtrasos = registrosHoje.filter(r => r.Status === "Atraso").length;


  const faltas = Math.max(
    0,
    totalFuncionarios - new Set(listaRegistros.map(r => r.GMID)).size
  );

  if (loading) return <h2 style={{ padding: 40 }}>Carregando dashboard...</h2>;

  // ============== AGRUPAR POR DIA ==============
  const historicoPorDia = listaRegistros.reduce((acc, item) => {
    const dt = item.dataISO; // YYYY-MM-DD
    if (!acc[dt]) acc[dt] = { data: dt, total: 0 };
    acc[dt].total++;
    return acc;
  }, {});

  let listaDias = Object.values(historicoPorDia).sort(
    (a, b) => new Date(a.data) - new Date(b.data)
  );

  // ============== FILTRO ==============
  const hoje = new Date();
  const hojeISO = hoje.toISOString().split("T")[0];

  function filtrar(dias) {
    const limite = new Date();
    limite.setDate(limite.getDate() - dias);

    return listaDias.filter(d => {
      return new Date(d.data) >= limite;
    });
  }

  let movimentacaoPorDia = listaDias;

  if (diasFiltro === "hoje") {
    movimentacaoPorDia = listaDias.filter(d => d.data === hojeISO);
  } else {
    movimentacaoPorDia = filtrar(Number(diasFiltro));
  }

  // ============== DISTRIBUIÇÃO POR TURNO ==============
  const distribuicaoTurno = listaRegistros.reduce((acc, item) => {
    const turno = item.turno || "Indefinido";
    if (!acc[turno]) acc[turno] = { turno, total: 0 };
    acc[turno].total++;
    return acc;
  }, {});

  const dadosTurno = Object.values(distribuicaoTurno);

  return (
    <div className="dashboard">
      <h1 className="title">Dashboard Corporativo</h1>

      {/* ------------ CARDS ----------- */}
      <div className="cards-grid">
        <div className="summary-card blue">
          <h3>Funcionários ativos</h3>
          <p>{totalFuncionarios}</p>
          <span>Total cadastrados</span>
        </div>

        <div className="summary-card purple">
          <h3>Registros</h3>
          <p>{totalRegistros}</p>
          <span>Batidas de ponto</span>
        </div>

        <div className="summary-card pink">
          <h3>Atrasos</h3>
          <p>{totalAtrasos}</p>
          <span>Hoje</span>
        </div>

        <div className="summary-card green">
          <h3>Faltas</h3>
          <p>{faltas}</p>
          <span>Sem registro</span>
        </div>
      </div>

      {/* ------------ GRID ----------- */}
      <div className="dashboard-grid">

        {/* Gráfico Movimentação */}
        <div className="graph-card">
          <div className="card-header">
            <h2>Movimentação por Dia</h2>

            <select value={diasFiltro} onChange={(e) => setDiasFiltro(e.target.value)}>
              <option value="7">7 dias</option>
              <option value="30">30 dias</option>
              <option value="hoje">Hoje</option>
            </select>
          </div>

          <BarChart width={450} height={250} data={movimentacaoPorDia}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="data" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#4a6cf7" />
          </BarChart>
        </div>

        {/* Gráfico Pizza */}
        <div className="activity-card">
          <h2>Distribuição por Turno</h2>

          <PieChart width={220} height={220}>
            <Pie
              data={dadosTurno}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="total"
            >
              <Cell fill="#60a5fa" />
              <Cell fill="#6a88e7" />
              <Cell fill="#2c5d96" />
            </Pie>
            <Tooltip />
          </PieChart>

          <ul>
            <li><span className="dot blue"></span> Turno A</li>
            <li><span className="dot purple"></span> Turno B</li>
            <li><span className="dot pink"></span> Turno C</li>
          </ul>
        </div>

        {/* Tabela real */}
        <div className="table-card">
          <h2>Últimos registros</h2>
          <table>
            <thead>
              <tr>
                <th>GMID</th>
                <th>Dia</th>
                <th>Hora da entrada</th>
                <th>Hora da saída</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {listaRegistros.slice(0, 15).map((r) => (
                <tr key={r.id}>
                  <td>{r.GMID}</td>
                  <td>{r.dataFormatada}</td>
                  <td>{r.Entrada}</td>
                  <td>{r.Saida}</td>
                  <td className={r.Status === "Atraso" ? "late" : "ok"}>
                    {r.Status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Resumo */}
        <div className="white-card">
          <div className="white-content">
            <h3 style={{ fontWeight: 700, color: "#1e3a8a" }}>Resumo do dia</h3>
            <p><strong>{totalFuncionarios}</strong> funcionários</p>
            <hr />
            <p><strong>{totalAtrasos}</strong> atrasos</p>
            <hr />
            <p><strong>{faltas}</strong> faltas</p>
          </div>
        </div>

      </div>
    </div>
  );
}
