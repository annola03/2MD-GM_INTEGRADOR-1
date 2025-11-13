-- Migration: Criar tabela usuarios
-- Data: 2025-11-12
-- Descrição: Tabela para armazenar usuários do sistema

USE Funcionarios_api;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(255) NOT NULL,
    GMID VARCHAR(6) UNIQUE NOT NULL,
    Cargo VARCHAR(255) NOT NULL,
    Turno VARCHAR(255) NOT NULL,
    Telefone VARCHAR(255),
    Endereco VARCHAR(255),
    Senha VARCHAR(255) NOT NULL,
    tipo ENUM('admin', 'gestor', 'comum') NOT NULL DEFAULT 'comum',
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

