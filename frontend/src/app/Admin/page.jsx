"use client";
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "@/context/UserContext";
import "./adm.css";
import InfoCard from "@/components/CardAdm/InfoCard";
import TableCard from "@/components/CardAdm/TableCard";

export default function AdminPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [relatorios, setRelatorios] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, carregando } = useContext(UserContext);
  const [funcionarios, setFuncionarios] = useState([]);

  const API_URL = "http://localhost:3001";

  useEffect(() => {
    async function carregarDados() {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Nenhum token encontrado!");
        return;
      }

      try {
        const [respUsuarios, respFuncionarios] = await Promise.all([
          fetch(`${API_URL}/api/usuarios`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_URL}/api/funcionarios`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const jsonUsuarios = await respUsuarios.json();
        const jsonFuncionarios = await respFuncionarios.json();

        setUsuarios(jsonUsuarios.dados || []);
        setFuncionarios(jsonFuncionarios.funcionarios || []);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, []);

  const funcionariosPorGMID = {};

  funcionarios.forEach((f) => {
    if (!funcionariosPorGMID[f.GMID]) {
      funcionariosPorGMID[f.GMID] = f; // primeiro registro
    } else {
      // substituir se o id for maior = registro mais recente
      if (f.id > funcionariosPorGMID[f.GMID].id) {
        funcionariosPorGMID[f.GMID] = f;
      }
    }
  });

  // Só AQUI você pode usar return condicional
  if (carregando || loading) return <p>Carregando dados...</p>;

  if (!Array.isArray(usuarios)) {
    return <div>Carregando usuários...</div>;
  }

  const usuariosCompletos = usuarios.map((u) => {
    const func = funcionariosPorGMID[u.GMID];

    return {
      nome: u.Nome,
      funcao: u.Cargo,
      data: func?.data_registro || "—",
      status: func?.Status || "—",
    };
  });

  return (
    <div className="admin-container">
      <main className="admin-content">
        <header className="admin-header">
          <h1>Painel do Administrador</h1>
          <p>Gerencie usuários, cadastros e relatórios do sistema.</p>
        </header>

        <section className="cards">
          <InfoCard
            title={`Administrador ${user?.Nome}`}
            value={`${usuarios.length} usuários`}
            image="/imagens/fotoPerfil1.png"
          />

          <InfoCard
            title="Relatórios Gerados"
            value={`${relatorios.length} relatórios`}
          />

          <InfoCard
            title="Atividades Recentes"
            value={
              relatorios[0]
                ? `Último relatório em ${relatorios[0].data}`
                : "Sem dados"
            }
          />
        </section>

        <section className="admin-table">
          <TableCard
            title="Últimos Cadastros"
            headers={["Nome", "Função", "Data", "Status"]}
            data={usuariosCompletos.map((u) => [
              u.nome,
              u.funcao,
              u.data,
              u.status,
            ])}
          />

          <TableCard
            title="Relatórios Recentes"
            headers={["ID", "Responsável", "Data", "Status"]}
            data={relatorios.map((r) => [
              r.id,
              r.responsavel,
              r.data,
              r.status,
            ])}
          />
        </section>
      </main>
    </div>
  );
}
