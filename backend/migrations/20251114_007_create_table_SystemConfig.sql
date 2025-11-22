-- Migration: Inserir dados iniciais
-- Data: 2025-11-14
-- Descrição: Gerar dados automaticos

CREATE TABLE IF NOT EXISTS SystemConfig (
  id INT PRIMARY KEY AUTO_INCREMENT,
  config_key VARCHAR(50) UNIQUE,
  config_value VARCHAR(50)
);

INSERT IGNORE INTO SystemConfig (config_key, config_value)
VALUES ('initialized', 'false');
