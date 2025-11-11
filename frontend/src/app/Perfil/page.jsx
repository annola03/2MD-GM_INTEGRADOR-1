"use client";
import { useState } from "react";
import "./perfil.css";

export default function ProfilePage() {
  const [selected, setSelected] = useState("edit");

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
            Histórico de Frequência
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
                <img src="/imagens/avatar.png" alt="Avatar" />
              </div>
              <button className="change-photo-btn">Alterar</button>
            </div>

            <form className="profile-form">
              <div className="form-group">
                <label>Nome Completo</label>
                <div className="form-row">
                  <input type="text" defaultValue="Anna Carolina" />
                  <input type="text" defaultValue="Marciano" />
                </div>
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="email" defaultValue="anna@email.com" />
              </div>

              <div className="form-group">
                <label>Telefone</label>
                <input type="text" defaultValue="(11) 99999-9999" />
              </div>

              <div className="form-group">
                <label>Endereço</label>
                <input type="text" defaultValue="Rua das Flores, 123" />
              </div>

              <div className="form-group">
                <label>Localização</label>
                <div className="form-row">
                  <input type="text" defaultValue="São Paulo" />
                  <input type="text" defaultValue="SP" />
                </div>
              </div>

              <div className="form-group">
                <label>Senha</label>
                <input type="password" defaultValue="********" />
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
                  <tr>
                    <td>11/11/2025</td>
                    <td>08:03</td>
                    <td>17:00</td>
                    <td className="ok">Pontual</td>
                  </tr>
                  <tr>
                    <td>10/11/2025</td>
                    <td>08:20</td>
                    <td>17:05</td>
                    <td className="late">Atraso</td>
                  </tr>
                  <tr>
                    <td>09/11/2025</td>
                    <td>07:58</td>
                    <td>17:02</td>
                    <td className="ok">Pontual</td>
                  </tr>
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
                </div>

                <div className="input-block">
                  <label>Nova senha</label>
                  <input type="password" placeholder="Digite a nova senha" />
                </div>

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
