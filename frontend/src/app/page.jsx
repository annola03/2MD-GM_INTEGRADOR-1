"use client";
import React, { useState, useEffect } from "react";

export default function Login() {
  const imagens = [
    "https://i.postimg.cc/MpBr6tvj/1.png",
    "https://i.postimg.cc/t4wQDDM5/2.png",
    "https://i.postimg.cc/m2gvs0xd/3.png",
  ];

  const [atual, setAtual] = useState(0);
  const [transicao, setTransicao] = useState(false);

  const [email_padrao, setEmail_padrao] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const intervalo = setInterval(() => {
      setTransicao(true);
      setTimeout(() => {
        setAtual((prev) => (prev + 1) % imagens.length);
        setTransicao(false);
      }, 500);
    }, 4000);
    return () => clearInterval(intervalo);
  }, [imagens.length]);

  // =======================
  //       LOGIN API
  // =======================
  const fazerLogin = async (e) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      const resposta = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email_padrao, senha }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        setErro(dados.mensagem || "Credenciais inválidas");
        setLoading(false);
        return;
      }

      // Salvar token
      localStorage.setItem("token", dados.dados.token);
      localStorage.setItem("email_padrao", dados.dados.email_padrao);

      // Redirecionar pós login
      window.location.href = "/Principal";

    } catch (err) {
      setErro("Erro ao conectar ao servidor.");
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      
      <div className="login-left">
        <div className={`carousel ${transicao ? "slide-out" : "slide-in"}`}>
          <img
            src={imagens[atual]}
            alt={`Slide ${atual + 1}`}
            className="carousel-img"
          />
        </div>

        <div className="welcome-section">
          <h1>Bem Vindo!</h1>
          <p>Sua plataforma completa para o controle de turnos, registro de ponto e gestão de colaboradores.</p>
        </div>

        <div className="dots">
          {imagens.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === atual ? "active" : ""}`}
              onClick={() => setAtual(index)}
            ></span>
          ))}
        </div>
      </div>

      <div className="login-right">
        <div className="login-box">
          <h2>Log In</h2>
          <p>
            Ainda não tem cadastro? <a href="#">Criar Login</a>
          </p>

          {erro && <p className="erro-login">{erro}</p>}

          <form onSubmit={fazerLogin}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Digite seu email"
                value={email_padrao}
                onChange={(e) => setEmail_padrao(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Senha</label>
              <input
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            <div className="options">
              <label>
                <input type="checkbox" /> Lembrar senha
              </label>
              <a href="#">Esqueceu sua senha?</a>
            </div>

            <button type="submit" className="btn-login" disabled={loading}>
              {loading ? "Entrando..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
