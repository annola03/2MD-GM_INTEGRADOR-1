"use client";

import React, { useEffect, useState } from "react";
import UserTable from "./UserTable";
import "./users.css";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        
        const res = await fetch("http://localhost:3001/api/users");
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
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
