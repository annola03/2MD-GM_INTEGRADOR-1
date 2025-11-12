"use client";
import { useState } from "react";
import "./gerenciar.css";

export default function GerenciarUsuarios() {
  const [busca, setBusca] = useState("");
  const [usuarios, setUsuarios] = useState([
    { id: 1, nome: "Anna Costa", cargo: "Supervisora", turno: "Matutino", email: "anna@gm.com" },
    { id: 2, nome: "Willian Rocha", cargo: "Técnico", turno: "Diurno", email: "willian@gm.com" },
    { id: 3, nome: "Rebecca Lima", cargo: "RH", turno: "Noturno", email: "rebecca@gm.com" },
  ]);

  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [usuarioExcluir, setUsuarioExcluir] = useState(null);

  const handleSaveEdit = () => {
    setUsuarios((prev) =>
      prev.map((u) => (u.id === usuarioEditando.id ? usuarioEditando : u))
    );
    setUsuarioEditando(null);
  };

  const handleConfirmDelete = () => {
    setUsuarios(usuarios.filter((u) => u.id !== usuarioExcluir.id));
    setUsuarioExcluir(null);
  };

  const usuariosFiltrados = usuarios.filter((u) =>
    u.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="gerenciar-container">
      <div className="titulo-section">
        <p className="subtitulo">GESTÃO DE USUÁRIOS - GM</p>
        <h1>Gerencie colaboradores de forma moderna e intuitiva</h1>
        <div className="input-wrapper">
    <img
      src="https://img.icons8.com/ios-glyphs/30/FFFFFF/search--v1.png" 
      width={"20px"}
      height={"20px"}
      alt="buscar"
      className="icone-busca"
    />
    <input
      type="text"
      placeholder="Buscar colaborador..."
      value={busca}
      onChange={(e) => setBusca(e.target.value)}
      className="input-busca"
    />
  </div>
  </div>

      <div className="tabela-container">
        <table className="tabela-usuarios">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Cargo</th>
              <th>Turno</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.map((u) => (
              <tr key={u.id}>
                <td>{u.nome}</td>
                <td>{u.cargo}</td>
                <td>{u.turno}</td>
                <td>{u.email}</td>
                <td className="acoes">
                  <button className="btn-editar" onClick={() => setUsuarioEditando({ ...u })}>
                    Editar
                  </button>
                  <button className="btn-excluir" onClick={() => setUsuarioExcluir(u)}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
            {usuariosFiltrados.length === 0 && (
              <tr>
                <td colSpan="5" className="nenhum">Nenhum colaborador encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de Edição */}
      {usuarioEditando && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Editar Colaborador</h2>
            <label>Nome</label>
            <input
              type="text"
              value={usuarioEditando.nome}
              onChange={(e) =>
                setUsuarioEditando({ ...usuarioEditando, nome: e.target.value })
              }
            />
            <label>Cargo</label>
            <input
              type="text"
              value={usuarioEditando.cargo}
              onChange={(e) =>
                setUsuarioEditando({ ...usuarioEditando, cargo: e.target.value })
              }
            />
            <label>Turno</label>
            <select
              value={usuarioEditando.turno}
              onChange={(e) =>
                setUsuarioEditando({ ...usuarioEditando, turno: e.target.value })
              }
            >
              <option value="Matutino">Matutino</option>
              <option value="Diurno">Diurno</option>
              <option value="Noturno">Noturno</option>
            </select>
            <label>Email</label>
            <input
              type="email"
              value={usuarioEditando.email}
              onChange={(e) =>
                setUsuarioEditando({ ...usuarioEditando, email: e.target.value })
              }
            />

            <div className="modal-botoes">
              <button className="btn-salvar" onClick={handleSaveEdit}>Salvar</button>
              <button className="btn-cancelar" onClick={() => setUsuarioEditando(null)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Exclusão */}
      {usuarioExcluir && (
        <div className="modal-overlay">
          <div className="modal-content modal-excluir">
            <h2>Confirmar Exclusão</h2>
            <p>Deseja realmente remover <strong>{usuarioExcluir.nome}</strong>?</p>
            <div className="modal-botoes">
              <button className="btn-excluir" onClick={handleConfirmDelete}>
                Confirmar
              </button>
              <button className="btn-cancelar" onClick={() => setUsuarioExcluir(null)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
