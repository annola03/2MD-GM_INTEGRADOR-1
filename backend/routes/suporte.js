import express from "express";
import OpenAI from "openai";

const router = express.Router();

const client = new OpenAI({
  apiKey: process.env.OPENAI_KEY
});

// === AQUI COLOCA O PROMPT ===
const systemPrompt = `
Você é a IA de SUPORTE TÉCNICO do sistema interno.  
Seu papel é ajudar o usuário com:

- dúvidas sobre login  
- permissões de usuário  
- falhas do site  
- navegação entre páginas  
- problemas técnicos simples  
- como usar funcionalidades do sistema  
- orientações gerais sobre o sistema

Regras:
- Seja educado e objetivo.
- Nunca invente funções que o sistema não possui.
- Se não souber, peça detalhes.
- Nunca responda sobre assuntos fora do site (ex.: vida pessoal, notícias, etc).
- Fale sempre como um atendente de suporte real.

`;

router.post("/", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: `${systemPrompt}\nUsuário: ${message}`
    });

    res.json({ reply: response.output_text });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao gerar resposta do suporte" });
  }
});

export default router;
