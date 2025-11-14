"use client";
import "./pagP.css";

export default function HomePage() {
  return (
    <div className="page">

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <h4 className="welcome">BEM-VINDO(A)!</h4>

          <h1 className="hero-title">
            TENHA CONTROLE <br />
            DO SEU TEMPO DE <span>TRABALHO</span>
          </h1>

          <p className="hero-text">
            Monitore seu tempo trabalhado, controle seus horários e acompanhe suas horas extras de forma simples e eficiente.
          </p>

          <div className="hero-buttons">
            <button className="btn primary">Clique aqui!</button>
          </div>
        </div>
    

      </section>

      {/* CARDS */}
      <section className="services">
        
        {/* CARD 1 – mantém igual */}
        <div className="service-card">
          <img 
            src="https://tse2.mm.bing.net/th/id/OIP.tGePiC7UXs4OedwwU2JDgQHaE7?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3" 
            alt="Novo GM Sonic 2026" 
          />
          <h3>GM Sonic 2026</h3>
          <p>
            Complexo industrial da GM em Gravataí iniciará a produção do novo Sonic, 
            um SUV cupê previsto para lançamento em 2026.
          </p>
          <button className="learn-btn">Saiba mais</button>
        </div>

        {/* CARD 2 – AGORA É O QUE ERA O ANTIGO CARD 3 */}
        <div className="service-card active">
          <img 
            src="https://1.bp.blogspot.com/-dRRh5f3Julg/UQaefJEWGKI/AAAAAAAAWn0/3siNTmhZmaM/s1600/03_GM_Onix_2+milhoes_28-01.jpg" 
            alt="GM fábrica Brasil" 
          />
          <h3>Expansão Industrial</h3>
          <p>
            Fábricas da GM recebem novas tecnologias para aumentar eficiência e 
            produtividade no setor automotivo nacional.
          </p>
          <button className="learn-btn">Saiba mais</button>
        </div>

        {/* CARD 3 – AGORA É O ANTIGO CARD 2 */}
        <div className="service-card">
          <img 
            src="https://olhardigital.com.br/wp-content/uploads/2022/12/bolt-ev-carregador-tipo-2-695x500.jpg" 
            alt="GM veículos elétricos" 
          />
          <h3>Avanço em Veículos Elétricos</h3>
          <p>
            GM amplia investimentos em eletrificação no Brasil, fortalecendo sua 
            linha de modelos sustentáveis.
          </p>
          <button className="learn-btn">Saiba mais</button>
        </div>

      </section>

      {/* MODELOS */}
      <div className="services-container">
        <h2 className="titulo">Nossos modelos</h2>

        {/* TRACKER */}
        <div className="servico">
          <img
            src="https://gmauthority.com/blog/wp-content/uploads/2024/12/2025-Chevrolet-Tracker-Premier-Brazil-Press-Photos-Exterior-001-Front-Three-Quarters-720x480.jpg"
            alt="Chevrolet Tracker"
          />
          <div className="texto">
            <h3>Chevrolet Tracker 2025</h3>
            <p>
              SUV moderno, tecnológico e econômico. Perfeito para quem busca conforto,
              conectividade e desempenho no dia a dia.
            </p>
            <button className="btn">Ver detalhes</button>
          </div>
        </div>

        {/* MONTANA */}
        <div className="servico reverso">
          <img
            src="https://garagem360.com.br/wp-content/uploads/2023/02/GM-Montana-1024x725.jpg"
            alt="Chevrolet Montana"
          />
          <div className="texto">
            <h3>Chevrolet Montana 2024</h3>
            <p>
              A picape que une economia, espaço e versatilidade. Ideal para trabalho
              e uso urbano com ótimo custo-benefício.
            </p>
            <button className="btn">Ver detalhes</button>
          </div>
        </div>

        {/* SPIN */}
        <div className="servico">
          <img
            src="https://cdn.autopapo.com.br/box/uploads/2024/03/21140403/chevrolet-spin-premier-2025-azul-boreal-frente-parado-2-1918x1280.jpg"
            alt="Chevrolet Spin"
          />
          <div className="texto">
            <h3>Chevrolet Spin 2025</h3>
            <p>
              Espaçosa, confortável e com capacidade para até 7 lugares.
              A escolha ideal para famílias ou transporte profissional.
            </p>
            <button className="btn">Ver detalhes</button>
          </div>
        </div>

      </div>

    </div>
  );
}
