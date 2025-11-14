import funcionarioModel from '../models/FuncionarioModel.js';
import { fileURLToPath } from 'url';
import path from 'path';
import { removerArquivoAntigo } from '../middlewares/uploadMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class funcionarioController {

    // GET /funcionarios - Listar todos os funcionários (com paginação)
    static async listarTodos(req, res) {
        try {
            let pagina = parseInt(req.query.pagina) || 1;
            let limite = parseInt(req.query.limite) || 10;

            if (pagina <= 0) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Página inválida',
                    mensagem: 'A página deve ser maior que zero.'
                });
            }

            if (limite <= 0) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Limite inválido',
                    mensagem: 'O limite deve ser maior que zero.'
                });
            }

            const limiteMaximo = parseInt(process.env.PAGINACAO_LIMITE_MAXIMO) || 100;

            if (limite > limiteMaximo) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Limite inválido',
                    mensagem: `O limite deve ser entre 1 e ${limiteMaximo}`
                });
            }

            const offset = (pagina - 1) * limite;

            const resultado = await funcionarioModel.listarTodos(limite, offset);

            res.status(200).json({
                sucesso: true,
                dados: resultado.funcionarios,
                paginacao: {
                    pagina: resultado.pagina,
                    limite: resultado.limite,
                    total: resultado.total,
                    totalPaginas: resultado.totalPaginas
                }
            });

        } catch (error) {
            console.error('Erro ao listar funcionários:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível listar os funcionários.'
            });
        }
    }

    // GET /funcionarios/:GMID - Buscar funcionário por GMID
    static async buscarPorGMID(req, res) {
        try {
            const { GMID } = req.params;

            if (!GMID || isNaN(GMID)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'GMID inválido',
                    mensagem: 'O GMID deve ser numérico.'
                });
            }

            const funcionario = await funcionarioModel.buscarPorGMID(GMID);

            if (!funcionario) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Funcionário não encontrado',
                    mensagem: `Nenhum funcionário com GMID ${GMID}`
                });
            }

            res.status(200).json({
                sucesso: true,
                dados: funcionario
            });

        } catch (error) {
            console.error('Erro ao buscar funcionário:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível consultar o funcionário.'
            });
        }
    }

    // POST /funcionarios - Criar funcionário
    static async criar(req, res) {
        try {
            const { GMID, Entrada, Saida, Turno } = req.body;

            const erros = [];

            // GMID
            if (!GMID || GMID.trim() === '') {
                erros.push({ campo: 'GMID', mensagem: 'GMID é obrigatório.' });
            } else if (GMID.trim().length < 3) {
                erros.push({ campo: 'GMID', mensagem: 'GMID deve ter no mínimo 3 caracteres.' });
            }

            // Saída
            if (!Saida) {
                erros.push({ campo: 'Saida', mensagem: 'Saída é obrigatória.' });
            }

            if (erros.length > 0) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Dados inválidos',
                    detalhes: erros
                });
            }

            const dadosFuncionario = {
                GMID: GMID.trim(),
                Entrada: Entrada || null,
                Saida: Saida || null,
                Turno: Turno || 'Geral',
            };

            if (req.file) {
                dadosFuncionario.imagem = req.file.filename;
            }

            const novoId = await funcionarioModel.criar(dadosFuncionario);

            res.status(201).json({
                sucesso: true,
                mensagem: 'Funcionário criado com sucesso.',
                dados: {
                    id: novoId,
                    ...dadosFuncionario
                }
            });

        } catch (error) {
            console.error('Erro ao criar funcionário:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno',
                mensagem: 'Não foi possível criar o funcionário.'
            });
        }
    }

    // PUT /funcionarios/:GMID - Atualizar funcionário
    static async atualizar(req, res) {
        try {
            const { GMID } = req.params;
            const { Entrada, Saida, Turno } = req.body;

            if (!GMID || isNaN(GMID)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'GMID inválido',
                    mensagem: 'GMID deve ser numérico.'
                });
            }

            const funcionarioExistente = await funcionarioModel.buscarPorGMID(GMID);

            if (!funcionarioExistente) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Funcionário não encontrado',
                    mensagem: `Nenhum funcionário com GMID ${GMID}`
                });
            }

            const dadosAtualizacao = {};

            if (Entrada !== undefined) dadosAtualizacao.Entrada = Entrada;
            if (Saida !== undefined) dadosAtualizacao.Saida = Saida;
            if (Turno !== undefined) dadosAtualizacao.Turno = Turno;

            if (req.file) {
                if (funcionarioExistente.imagem) {
                    await removerArquivoAntigo(funcionarioExistente.imagem, 'imagem');
                }
                dadosAtualizacao.imagem = req.file.filename;
            }

            if (Object.keys(dadosAtualizacao).length === 0) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Nenhum dado enviado',
                    mensagem: 'Envie pelo menos um campo para atualizar.'
                });
            }

            await funcionarioModel.atualizar(GMID, dadosAtualizacao);

            res.status(200).json({
                sucesso: true,
                mensagem: 'Funcionário atualizado com sucesso.'
            });

        } catch (error) {
            console.error('Erro ao atualizar funcionário:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno',
                mensagem: 'Não foi possível atualizar o funcionário.'
            });
        }
    }

    // DELETE /funcionarios/:GMID - Excluir funcionário
    static async excluir(req, res) {
        try {
            const { GMID } = req.params;

            if (!GMID || isNaN(GMID)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'GMID inválido',
                    mensagem: 'GMID deve ser numérico.'
                });
            }

            const funcionarioExistente = await funcionarioModel.buscarPorGMID(GMID);

            if (!funcionarioExistente) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Funcionário não encontrado',
                    mensagem: `Nenhum funcionário com GMID ${GMID}`
                });
            }

            if (funcionarioExistente.imagem) {
                await removerArquivoAntigo(funcionarioExistente.imagem, 'imagem');
            }

            await funcionarioModel.excluir(GMID);

            res.status(200).json({
                sucesso: true,
                mensagem: 'Funcionário excluído com sucesso.'
            });

        } catch (error) {
            console.error('Erro ao excluir funcionário:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno',
                mensagem: 'Não foi possível excluir o funcionário.'
            });
        }
    }

    // POST /funcionarios/upload - Upload de imagem
    static async uploadImagem(req, res) {
        try {
            const { funcionario_GMID } = req.body;

            if (!funcionario_GMID || isNaN(funcionario_GMID)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'GMID inválido',
                    mensagem: 'O GMID deve ser numérico.'
                });
            }

            if (!req.file) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Imagem ausente',
                    mensagem: 'Você deve enviar uma imagem.'
                });
            }

            const funcionario = await funcionarioModel.buscarPorGMID(funcionario_GMID);

            if (!funcionario) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Funcionário não encontrado',
                    mensagem: `Nenhum funcionário com GMID ${funcionario_GMID}`
                });
            }

            if (funcionario.imagem) {
                await removerArquivoAntigo(funcionario.imagem, 'imagem');
            }

            await funcionarioModel.atualizar(funcionario_GMID, { imagem: req.file.filename });

            res.status(200).json({
                sucesso: true,
                mensagem: 'Imagem enviada com sucesso.',
                dados: {
                    arquivo: req.file.filename,
                    caminho: `/uploads/imagens/${req.file.filename}`
                }
            });

        } catch (error) {
            console.error('Erro ao fazer upload:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno',
                mensagem: 'Não foi possível enviar a imagem.'
            });
        }
    }
}

export default funcionarioController;
