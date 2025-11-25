"use client";

import React, { useEffect, useState } from "react";
import UserTable from "./UserTable";
import "./users.css";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

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
    <div className="users-container">
      <div className="users-header">
        <h1>Controle de Ponto - Funcionários</h1>
        <div className="actions">
          <button className="add-btn">+ Novo Funcionário</button>
          <button className="export-btn">Exportar (Excel)</button>
        </div>
      </div>

      <UserTable users={users} />
    </div>
  );
}
