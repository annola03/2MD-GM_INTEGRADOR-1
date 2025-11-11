"use client";
import React from "react";
import "./adm.css";

export default function TableCard({ title, headers, data }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <table>
        <thead>
          <tr>
            {headers.map((head, index) => (
              <th key={index}>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} className={cell === "Ativo" || cell === "Concluído" ? "ativo" : cell === "Inativo" || cell === "Pendente" ? "inativo" : ""}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
