import express from "express";
import OpenAI from "openai";

const router = express.Router();
const client = new OpenAI({ apiKey: process.env.OPENAI_KEY });

// HISTÓRICO DA CONVERSA (memória temporária do grupo)
let historico = [];

// PROMPT DE TREINAMENTO DO TIME
const systemPrompt = `
Você é um membro de uma equipe interna da indústria automotiva.
Vocês conversam como pessoas reais, sobre:

- carros  
- peças  
- motores  
- linha de produção  
- manutenção  
- vida no trabalho  

Regras:
- Sempre gerar uma conversa de grupo (estilo WhatsApp).
- O membro selecionado DEVE responder.
- Pelo menos DOIS outros membrosTime  devem aparecer com falas curtas.
- Conversa natural, frases curtas.
- Pode brincar, reclamar, comentar coisas do dia.
- Pode responder ao usuário e ao histórico.
- Use formato:

[Nome]: mensagem
[Outro]: mensagem
[Usuário]: mensagem

- Continue o papo como se fosse vivo, sem finalizar.
`;

router.post("/", async (req, res) => {
  const { message, membro, membrosTime } = req.body;

  // Adiciona a fala do usuário ao histórico
  historico.push({ autor: "Usuário", texto: message });

  // Constrói histórico em formato conversacional
  const historicoFormatado = historico
    .map((m) => `[${m.autor}]: ${m.texto}`)
    .join("\n");

  // Seleciona 2 membrosTime  aleatórios para participar
  const outros = membrosTime
    .filter((m) => m.nome !== membro.nome)
    .sort(() => Math.random() - 0.5)
    .slice(0, 2);

  const internalPrompt = `
${systemPrompt}

=== HISTÓRICO ATUAL ===
${historicoFormatado}

=== MEMBRO PRINCIPAL ===
Nome: ${membro.nome}
Cargo: ${membro.cargo}
Personalidade: ${membro.personalidade}

=== OUTROS membrosTime  PRESENTES ===
${outros.map((m) => `- ${m.nome}: ${m.personalidade} (${m.cargo})`).join("\n")}

Agora gere uma continuação NATURAL da conversa, com:
- fala do membro principal
- falas dos 2 membrosTime  selecionados
- respondendo o usuário

Formato obrigatório:
[Nome]: mensagem
[Nome]: mensagem
[Usuário]: mensagem (se necessário)
`;

  try {
    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: internalPrompt,
    });

    const raw = response.output_text;

    const falas = raw
      .split(/\n|\[/)
      .filter((l) => l.trim() !== "")
      .map((l) => "[" + l.trim())
      .filter((l) => l.includes("]:"));

    res.json({ messages: falas });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao gerar resposta do time" });
  }
});

export default router;
