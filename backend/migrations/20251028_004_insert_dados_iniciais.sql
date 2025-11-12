-- Migration: Inserir dados iniciais
-- Data: 2025-01-15
-- Descrição: Dados iniciais para teste do sistema

USE Funcionarios_api;

-- Inserir usuários iniciais (senha: 123456)
INSERT INTO usuarios (nome, GMID, Cargo, Turno, Email, senha, tipo) VALUES
('Administrador', 'admin','AdminSystem','Matutino','admin@gerenciador.com', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'admin'),
('Willian Silva', 'RV3NGT','Gerente','Diurno','RV3NGT@laam.corp.gm.br', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'comum'),
('Anna Grillo', 'KJT5DS','Group Leader','Noturno','KJT5DS@laam.corp.gm.br', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'comum');
('Rebecca Reis', 'FSDGF5','Supervisora','Diurno','FSDGF5@laam.corp.gm.br', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'comum');



