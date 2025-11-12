import funcionarioModel from '../models/FuncionarioModel.js';
import { fileURLToPath } from 'url';
import path from 'path';
import { removerArquivoAntigo } from '../middlewares/uploadMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Controller para operações com funcionarios
class funcionarioController {

    // GET /funcionarios - Listar todos os funcionarios (com paginação)
    static async listarTodos(req, res) {
        try {
           
            let pagina = parseInt(req.query.pagina) || 1;
            let limite = parseInt(req.query.limite) || 10;

            if (pagina <= 0) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Página inválida',
                    mensagem: 'A página deve ser um número maior que zero'
                });
            }
            if (limite <= 0) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Limite inválido',
                    mensagem: 'O limite deve ser um número maior que zero'
                });
            }

            const limiteMaximo = parseInt(process.env.PAGINACAO_LIMITE_MAXIMO) || 100;
            if (limite > limiteMaximo) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Limite inválido',
                    mensagem: `O limite deve ser um número entre 1 e ${limiteMaximo}`
                });
            }

            const offset = (pagina - 1) * limite;

            const resultado = await funcionarioModel.listarTodos(limite, offset); // <-- MUDANÇA AQUI

            res.status(200).json({
                sucesso: true,
                dados: resultado.funcionarios,
                paginacao: {
                    pagina: resultado.pagina, // O Model deve calcular e retornar isso
                    limite: resultado.limite, // O Model deve retornar isso
                    total: resultado.total,   // O Model deve calcular e retornar isso
                    totalPaginas: resultado.totalPaginas // O Model deve calcular e retornar isso
                }
            });
        } catch (error) {
            console.error('Erro ao listar funcionarios:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível listar os funcionarios'
            });
        }
    }

    // GET /funcionarios/:id - Buscar funcionario por ID
    static async buscarPorId(req, res) {
        try {
            const { id } = req.params;

            // Validação básica do ID
            if (!id || isNaN(id)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'ID inválido',
                    mensagem: 'O ID deve ser um número válido'
                });
            }

            const funcionario = await funcionarioModel.buscarPorId(id);

            if (!funcionario) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'funcionario não encontrado',
                    mensagem: `funcionario com ID ${id} não foi encontrado`
                });
            }

            res.status(200).json({
                sucesso: true,
                dados: funcionario
            });
        } catch (error) {
            console.error('Erro ao buscar funcionario:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível buscar o funcionario'
            });
        }
    }

    // POST /funcionarios - Criar novo funcionario
    static async criar(req, res) {
        try {
            const { nome, descricao, preco, categoria } = req.body;

            // Validações manuais - coletar todos os erros
            const erros = [];

            // Validar nome
            if (!nome || nome.trim() === '') {
                erros.push({
                    campo: 'nome',
                    mensagem: 'Nome é obrigatório'
                });
            } else {
                if (nome.trim().length < 3) {
                    erros.push({
                        campo: 'nome',
                        mensagem: 'O nome deve ter pelo menos 3 caracteres'
                    });
                }

                if (nome.trim().length > 255) {
                    erros.push({
                        campo: 'nome',
                        mensagem: 'O nome deve ter no máximo 255 caracteres'
                    });
                }
            }

            // Validar preço
            if (!preco || isNaN(preco) || preco <= 0) {
                erros.push({
                    campo: 'preco',
                    mensagem: 'Preço deve ser um número positivo'
                });
            }

            // Se houver erros, retornar todos de uma vez
            if (erros.length > 0) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Dados inválidos',
                    detalhes: erros
                });
            }

            // Preparar dados do funcionario
            const dadosfuncionario = {
                nome: nome.trim(),
                descricao: descricao ? descricao.trim() : null,
                preco: parseFloat(preco),
                categoria: categoria ? categoria.trim() : 'Geral'
            };

            // Adicionar imagem se foi enviada
            if (req.file) {
                dadosfuncionario.imagem = req.file.filename;
            }

            const funcionarioId = await funcionarioModel.criar(dadosfuncionario);

            res.status(201).json({
                sucesso: true,
                mensagem: 'funcionario criado com sucesso',
                dados: {
                    id: funcionarioId,
                    ...dadosfuncionario
                }
            });
        } catch (error) {
            console.error('Erro ao criar funcionario:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível criar o funcionario'
            });
        }
    }

    // PUT /funcionarios/:id - Atualizar funcionario
    static async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { nome, descricao, preco, categoria } = req.body;

            // Validação do ID
            if (!id || isNaN(id)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'ID inválido',
                    mensagem: 'O ID deve ser um número válido'
                });
            }

            // Verificar se o funcionario existe
            const funcionarioExistente = await funcionarioModel.buscarPorId(id);
            if (!funcionarioExistente) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'funcionario não encontrado',
                    mensagem: `funcionario com ID ${id} não foi encontrado`
                });
            }

            // Preparar dados para atualização
            const dadosAtualizacao = {};

            if (nome !== undefined) {
                if (nome.trim() === '') {
                    return res.status(400).json({
                        sucesso: false,
                        erro: 'Nome inválido',
                        mensagem: 'O nome não pode estar vazio'
                    });
                }
                dadosAtualizacao.nome = nome.trim();
            }

            if (preco !== undefined) {
                if (isNaN(preco) || preco <= 0) {
                    return res.status(400).json({
                        sucesso: false,
                        erro: 'Preço inválido',
                        mensagem: 'O preço deve ser um número maior que zero'
                    });
                }
                dadosAtualizacao.preco = parseFloat(preco);
            }

            if (descricao !== undefined) {
                dadosAtualizacao.descricao = descricao ? descricao.trim() : null;
            }

            if (categoria !== undefined) {
                dadosAtualizacao.categoria = categoria ? categoria.trim() : 'Geral';
            }

            // Adicionar nova imagem se foi enviada
            if (req.file) {
                // Remover imagem antiga se existir
                if (funcionarioExistente.imagem) {
                    await removerArquivoAntigo(funcionarioExistente.imagem, 'imagem');
                }
                dadosAtualizacao.imagem = req.file.filename;
            }

            // Verificar se há dados para atualizar
            if (Object.keys(dadosAtualizacao).length === 0) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Nenhum dado para atualizar',
                    mensagem: 'Forneça pelo menos um campo para atualizar'
                });
            }

            const resultado = await funcionarioModel.atualizar(id, dadosAtualizacao);

            res.status(200).json({
                sucesso: true,
                mensagem: 'funcionario atualizado com sucesso',
                dados: {
                    linhasAfetadas: resultado.affectedRows || 1
                }
            });
        } catch (error) {
            console.error('Erro ao atualizar funcionario:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível atualizar o funcionario'
            });
        }
    }

    // DELETE /funcionarios/:id - Excluir funcionario
    static async excluir(req, res) {
        try {
            const { id } = req.params;

            // Validação do ID
            if (!id || isNaN(id)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'ID inválido',
                    mensagem: 'O ID deve ser um número válido'
                });
            }

            // Verificar se o funcionario existe
            const funcionarioExistente = await funcionarioModel.buscarPorId(id);
            if (!funcionarioExistente) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'funcionario não encontrado',
                    mensagem: `funcionario com ID ${id} não foi encontrado`
                });
            }

            // Remover imagem do funcionario se existir
            if (funcionarioExistente.imagem) {
                await removerArquivoAntigo(funcionarioExistente.imagem, 'imagem');
            }

            const resultado = await funcionarioModel.excluir(id);

            res.status(200).json({
                sucesso: true,
                mensagem: 'funcionario excluído com sucesso',
                dados: {
                    linhasAfetadas: resultado || 1
                }
            });
        } catch (error) {
            console.error('Erro ao excluir funcionario:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível excluir o funcionario'
            });
        }
    }

    // POST /funcionarios/upload - Upload de imagem para funcionario
    static async uploadImagem(req, res) {
        try {
            const { funcionario_id } = req.body;

            // Validações básicas
            if (!funcionario_id || isNaN(funcionario_id)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'ID de funcionario inválido',
                    mensagem: 'O ID do funcionario é obrigatório e deve ser um número válido'
                });
            }

            if (!req.file) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Imagem não fornecida',
                    mensagem: 'É necessário enviar uma imagem'
                });
            }

            // Verificar se o funcionario existe
            const funcionarioExistente = await funcionarioModel.buscarPorId(funcionario_id);
            if (!funcionarioExistente) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'funcionario não encontrado',
                    mensagem: `funcionario com ID ${funcionario_id} não foi encontrado`
                });
            }

            // Remover imagem antiga se existir
            if (funcionarioExistente.imagem) {
                await removerArquivoAntigo(funcionarioExistente.imagem, 'imagem');
            }

            // Atualizar funcionario com a nova imagem
            await funcionarioModel.atualizar(funcionario_id, { imagem: req.file.filename });

            res.status(200).json({
                sucesso: true,
                mensagem: 'Imagem enviada com sucesso',
                dados: {
                    nomeArquivo: req.file.filename,
                    caminho: `/uploads/imagens/${req.file.filename}`
                }
            });
        } catch (error) {
            console.error('Erro ao fazer upload de imagem:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível fazer upload da imagem'
            });
        }
    }
}

export default funcionarioController;

