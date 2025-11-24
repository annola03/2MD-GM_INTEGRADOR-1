import dotenv from "dotenv";
dotenv.config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); 


const DATA_FILE = path.join(__dirname, "dados", "funcionarios.json");


app.get("/api/users", (req, res) => {
  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao ler os dados." });
    }
    const funcionarios = JSON.parse(data);
    res.json(funcionarios);
  });
});


app.post("/api/users", (req, res) => {
  const novoFuncionario = req.body;

  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Erro ao ler os dados." });

    const funcionarios = JSON.parse(data);
    novoFuncionario.id = funcionarios.length + 1;
    funcionarios.push(novoFuncionario);

    fs.writeFile(DATA_FILE, JSON.stringify(funcionarios, null, 2), (err) => {
      if (err)
        return res.status(500).json({ error: "Erro ao salvar novo funcionário." });
      res.status(201).json(novoFuncionario);
    });
  });
});


app.put("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const atualizacao = req.body;

  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Erro ao ler os dados." });

    let funcionarios = JSON.parse(data);
    const index = funcionarios.findIndex((f) => f.id === id);

    if (index === -1) return res.status(404).json({ error: "Funcionário não encontrado." });

    funcionarios[index] = { ...funcionarios[index], ...atualizacao };

    fs.writeFile(DATA_FILE, JSON.stringify(funcionarios, null, 2), (err) => {
      if (err)
        return res.status(500).json({ error: "Erro ao salvar atualização." });
      res.json(funcionarios[index]);
    });
  });
});


app.delete("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);

  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Erro ao ler os dados." });

    let funcionarios = JSON.parse(data);
    funcionarios = funcionarios.filter((f) => f.id !== id);

    fs.writeFile(DATA_FILE, JSON.stringify(funcionarios, null, 2), (err) => {
      if (err)
        return res.status(500).json({ error: "Erro ao deletar funcionário." });
      res.status(204).end();
    });
  });
});

const PORT = 3001;
app.listen(PORT, () => console.log(`🚀 API rodando em http://localhost:${PORT}`));
