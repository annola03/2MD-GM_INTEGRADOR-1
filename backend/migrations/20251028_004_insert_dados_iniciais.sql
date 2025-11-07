-- Migration: Inserir dados iniciais
-- Data: 2025-01-15
-- Descrição: Dados iniciais para teste do sistema

USE Funcionarios_api;

-- Inserir usuários iniciais (senha: 123456)
-- Hash gerado com bcrypt para a senha "123456" (validado)
INSERT INTO Funcionarios (nome, GMID, GMIN, senha, tipo) VALUES
('Willian Silva', 'ABCDEF', '123456789', '$2a$10$BLAcJu1irAzg06WbtoLoPe0RA.hkfZ0oJ25KYARPkHWRweJuWBALy', 'admin'),
('Anna Grillo', 'JSMTGD', '654687658', '$2a$10$BLAcJu1irAzg06WbtoLoPe0RA.hkfZ0oJ25KYARPkHWRweJuWBALy', 'comum'),
('Rebecca Reis', 'MSGLFR', '535657653', '$2a$10$BLAcJu1irAzg06WbtoLoPe0RA.hkfZ0oJ25KYARPkHWRweJuWBALy', 'comum');


