"use client";
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "@/context/UserContext";
import "./adm.css";
import InfoCard from "@/components/CardAdm/InfoCard";
import TableCard from "@/components/CardAdm/TableCard";

export default function AdminPage() {
  const { user, carregando } = useContext(UserContext);
    const [users, setUsers] = useState([]);

  const API_URL = "http://localhost:3001";

  useEffect(() => {
    async function fetchUsers() {
      try {
        const token = localStorage.getItem("token");

        const [respUsuarios, respFuncionarios] = await Promise.all([
          fetch("http://localhost:3001/api/usuarios?limite=60", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:3001/api/funcionarios?limite=1800", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const jsonUsuarios = await respUsuarios.json();
        const jsonFuncionarios = await respFuncionarios.json();

        const usuarios = jsonUsuarios.dados || [];
        const funcionarios = jsonFuncionarios.funcionarios || [];

        // pegar último registro por GMID
        const ultimoRegistro = {};

        funcionarios.forEach((f) => {
          if (!ultimoRegistro[f.GMID] || f.id > ultimoRegistro[f.GMID].id) {
            ultimoRegistro[f.GMID] = f;
          }
        });

        // transformar em array
        const ultimaBatida = Object.values(ultimoRegistro);
        const filtrados = usuarios.filter(u => u.tipo !== "admin");
        // unir usuários + ponto
        const unificados = filtrados.map((u) => {
          const ponto = ultimaBatida.find((p) => p.GMID === u.GMID);

          return {
            Nome: u.Nome,
            gmin: u.GMID, // Seu UserTable usa "gmin"
            cargo: u.Cargo,
            area: u.tipo || "-", // caso venha depois
            turno: u.Turno,
            horaPonto: ponto?.data_registro || "-",
            entrada: ponto?.Entrada || "-",
            saida: ponto?.Saida || "-",
            status: ponto?.Status || "-",
          };

        });


        setUsers(unificados);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    }

    fetchUsers();
  }, []);

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
            value={`${users.length} usuários`}
            image="/imagens/fotoPerfil1.png"
          />

          <InfoCard
            title="Relatórios Gerados"
            value={` relatórios`}
          />

          <InfoCard
            title="Atividades Recentes"
            value={
              
                 `Último relatório em`
                 
            }
          />
        </section>

        <section className="admin-table">
          <TableCard
            title="Últimos Cadastros"
            headers={["Nome", "Função", "Data", "Status"]}
            data={users.map((u) => [
              u.Nome,
              u.cargo,
              new Date(u.horaPonto).toLocaleDateString("pt-BR"),
              u.status,
            ])}
          />
        </section>
      </main>
    </div>
  );
}
