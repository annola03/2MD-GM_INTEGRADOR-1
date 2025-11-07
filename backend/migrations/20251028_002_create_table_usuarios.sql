-- Migration: Criar tabela usuarios
-- Data: 2025-01-15
-- Descrição: Tabela para armazenar usuários do sistema

USE Funcionarios_api;

CREATE TABLE IF NOT EXISTS Funcionarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    GMID VARCHAR(6) UNIQUE NOT NULL,
    GMIN VARCHAR(9) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo ENUM('admin', 'comum') NOT NULL DEFAULT 'comum',
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

