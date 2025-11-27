"use client";
import { useState, useEffect } from "react";
import "./gerenciar.css";

export default function GerenciarUsuarios() {
  const [busca, setBusca] = useState("");
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    async function carregarUsuarios() {
      try {
        const res = await fetch("http://localhost:3001/api/usuarios");
        const data = await res.json();

        if (data.sucesso) {
          setUsuarios(data.usuarios);
        }
      } catch (error) {
        console.error("Erro ao carregar usuários:", error);
      }
    }

    carregarUsuarios();
  }, []);

  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [usuarioExcluir, setUsuarioExcluir] = useState(null);

  const handleSaveEdit = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/usuarios/${usuarioEditando.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(usuarioEditando),
        }
      );

      const data = await res.json();

      if (data.sucesso) {
        setUsuarios((prev) =>
          prev.map((u) => (u.id === usuarioEditando.id ? usuarioEditando : u))
        );
        setUsuarioEditando(null);
      } else {
        alert("Erro ao salvar: " + data.erro);
      }
    } catch (error) {
      console.error("Erro ao editar usuário:", error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/usuarios/${usuarioExcluir.id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data.sucesso) {
        setUsuarios(usuarios.filter((u) => u.id !== usuarioExcluir.id));
        setUsuarioExcluir(null);
      } else {
        alert("Erro ao excluir: " + data.erro);
      }
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };  

  const usuariosFiltrados = usuarios.filter((u) =>
    u.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="gerenciar-container">
      <div className="titulo-section">
        <p className="subtitulo">GESTÃO DE USUÁRIOS - GM</p>
        <h1>Gerencie colaboradores </h1>
        <div className="input-wrapper">
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
              <th>GMID</th>
              <th>Senha</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.map((u) => (
              <tr key={u.id}>
                <td>{u.nome}</td>
                <td>{u.cargo}</td>
                <td>{u.turno}</td>
                <td>{u.GMID}</td>
                <td>{"•".repeat(8)}</td>

                <td className="acoes">
                  <button
                    className="btn-editar"
                    onClick={() => setUsuarioEditando({ ...u })}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-excluir"
                    onClick={() => setUsuarioExcluir(u)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
            {usuariosFiltrados.length === 0 && (
              <tr>
                <td colSpan="5" className="nenhum">
                  Nenhum colaborador encontrado.
                </td>
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
                setUsuarioEditando({
                  ...usuarioEditando,
                  cargo: e.target.value,
                })
              }
            />
            <label>Turno</label>
            <select
              value={usuarioEditando.turno}
              onChange={(e) =>
                setUsuarioEditando({
                  ...usuarioEditando,
                  turno: e.target.value,
                })
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
                setUsuarioEditando({
                  ...usuarioEditando,
                  email: e.target.value,
                })
              }
            />
            <label>Senha</label>
            <div className="senha-wrapper">
              <input
                type={mostrarSenha ? "text" : "password"}
                value={usuarioEditando.senha}
                onChange={(e) =>
                  setUsuarioEditando({
                    ...usuarioEditando,
                    senha: e.target.value,
                  })
                }
              />
              <img
                src={
                  mostrarSenha
                    ? "https://img.icons8.com/ios-filled/24/000000/visible.png"
                    : "https://img.icons8.com/ios-filled/24/000000/invisible.png"
                }
                alt="mostrar senha"
                className="icone-olho"
                onClick={() => setMostrarSenha(!mostrarSenha)}
              />
            </div>

            <div className="modal-botoes">
              <button className="btn-salvar" onClick={handleSaveEdit}>
                Salvar
              </button>
              <button
                className="btn-cancelar"
                onClick={() => setUsuarioEditando(null)}
              >
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
            <p>
              Deseja realmente remover <strong>{usuarioExcluir.nome}</strong>?
            </p>
            <div className="modal-botoes">
              <button className="btn-excluir" onClick={handleConfirmDelete}>
                Confirmar
              </button>
              <button
                className="btn-cancelar"
                onClick={() => setUsuarioExcluir(null)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
