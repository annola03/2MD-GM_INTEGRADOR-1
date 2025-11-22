-- Migration: Criar tabela usuarios
-- Data: 2025-11-14
-- Descrição: Tabela para armazenar pontos batidos dos funcionarios

USE Funcionarios_api;

CREATE TABLE IF NOT EXISTS Funcionarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    GMID VARCHAR(6) NOT NULL,               
    Entrada TIME NOT NULL,                  
    Saida TIME NOT NULL,                    
    Turno VARCHAR(50) NOT NULL,             
    Status ENUM('Pontual', 'Atraso') NOT NULL,  
    data_registro DATE NOT NULL,            
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP 
        ON UPDATE CURRENT_TIMESTAMP
);

