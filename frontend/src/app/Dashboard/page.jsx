import DashboardCard from "@/components/DashboardCard/DashboardCard";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <main className="dashboard-container">
      <h1 className="dashboard-title">Painel de Controle</h1>
      <div className="dashboard-grid">
        <DashboardCard title="Funcionários Ativos" value="128" />
        <DashboardCard title="Horas Trabalhadas Hoje" value="856h" />
        <DashboardCard title="Horas Extras do Mês" value="92h" />
        <DashboardCard title="Pontualidade Média" value="97%" />

        <section className="dashboard-graph">
          <h2>Frequência Semanal</h2>
          <div className="fake-graph"></div>
        </section>

        <section className="dashboard-graph">
          <h2>Horas por Turno</h2>
          <div className="fake-bar"></div>
        </section>

        <section className="dashboard-calendar">
          <h2>Calendário</h2>
          <div className="fake-calendar"></div>
        </section>
      </div>
    </main>
  );
}
