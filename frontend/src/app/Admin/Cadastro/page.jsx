"use client";
import { useState } from "react";
import "./cadastro.css";

export default function CadastroFuncionario() {
  const [form, setForm] = useState({
    nome: "",
    cargo: "",
    turno: "",
    GMID: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const resposta = await fetch("http://localhost:3001/api/auth/registrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      alert("Erro: " + dados.mensagem);
      return;
    }

    alert(
      `Funcionário cadastrado com sucesso!\n\nSenha gerada: ${dados.senha}`
    );

    setForm({ nome: "", cargo: "", turno: "", GMID: "" });

  } catch (erro) {
    console.error("Erro ao cadastrar:", erro);
    alert("Erro ao conectar com o servidor");
  }
};


  return (
    <div className="cadastro-container">
        <div className="texto-container">
        <p className="subtitulo">CADASTRO DE FUNCIONÁRIOS - GM</p>
        <h1>Cadastre, edite e gerencie colaboradores com facilidade</h1>

       <ul className="itens-rh">
  <li>
<img width="30" height="30" src="https://img.icons8.com/nolan/64/add-user-male.png" alt="add-user-male"/>Cadastro de Funcionários
  </li>
  <li>
<img width="30" height="30" src="https://img.icons8.com/external-tal-revivo-green-tal-revivo/36/external-repetitive-shift-of-an-businessman-for-work-schedule-full-green-tal-revivo.png" alt="external-repetitive-shift-of-an-businessman-for-work-schedule-full-green-tal-revivo"/>    Gestão de Cargos e Turnos
  </li>
  <li>
<img width="30" height="30" src="https://img.icons8.com/pulsar-gradient/48/future.png" alt="future"/>  Controle de Horários e Escalas
  </li>
  <li>
<img width="30" height="30" src="https://img.icons8.com/lollipop/48/graph-report.png" alt="graph-report"/>  
  Relatórios e Indicadores de Equipe
  </li>
</ul>
      </div>

      <form onSubmit={handleSubmit} className="cadastro-form">
        <div className="form-group">
          <label>Nome completo</label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Cargo</label>
          <input
            type="text"
            name="cargo"
            value={form.cargo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Turno</label>
          <select name="turno" value={form.turno} onChange={handleChange} required>
            <option value="">Selecione o turno</option>
            <option value="Manhã">Matutino</option>
            <option value="Tarde">Diurno</option>
            <option value="Noite">Noturno</option>
          </select>
        </div>

        <div className="form-group">
          <label>GMID</label>
          <input
            type="text"
            name="GMID"
            value={form.GMID}
            onChange={handleChange}
            required
          />
        </div>

      

        <button type="submit" className="btn-cadastrar">
          Cadastrar Funcionário
        </button>
      </form>
    </div>
  );
}
