"use client";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserContext";
import "./perfil.css";

export default function ProfilePage() {
  const { user } = useContext(UserContext);
  const [selected, setSelected] = useState("edit");
  const [loading, setLoading] = useState(true);


  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    if (!user?.GMID) return;

    const token = localStorage.getItem("token");

    fetch(`http://localhost:3001/api/funcionarios/${user.GMID}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((r) => r.json())
      .then((res) => {
        if (res.sucesso) setHistorico(res.funcionarios);
      });
      
  }, [user]);





  const [profile, setProfile] = useState({
    nomeCompleto: "",
    email: "",
    telefone: "",
    endereco: "",
    imagem: "/imagens/avatar.png"
  });


  useEffect(() => {
    if (!user) return;

    const token = localStorage.getItem("token");

    fetch(`http://localhost:3001/api/usuarios/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((dados) => {
        if (dados.sucesso) {
          const f = dados.dados;

          setProfile({
            nome: f.nome || "",
            email: f.email || "",
            email: f.email || "",
            telefone: f.telefone || "",
            endereco: f.endereco || "",
            imagem: f.imagem
              ? `http://localhost:3001/uploads/imagens/${f.imagem}`
              : "/imagens/avatar.png",
          });
        }
      })
      .finally(() => setLoading(false));
  }, [user]);



  const salvarAlteracoes = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const body = {
      nome: profile.nome + " " + profile.sobrenome,
      email: profile.email,
      telefone: profile.telefone,
      endereco: profile.endereco,
    };

    fetch(`http://localhost:3001/funcionarios/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then(() => alert("Perfil atualizado!"));
  };

  const trocarFoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("imagem", file);
    formData.append("funcionario_GMID", user.GMID);

    const res = await fetch("http://localhost:3001/funcionarios/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const dados = await res.json();

    if (dados.sucesso) {
      setProfile({
        ...profile,
        imagem: `http://localhost:3001/uploads/imagens/${dados.dados.arquivo}`,
      });
    }
  };

  return (
    <div className="profile-page">
      {/* ==== MENU LATERAL ==== */}
      <aside className="profile-sidebar">
        <h2>Meu Perfil</h2>
        <ul>
          <li
            className={selected === "edit" ? "active" : ""}
            onClick={() => setSelected("edit")}
          >
            Editar Perfil
          </li>
          <li
            className={selected === "history" ? "active" : ""}
            onClick={() => setSelected("history")}
          >
            Histórico
          </li>
          <li
            className={selected === "notifications" ? "active" : ""}
            onClick={() => setSelected("notifications")}
          >
            Notificações
          </li>
          <li
            className={selected === "security" ? "active" : ""}
            onClick={() => setSelected("security")}
          >
            Segurança
          </li>
        </ul>
      </aside>

      {/* ==== CONTEÚDO PRINCIPAL ==== */}
      <main className="profile-content">
        {/* === EDITAR PERFIL === */}
        {selected === "edit" && (
          <section className="edit-profile">
            <h2>Editar Perfil</h2>

            <div className="profile-photo">
              <div className="photo-container">
                <img src={profile.imagem} alt="Avatar" />
              </div>

              <label className="change-photo-btn">
                Alterar
                <input
                  type="file"
                  accept="image/*"
                  onChange={trocarFoto}
                  hidden
                />
              </label>
            </div>

            <form className="profile-form" onSubmit={salvarAlteracoes}>
              <div className="form-group">
                <label>Nome Completo</label>
                <div className="form-row">
                  <input
                    type="text"
                    value={profile.nome}
                    onChange={(e) =>
                      setProfile({ ...profile, nome: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Telefone</label>
                <input
                  type="text"
                  value={profile.telefone}
                  onChange={(e) =>
                    setProfile({ ...profile, telefone: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Endereço</label>
                <input
                  type="text"
                  value={profile.endereco}
                  onChange={(e) =>
                    setProfile({ ...profile, endereco: e.target.value })
                  }
                />
              </div>

              <button type="submit" className="save-btn">
                Salvar Alterações
              </button>
            </form>
          </section>
        )}

        {/* === HISTÓRICO === */}
        {selected === "history" && (
          <section className="history">
            <h2>Histórico de Frequência</h2>
            <div className="card">
              <table>

                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Entrada</th>
                    <th>Saída</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {historico.length === 0 && (
                    <tr>
                      <td colSpan="4">Nenhum registro encontrado</td>
                    </tr>
                  )}

                  {historico.map((item, index) => (
                    <tr key={index}>
                      <td>{new Date(item.data_registro).toLocaleDateString("pt-BR")}</td>
                      <td>{item.Entrada}</td>
                      <td>{item.Saida}</td>
                      <td className={item.Status === "Atraso" ? "late" : "ok"}>
                        {item.Status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
        {/* === NOTIFICAÇÕES === */}
        {selected === "notifications" && (
          <section className="notifications">
            <h2>Notificações</h2>
            <div className="card">
              <ul className="notif-list">
                <li>Você bateu ponto com atraso em 10/11.</li>
                <li>Registro de ponto confirmado em 11/11.</li>
                <li>Atualização do turno de quinta-feira.</li>
              </ul>
            </div>
          </section>
        )}
        {/* === SEGURANÇA === */}
        {selected === "security" && (
          <section className="security">
            <h2>Segurança</h2>
            <div className="card">
              <p>Altere sua senha para manter sua conta segura:</p>
              <form className="security-form">
                <div className="input-block">
                  <label>Senha atual</label>
                  <input type="password" placeholder="Digite sua senha atual" />
                </div>{" "}
                <div className="input-block">
                  <label>Nova senha</label>
                  <input type="password" placeholder="Digite a nova senha" />
                </div>{" "}
                <div className="input-block">
                  <label>Confirmar nova senha</label>
                  <input type="password" placeholder="Confirme a nova senha" />
                </div>
                <button className="save-btn">Atualizar Senha</button>
              </form>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
