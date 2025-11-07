import "./Dashboard.css";

export default function Dashboard() {
  return (
    <main className="dashboard">
      <h1 className="title">Painel de Controle de Turnos</h1>

      <div className="cards-grid">
        <div className="summary-card blue">
          <h3>Funcionários Ativos</h3>
          <p>128</p>
          <span>+3% desde ontem</span>
        </div>
        <div className="summary-card purple">
          <h3>Horas Trabalhadas Hoje</h3>
          <p>856h</p>
          <span>+2.1% desde ontem</span>
        </div>
        <div className="summary-card pink">
          <h3>Horas Extras do Mês</h3>
          <p>92h</p>
          <span>-1.3% desde o mês passado</span>
        </div>
        <div className="summary-card green">
          <h3>Pontualidade Média</h3>
          <p>97%</p>
          <span>+1.2% desde a última semana</span>
        </div>
      </div>

      <section className="dashboard-grid">
        {/* === Gráfico === */}
        <div className="graph-card">
          <div className="card-header">
            <h2>Horas Trabalhadas por Semana</h2>
            <select>
              <option>Últimos 6 meses</option>
              <option>Último mês</option>
            </select>
          </div>
          <div className="fake-graph"></div>
        </div>

        {/* === Donut === */}
        <div className="activity-card">
          <h2>Atividade por Turno</h2>
          <div className="fake-donut"></div>
          <ul>
            <li><span className="dot blue"></span>Matutino – 25%</li>
            <li><span className="dot purple"></span>Diurno – 40%</li>
            <li><span className="dot pink"></span>Noturno – 35%</li>
          </ul>
        </div>

        {/* === Registro de ponto === */}
        <div className="table-card half-width">
          <h2>Registro de Ponto (Hoje)</h2>
          <table>
            <thead>
              <tr>
                <th>Funcionário</th>
                <th>Entrada</th>
                <th>Saída</th>
                <th>Turno</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Maria Souza</td>
                <td>08:00</td>
                <td>17:00</td>
                <td>Manhã</td>
                <td className="ok">✔️ Pontual</td>
              </tr>
              <tr>
                <td>João Lima</td>
                <td>08:45</td>
                <td>17:30</td>
                <td>Manhã</td>
                <td className="late">⏰ Atraso</td>
              </tr>
              <tr>
                <td>Ana Costa</td>
                <td>14:00</td>
                <td>22:00</td>
                <td>Tarde</td>
                <td className="ok">✔️ Pontual</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* === Novo quadro branco ao lado === */}
        <div className="activity-card white-card half-width">
          
          
        </div>
      </section>
    </main>
  );
}
