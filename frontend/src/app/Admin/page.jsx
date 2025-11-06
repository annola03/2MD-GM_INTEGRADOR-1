"use client";
import React from "react";
import "./adm.css";

export default function AdminPage() {
  return (
    <div className="admin-container">

      <main className="admin-content">
        <header className="admin-header">
          <h1>Painel do Administrador</h1>
          <p>Gerencie usuários, cadastros e relatórios do sistema.</p>
        </header>

        <section className="cards">
          <div className="card">
            <h3>Usuários Cadastrados</h3>
            <p>153 usuários</p>
          </div>

          <div className="card">
            <h3>Relatórios Gerados</h3>
            <p>27 relatórios</p>
          </div>

          <div className="card">
            <h3>Atividades Recentes</h3>
            <p>Última atualização há 3 horas</p>
          </div>
        </section>

<section className="admin-table">
  <div className="card">
    <h2>Últimos Cadastros</h2>
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Função</th>
          <th>Data de Cadastro</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Ana Lima</td>
          <td>Usuário</td>
          <td>05/11/2025</td>
          <td className="ativo">Ativo</td>
        </tr>
        <tr>
          <td>João Souza</td>
          <td>Gerente</td>
          <td>04/11/2025</td>
          <td className="ativo">Ativo</td>
        </tr>
        <tr>
          <td>Carla Mendes</td>
          <td>Usuário</td>
          <td>03/11/2025</td>
          <td className="inativo">Inativo</td>
        </tr>
      </tbody>
    </table>
  </div>

 
  <div className="card">
    <h2>Relatórios Recentes</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Responsável</th>
          <th>Data</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>#R1023</td>
          <td>Marcos Dias</td>
          <td>05/11/2025</td>
          <td className="ativo">Concluído</td>
        </tr>
        <tr>
          <td>#R1024</td>
          <td>Ana Paula</td>
          <td>04/11/2025</td>
          <td className="inativo">Pendente</td>
        </tr>
      </tbody>
    </table>
  </div>

</section>

      </main>
    </div>
  );
}
