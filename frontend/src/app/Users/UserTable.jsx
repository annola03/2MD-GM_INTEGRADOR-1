import React from "react";

export default function UserTable({ users }) {
  return (
    <div className="table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>GMIN</th>
            <th>Cargo</th>
            <th>Área</th>
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
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.nome}</td>
                <td>{user.gmin}</td>
                <td>{user.cargo}</td>
                <td>{user.area}</td>
                <td>{user.turno}</td>
                <td>{user.horaPonto}</td>
                <td>{user.entrada}</td>
                <td>{user.saida}</td>

                <td>
                  <span
                    className={`status ${
                      user.status === "Ativo" ? "active" : "inactive"
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
