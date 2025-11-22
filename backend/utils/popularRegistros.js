import mysql from "mysql2/promise";

// URL da API interna
const API_URL = "http://localhost:3000/api/usuarios";

// ------------------------
// Buscar usuários da API
// ------------------------
async function buscarUsuariosDaAPI(token) {
  try {
    const resposta = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    const json = await resposta.json();

    if (!json.sucesso) {
      console.error("Erro ao buscar usuários:", json);
      return [];
    }

    return json.dados.map(u => ({
      GMID: u.id,
      nome: u.nome
    }));
  } catch (error) {
    console.error("Erro na requisição da API:", error);
    return [];
  }
}

// ------------------------
// Gerar horários aleatórios
// ------------------------
function gerarHorario(base, variacaoMinutos = 0) {
  const [h, m] = base.split(":").map(Number);
  const variacao = Math.floor(Math.random() * variacaoMinutos);
  const atraso = Math.random() > 0.5 ? variacao : -variacao;

  let minutosTotais = h * 60 + m + atraso;
  if (minutosTotais < 0) minutosTotais = 0;

  const horaFinal = String(Math.floor(minutosTotais / 60)).padStart(2, "0");
  const minutosFinais = String(minutosTotais % 60).padStart(2, "0");

  return `${horaFinal}:${minutosFinais}`;
}

// ------------------------
// Status aleatório
// ------------------------
function randomStatus() {
  const prob = Math.random();

  if (prob < 0.10) return "Falta";
  if (prob < 0.25) return "Atraso";
  if (prob < 0.30) return "Extra";
  return "Pontual";
}

const turnos = [
  { nome: "1º Turno", entrada: "06:00", saida: "15:00" },
  { nome: "2º Turno", entrada: "15:00", saida: "00:00" },
  { nome: "3º Turno", entrada: "00:00", saida: "06:00" }
];

// ------------------------
// FUNÇÃO PRINCIPAL
// ------------------------
export async function gerarRegistrosAutomaticos(adminToken = "") {
  try {
    console.log("🔄 Iniciando geração automática de registros...");

    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "Funcionarios_api"
    });

    const funcionarios = await buscarUsuariosDaAPI(adminToken);

    if (funcionarios.length === 0) {
      console.log("⚠ Nenhum funcionário encontrado para gerar registros.");
      return false;
    }

    console.log(`🔎 Funcionários encontrados: ${funcionarios.length}`);

    const diasGerar = 30;

    for (let func of funcionarios) {
      const turno = turnos[Math.floor(Math.random() * turnos.length)];

      for (let i = 0; i < diasGerar; i++) {
        const data = new Date();
        data.setDate(data.getDate() - i);
        const dataFormatada = data.toISOString().split("T")[0];

        const status = randomStatus();

        let entrada = turno.entrada;
        let saida = turno.saida;

        if (status === "Atraso") entrada = gerarHorario(turno.entrada, 30);
        if (status === "Extra") saida = gerarHorario(turno.saida, 90);
        if (status === "Falta") {
          entrada = null;
          saida = null;
        }

        await connection.execute(
          `INSERT INTO Funcionarios
            (GMID, Entrada, Saida, Turno, Status, data_registro)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [
            func.GMID,
            entrada,
            saida,
            turno.nome,
            status,
            dataFormatada
          ]
        );

        console.log(`✔ ${func.GMID} | ${func.nome} | ${dataFormatada} | ${status}`);
      }
    }

    await connection.end();

    console.log("🎉 Registros gerados com sucesso!");
    return true;

  } catch (error) {
    console.error("❌ Erro ao gerar registros:", error);
    return false;
  }
}
