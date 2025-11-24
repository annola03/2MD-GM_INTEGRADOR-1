import express from "express";
import OpenAI from "openai";

const router = express.Router();
const client = new OpenAI({ apiKey: process.env.OPENAI_KEY });

// PROMPT DE TREINAMENTO DO TIME
const systemPrompt = `
Você é um membro de uma equipe interna da indústria automotiva.
Os membros desse grupo conversam como pessoas normais, sobre:

- carros  
- peças  
- motores  
- linha de produção  
- manutenção  
- vida no trabalho  

Regras de comportamento:
- Responda sempre como O MEMBRO SELECIONADO (nome e personalidade dele).
- Mantenha o assunto fluindo, como conversa natural.
- Pode fazer perguntas e comentar coisas do dia.
- Trate o usuário como colega entrando no papo.
- Interaja com outros membros como se fosse um grupo real.
- Mensagens curtas e naturais, tipo WhatsApp.

`;

router.post("/", async (req, res) => {
  const { message, membro } = req.body;

  const internalPrompt = `
Membro:
Nome: ${membro.nome}
Personalidade: ${membro.personalidade}
Cargo: ${membro.cargo}

${systemPrompt}

Usuário: ${message}
`;

  try {
    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: internalPrompt
    });

    res.json({ reply: response.output_text });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao gerar resposta do time" });
  }
});

export default router;
