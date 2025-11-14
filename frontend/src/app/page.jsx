"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";


export default function Home() {
  const imagens = [
    "https://i.postimg.cc/MpBr6tvj/1.png",
    "https://i.postimg.cc/t4wQDDM5/2.png",
    "https://i.postimg.cc/m2gvs0xd/3.png",
  ];

   const [atual, setAtual] = useState(0);
    const [transicao, setTransicao] = useState(false);

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

  return (
    <main>
       <div className="fixed-logo">
    <img 
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/General_Motors_%282021%29.svg/2048px-General_Motors_%282021%29.svg.png" 
      alt="Logo"
      className="logo-img"
    />
    </div>

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
              Ainda não tem cadastro? <a href="#">Criar uma conta</a>
            </p>

            <form>
              <div className="input-group">
                <label>E-mail</label>
                <input type="text" placeholder="Entrar com seu usuario" />
              </div>

              <div className="input-group">
                <label>Senha</label>
                <input type="password" placeholder="Entrar com a sua senha" />
              </div>

              <div className="options">
                <label>
                  <input type="checkbox" /> Lembrar senha
                </label>
              </div>

              <button type="submit" className="btn-login">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>

  );
}
