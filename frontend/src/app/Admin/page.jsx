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

  const API_URL = "http://localhost:3001";

  useEffect(() => {
    async function carregarDados() {
      const token = localStorage.getItem("token");  // 👈 aqui!

      if (!token) {
        console.error("Nenhum token encontrado!");
        return;
      }

      try {
        const [respUsuarios] = await Promise.all([
          fetch(`${API_URL}/api/usuarios`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        ]);
        

        setUsuarios(await respUsuarios.json());
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    }
console.log(usuarios)
    carregarDados();
  }, []);

  // Só AQUI você pode usar return condicional
  if (carregando || loading) return <p>Carregando dados...</p>;

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
            data={usuarios.map((u) => [
              u.nome,
              u.funcao,
              u.dataCadastro,
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
