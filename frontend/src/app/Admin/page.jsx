"use client";
import React from "react";
import "./adm.css";
import InfoCard from "@/components/CardAdm/InfoCard";
import TableCard from "@/components/CardAdm/TableCard";

export default function AdminPage() {
  return (
    <div className="admin-container">
      <main className="admin-content">
        <header className="admin-header">
          <h1>Painel do Administrador</h1>
          <p>Gerencie usuários, cadastros e relatórios do sistema.</p>
        </header>

        <section className="cards">
           <InfoCard
    title="Administrador Rebecc"
    value="153 usuários"
    image="/imagens/perfil.png" 
  />
          <InfoCard title="Relatórios Gerados" value="27 relatórios" />
          <InfoCard title="Atividades Recentes" value="Última atualização há 3 horas" />
        </section>

        <section className="admin-table">
          <TableCard
            title="Últimos Cadastros"
            headers={["Nome", "Função", "Data de Cadastro", "Status"]}
            data={[
              ["Ana Lima", "Usuário", "05/11/2025", "Ativo"],
              ["João Souza", "Gerente", "04/11/2025", "Ativo"],
              ["Carla Mendes", "Usuário", "03/11/2025", "Inativo"],
            ]}
          />

          <TableCard
            title="Relatórios Recentes"
            headers={["GMID", "Responsável", "Data", "Status"]}
            data={[
              ["#R1023", "Marcos Dias", "05/11/2025", "Concluído"],
              ["#R1024", "Ana Paula", "04/11/2025", "Pendente"],
            ]}
          />
        </section>
      </main>
    </div>
  );
}
