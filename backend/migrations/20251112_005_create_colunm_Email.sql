-- Migration: Criar colunas de email
-- Data: 2025-11-12
-- Descrição: Colunas para os emails

ALTER TABLE usuarios
ADD COLUMN email_padrao VARCHAR(255)
GENERATED ALWAYS AS (CONCAT(LOWER(REPLACE(nome, ' ', '.')), '@gm.com')) STORED;

ALTER TABLE usuarios
ADD COLUMN email_GMID VARCHAR(255)
GENERATED ALWAYS AS (CONCAT(GMID, '@laam.corp.gm.com')) STORED;