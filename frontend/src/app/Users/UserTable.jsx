"use client";

import React, { useState } from "react";

export default function UserTable({ users }) {
  const [filtro, setFiltro] = useState("");

  const dadosFiltrados = users.filter((item) => {
    const texto = filtro.toLowerCase();
    return (
      item.Nome.toLowerCase().includes(texto) ||
      item.gmin.toLowerCase().includes(texto) ||
      item.cargo.toLowerCase().includes(texto) ||
      item.area.toLowerCase().includes(texto) ||
      item.turno.toLowerCase().includes(texto) ||
      item.status.toLowerCase().includes(texto)
    );
  });
  return (
    <div className="table-container">
      <input
        type="text"
        placeholder="Filtrar por Nome, GMID, Cargo, Status..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        style={{
          padding: "8px 12px",
          width: "300px",
          marginBottom: "15px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      <table className="user-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>GMIN</th>
            <th>Cargo</th>
            <th>Tipo</th>
            <th>Turno</th>
            <th>Hora do Ponto</th>
            <th>Entrada</th>
            <th>Saída</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {users.length > 0 ? (
            dadosFiltrados.map((user) => (
              <tr key={user.id}>
                <td>{user.Nome}</td>
                <td>{user.gmin}</td>
                <td>{user.cargo}</td>
                <td>{user.area}</td>
                <td>{user.turno}</td>
                <td>
                  {user.horaPonto
                    ? new Date(user.horaPonto).toLocaleDateString("pt-BR")
                    : "-"}
                </td>
                <td>{user.entrada}</td>
                <td>{user.saida}</td>

                <td>
                  <span
                    className={`status ${
                      user.status === "Pontual" ? "active" : "inactive"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="acoes">
                  <button className="edit-btn">✏️</button>
                  <button className="delete-btn">🗑️</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="sem-dados">
                ⚠ Nenhum funcionário encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
