"use client";
import { useState, useEffect } from "react";
import "./gerenciar.css";

export default function GerenciarUsuarios() {
  const [busca, setBusca] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [usuarioExcluir, setUsuarioExcluir] = useState(null);

  // =============================
  // 🔹 1. BUSCAR USUÁRIOS DA API
  // =============================

  const carregarUsuarios = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3001/api/usuarios", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      // ⬇⬇⬇ ESTE É O FIX
      setUsuarios(
        (data.dados || []).map((u) => ({
          id: u.id,
          nome: u.Nome,
          cargo: u.Cargo,
          turno: u.Turno,
          gmid: u.GMID,
          senha: u.Senha,
        }))
      );
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
    }
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  // ===================================
  // 🔹 2. SALVAR EDIÇÃO (inclui senha)
  // ===================================
  const handleSaveEdit = async () => {
    try {
       const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:3001/api/usuarios/${usuarioEditando.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ENVIAR TOKEN

          },
          body: JSON.stringify({
            Nome: usuarioEditando.nome,
            Cargo: usuarioEditando.cargo,
            Turno: usuarioEditando.turno,
            GMID: usuarioEditando.gmid,
            Senha: usuarioEditando.senha,
          }),
        }
      );

      if (!res.ok) throw new Error("Erro ao atualizar usuário");

      // Atualiza na interface sem recarregar
      setUsuarios((prev) =>
        prev.map((u) => (u.id === usuarioEditando.id ? usuarioEditando : u))
      );

      setUsuarioEditando(null);
    } catch (error) {
      console.error("Erro ao salvar edição:", error);
    }
  };

  console.log(usuarios);

  // ============================
  // 🔹 3. EXCLUIR USUÁRIO
  // ============================
  const handleConfirmDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/usuarios/${usuarioExcluir.id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Erro ao excluir usuário");

      setUsuarios(usuarios.filter((u) => u.id !== usuarioExcluir.id));
      setUsuarioExcluir(null);
    } catch (error) {
      console.error("Erro ao excluir:", error);
    }
  };

  // ============================
  // 🔹 4. FILTRO
  // ============================
  const usuariosFiltrados = usuarios.filter((u) =>
    u.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="gerenciar-container">
      <div className="titulo-section">
        <p className="subtitulo">GESTÃO DE USUÁRIOS - GM</p>
        <h1>Gerencie colaboradores</h1>

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

      {/* ==================== */}
      {/* 🔹 TABELA DE USUÁRIOS */}
      {/* ==================== */}
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
                <td>{u.gmid}</td>
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

      {/* ==================== */}
      {/* 🔹 MODAL DE EDIÇÃO */}
      {/* ==================== */}
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

            <label>GMID</label>
            <input
              type="text"
              value={usuarioEditando.gmid}
              onChange={(e) =>
                setUsuarioEditando({ ...usuarioEditando, gmid: e.target.value })
              }
            />

            <label>Senha</label>
            <div className="senha-wrapper">
              <input
                type={mostrarSenha ? "text" : "password"}
                value={usuarioEditando.senha || ""}
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

      {/* ==================== */}
      {/* 🔹 MODAL DE EXCLUSÃO */}
      {/* ==================== */}
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
