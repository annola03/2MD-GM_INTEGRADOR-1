-- Migration: Inserir dados iniciais
-- Data: 2025-01-15
-- Descrição: Dados iniciais para teste do sistema

USE Funcionarios_api;

-- Inserir usuários iniciais (senha: 123456)
INSERT INTO usuarios (nome, GMID, Cargo, Turno, senha, tipo) VALUES
('Administrador', 'admin','AdminSystem','Matutino', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'admin'),
('Willian Silva', 'RV3NGT','Gerente','Diurno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'gestor');
('Anna Grillo', 'KJT5DS','Group Leader','Noturno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'comum');
('Rebecca Reis', 'FSDGF5','Supervisora','Diurno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'comum');
('Marcos Alves', 'B7K9XZ','Gerente','Diurno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'gestor');
('Carla Souza', 'M4P2QW','Coordenadora','Noturno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'comum');
('Fabio Costa', 'Z8L1RT','Analista','Diurno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'comum');
('Luciana Melo', 'N3V6HY','Supervisora','Noturno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'comum');
('Rafael Pinto', 'Q2W7AS','Tecnico','Diurno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'comum');
('Aline Rocha', 'H5D4FG','Assistente','Diurno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'comum');
('Pedro Lima', 'T9Y8UI','Operador','Noturno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'comum');
('Mariana Dias', 'C6R5BV','Analista','Diurno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'comum');
('Gustavo Nunes', 'Y3U2IK','Gerente','Noturno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'gestor');
('Beatriz Moraes', 'L2O9PM','Group Leader','Diurno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'comum');
('Henrique Faro', 'V6K3XN','Supervisor','Diurno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'comum');
('Paula Mendes', 'S1J4QR','Analista','Noturno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'comum');
('Carlos Henrique', 'X5Z7LT','Tecnico','Diurno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'comum');
('Renata Alves', 'U8M2YD','Coordenadora','Noturno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'comum');
('Thiago Rocha', 'P0N6GB','Operador','Diurno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'comum');
('Sofia Gomes', 'R4F8CE','Assistente','Noturno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'comum');
('Eduardo Silva', 'D9H1JK','Analista','Diurno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'comum');
('Clara Pinto', 'F2T3YU','Supervisora','Diurno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'comum');
('Igor Fernandes', 'K8V5WS','Gerente','Noturno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'gestor');
('Daniela Castro', 'A7N4ZX','Analista','Diurno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'comum');
('Leandro Rocha', 'G3C9PL','Tecnico','Noturno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'comum');
('Camila Freitas', 'N1B6QS','Coordenadora','Diurno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'comum');
('Roberto Dias', 'Y0E8RM','Operador','Diurno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'comum');
('Juliana Santos', 'V2L7QW','Assistente','Noturno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'comum');
('Mateus Pereira', 'H9K3ZD','Analista','Diurno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'comum');
('Isabela Ribeiro', 'S6M4TY','Supervisora','Noturno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'comum');
('Victor Oliveira', 'C8P2ND','Gerente','Diurno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'gestor');
('Lorena Martins', 'J5R1BV','Group Leader','Diurno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'comum');
('Ronan Sousa', 'P4X9GK','Tecnico','Noturno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'comum');
('Helena Azevedo', 'E3W6ZT','Assistente','Diurno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'comum');
('Sergio Lopes', 'M8D2QY','Operador','Noturno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'comum');
('Tamara Silva', 'L7F5XN','Analista','Diurno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'comum');
('Rafael Gomes', 'Z1C3PR','Supervisor','Diurno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'comum');
('Adriana Faria', 'Q6V8LM','Coordenadora','Noturno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'comum');
('Cesar Almeida', 'W2B9HJ','Gerente','Diurno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'gestor');
('Patricia Barros', 'N5U1CZ','Analista','Diurno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'comum');
('Fagner Moreira', 'Y4K7PX','Tecnico','Noturno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'comum');
('Vanessa Prado', 'H2S8QR','Assistente','Diurno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'comum');
('Alexandre Rocha', 'T3M6DN','Operador','Diurno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'comum');
('Bianca Vieira', 'R9J0LK','Supervisora','Noturno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'comum');
('Murilo Fernandes', 'U5P3XT','Gerente','Diurno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'gestor');
('Livia Cardoso', 'O6Z4GR','Analista','Noturno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'comum');
('Bruno Santana', 'I1V9QS','Tecnico','Diurno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'comum');
('Ariadne Souza', 'K4X2ND','Assistente','Diurno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'comum');
('Robson Nogueira', 'S8E7PV','Operador','Noturno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'comum');
('Marcia Oliveira', 'P9C1YU','Coordenadora','Diurno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'comum');
('Diego Barcellos', 'L0R5WM','Analista','Diurno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'comum');
('Nicole Pires', 'Z6H2KT','Supervisora','Noturno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'comum');
('Otavio Mendes', 'Q3G7BX','Gerente','Diurno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'gestor');
('Manuela Reis', 'E7N4YC','Analista','Diurno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'comum');
('Felipe Cardim', 'V1S8PL','Tecnico','Noturno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'comum');
('Tatiana Morel', 'G5W0RJ','Assistente','Diurno', '$2a$10$c.bkXGhi9otUTwZlqW8yUeF1/i8zoVjOyKCmJ0BbrHh.jqz5Pj2', 'comum');



