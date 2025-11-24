import express from "express";
import OpenAI from "openai";

const router = express.Router();
const client = new OpenAI({ apiKey: process.env.OPENAI_KEY });

// PROMPT DO SHOP
const systemPrompt = `
Você é a IA responsável por enviar comunicados automáticos do setor SHOP,
um departamento interno de uma indústria automotiva.

Envie mensagens curtas, profissionais, sobre:
- linha de produção
- eficiência
- inspeção
- peças
- qualidade
- manutenção
- OEE

Não inicie conversa. Apenas envie comunicados.
`;

router.get("/", async (req, res) => {
  try {
    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: systemPrompt
    });

    res.json({ reply: response.output_text });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao gerar mensagem automática do SHOP" });
  }
});

export default router;
