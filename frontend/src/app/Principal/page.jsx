"use client";
import "./pagP.css";

export default function HomePage() {
  return (
    <div className="page">

      
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
        
        
        <div className="service-card">
          <img 
            src="https://p2.trrsf.com/image/fget/cf/774/0/images.terra.com/2025/11/12/carbon_silhueta-1iusr047054j5.jpg" 
            alt="Novo GM Sonic 2026" 
          />
          <h3>GM Sonic 2026</h3>
          <p>
            Complexo industrial da GM em Gravataí iniciará a produção do novo Sonic, 
            um SUV cupê previsto para lançamento em 2026.
          </p>
          <button className="learn-btn">Saiba mais</button>
        </div>

        
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

        
        <div className="service-card">
          <img 
            src="https://tse4.mm.bing.net/th/id/OIP.gOqYeNhfmUI1ukpfSGsWKwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" 
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

     
      <div className="services-container">
        <h2 className="titulo">Nossos modelos</h2>

        
        <div className="servico">
          <img
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiRCBfu6ao__qA6nCe0l9r1pJLY3fCzSGWbUoWHhErtTxsefngJzX8NWPSRpytHGykHNNgLbBb_URxjdt1XdzPqOA7bacJrScPoCso7DdXmpkIP-6M-OXz7Rjqhc8wy9temCcoYnIi4lVpfEL1H8TsspBbVGcX0RnU-Ozf9msIYOoI6eazyn90LlmclTqtO/s1120/Novo-Tracker-2025%20%282%29.jpg"
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

        
        <div className="servico reverso">
          <img
            src="https://petrosolgas.com.br/wp-content/uploads/2024/05/chevrolet-montana-lt-2025-ficha-tecnica.jpg"
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

        
        <div className="servico">
          <img
            src="https://quatrorodas.abril.com.br/wp-content/uploads/2024/03/2025-chevrolet-spin-008_FGD_6968.jpg?quality=70&strip=info&crop=1&resize=1080,565"
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
