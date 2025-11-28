import jwt from "jsonwebtoken";
import UsuarioModel from "../models/UsuarioModel.js";
import { JWT_CONFIG } from "../config/jwt.js";
import { gerarRegistrosAutomaticos } from "../utils/popularRegistros.js";
import bcrypt from "bcryptjs";

function gerarSenha() {
  const caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";
  let senha = "";
  for (let i = 0; i < 10; i++) {
    senha += caracteres[Math.floor(Math.random() * caracteres.length)];
  }
  return senha;
}

// Controller para operações de autenticação
class AuthController {
  // POST /auth/login - Fazer login
  static async login(req, res) {
    try {
      const { email_padrao, senha } = req.body;

      // Validações básicas
      if (!email_padrao || email_padrao.trim() === "") {
        return res.status(400).json({
          sucesso: false,
          erro: "Email obrigatório",
          mensagem: "O email é obrigatório",
        });
      }

      if (!senha || senha.trim() === "") {
        return res.status(400).json({
          sucesso: false,
          erro: "Senha obrigatória",
          mensagem: "A senha é obrigatória",
        });
      }

      // Validação básica de formato de email_padrao
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email_padrao)) {
        return res.status(400).json({
          sucesso: false,
          erro: "Email inválido",
          mensagem: "Formato de email inválido",
        });
      }

      // Verificar credenciais
      const usuario = await UsuarioModel.verificarCredenciais(
        email_padrao.trim(),
        senha
      );

      if (!usuario) {
        return res.status(401).json({
          sucesso: false,
          erro: "Credenciais inválidas",
          mensagem: "Email ou senha incorretos",
        });
      }
      // Gerar token JWT
      const token = jwt.sign(
        {
          id: usuario.id,
          email_padrao: usuario.email_padrao,
          tipo: usuario.tipo,
        },
        JWT_CONFIG.secret,
        { expiresIn: JWT_CONFIG.expiresIn }
      );

      if (usuario.tipo === "Admin") {
        const jaGerou = await UsuarioModel.verificarDadosGerados(usuario.id);

        if (!jaGerou) {
          console.log(
            "🔄 Gerando registros iniciais... (primeiro login do Admin)"
          );
          await gerarRegistrosAutomaticos(token);
          await UsuarioModel.marcarDadosGerados(usuario.id);
        }
      }

      res.status(200).json({
        sucesso: true,
        mensagem: "Login realizado com sucesso",
        dados: {
          token,
          usuario: {
            id: usuario.id,
            nome: usuario.nome,
            email_padrao: usuario.email_padrao,
            tipo: usuario.tipo,
          },
        },
      });
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      res.status(500).json({
        sucesso: false,
        erro: "Erro interno do servidor",
        mensagem: "Não foi possível processar o login",
      });
    }
  }

  static async registrar(req, res) {
    try {
      const { nome, cargo, turno, GMID, tipo } = req.body;

      // Validações...
      if (!GMID) {
        return res.status(400).json({
          sucesso: false,
          erro: "GMID obrigatório",
        });
      }

      // Verificar se GMID já existe
      const usuarioExistente = await UsuarioModel.buscarPorGMID(GMID);
      if (usuarioExistente) {
        return res.status(409).json({
          sucesso: false,
          erro: "GMID já cadastrado",
        });
      }

      // 👉 GERAR A SENHA AQUI
      const senhaGerada = gerarSenha();

      // Criptografar
      const senhaHash = await bcrypt.hash(senhaGerada, 10);

      // Criar usuário
      const usuarioId = await UsuarioModel.criar({
        nome,
        cargo,
        turno,
        GMID,
        senha: senhaHash,
        tipo: tipo,
      });

      // 👉 RETORNAR A SENHA GERADA NO JSON
      return res.status(201).json({
        sucesso: true,
        mensagem: "Funcionário registrado com sucesso!",
        senha: senhaGerada, // <= AQUI!!!
        dados: {
          id: usuarioId,
          nome,
          cargo,
          turno,
          GMID,
          tipo,
        },
      });
    } catch (error) {
      console.error("Erro ao registrar funcionário:", error);
      return res.status(500).json({
        sucesso: false,
        erro: "Erro interno no servidor",
      });
    }
  }

  // GET /auth/perfil - Obter perfil do usuário logado
  static async obterPerfil(req, res) {
    try {
      const usuario = await UsuarioModel.buscarPorId(req.usuario.id);

      if (!usuario) {
        return res.status(404).json({
          sucesso: false,
          erro: "Usuário não encontrado",
          mensagem: "Usuário não foi encontrado",
        });
      }

      // Remover senha dos dados retornados
      const { senha, ...usuarioSemSenha } = usuario;

      res.status(200).json({
        sucesso: true,
        dados: usuarioSemSenha,
      });
    } catch (error) {
      console.error("Erro ao obter perfil:", error);
      res.status(500).json({
        sucesso: false,
        erro: "Erro interno do servidor",
        mensagem: "Não foi possível obter o perfil",
      });
    }
  }

  // PUT /auth/perfil - Atualizar perfil do usuário logado
  static async atualizarPerfil(req, res) {
    try {
      const usuarioId = req.usuario.id;
      const { Nome, email_padrao, Telefone, Endereco } = req.body; // Ajuste conforme os campos que podem ser atualizados

      // Verificar se o usuário existe
      const usuario = await UsuarioModel.buscarPorId(usuarioId);

      if (!usuario) {
        return res.status(404).json({
          sucesso: false,
          erro: "Usuário não encontrado",
          mensagem: "Usuário não foi encontrado",
        });
      }

      // Montar os campos que serão atualizados
      const novosDados = {};

      if (Nome) novosDados.Nome = Nome;
      if (email_padrao) novosDados.email_padrao = email_padrao;
      if (Telefone) novosDados.Telefone = Telefone;
      if (Endereco) novosDados.Endereco = Endereco;

      // Se nenhum campo vier no body
      if (Object.keys(novosDados).length === 0) {
        return res.status(400).json({
          sucesso: false,
          erro: "Nenhum dado enviado",
          mensagem: "Envie ao menos um campo para atualizar",
        });
      }

      console.log("DADOS RECEBIDOS NO PUT:", req.body);

      // Atualizar no banco
      const usuarioAtualizado = await UsuarioModel.atualizar(
        usuarioId,
        novosDados
      );

      // Remover senha
      const { senha, ...usuarioSemSenha } = usuarioAtualizado;

      return res.status(200).json({
        sucesso: true,
        mensagem: "Perfil atualizado com sucesso",
        dados: usuarioSemSenha,
      });
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      return res.status(500).json({
        sucesso: false,
        erro: "Erro interno do servidor",
        mensagem: "Não foi possível atualizar o perfil",
      });
    }
  }

  // PUT /auth/senha - Atualizar senha
  static async atualizarSenha(req, res) {
    try {
      const { senha_atual, nova_senha } = req.body;

      if (!senha_atual || !nova_senha) {
        return res.status(400).json({
          sucesso: false,
          mensagem: "Envie a senha atual e a nova senha.",
        });
      }

      // Buscar usuário logado
      const usuario = await UsuarioModel.buscarPorId(req.usuario.id);

      if (!usuario) {
        return res.status(404).json({
          sucesso: false,
          mensagem: "Usuário não encontrado.",
        });
      }

      // Comparar senha atual
      const senhaConfere = await bcrypt.compare(senha_atual, usuario.senha);

      if (!senhaConfere) {
        return res.status(401).json({
          sucesso: false,
          mensagem: "Senha atual incorreta.",
        });
      }

      // Gerar hash da nova senha
      const novaSenhaHash = await bcrypt.hash(nova_senha, 10);

      // Atualizar no banco
      await UsuarioModel.atualizar(req.usuario.id, {
        senha: novaSenhaHash,
      });

      return res.status(200).json({
        sucesso: true,
        mensagem: "Senha atualizada com sucesso!",
      });
    } catch (erro) {
      console.error("Erro ao atualizar senha:", erro);
      return res.status(500).json({
        sucesso: false,
        mensagem: "Erro interno ao atualizar senha.",
      });
    }
  }

  // GET /usuarios - Listar todos os usuários (apenas admin, com paginação)
  static async listarUsuarios(req, res) {
    try {
      // Obter parâmetros de paginação da query string
      const pagina = parseInt(req.query.pagina) || 1;
      const limite = parseInt(req.query.limite) || 10;

      // Validações
      if (pagina < 1) {
        return res.status(400).json({
          sucesso: false,
          erro: "Página inválida",
          mensagem: "A página deve ser um número maior que zero",
        });
      }

      const limiteMaximo = parseInt(process.env.PAGINACAO_LIMITE_MAXIMO) || 100;
      if (limite < 1 || limite > limiteMaximo) {
        return res.status(400).json({
          sucesso: false,
          erro: "Limite inválido",
          mensagem: `O limite deve ser um número entre 1 e ${limiteMaximo}`,
        });
      }

      const resultado = await UsuarioModel.listarTodos(pagina, limite);

      // Remover senha de todos os usuários
      const usuariosSemSenha = resultado.usuarios.map(
        ({ senha, ...usuario }) => usuario
      );

      res.status(200).json({
        sucesso: true,
        dados: usuariosSemSenha,
        paginacao: {
          pagina: resultado.pagina,
          limite: resultado.limite,
          total: resultado.total,
          totalPaginas: resultado.totalPaginas,
        },
      });
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
      res.status(500).json({
        sucesso: false,
        erro: "Erro interno do servidor",
        mensagem: "Não foi possível listar os usuários",
      });
    }
  }

  // POST /usuarios - Criar novo usuário (apenas admin)
  static async criarUsuario(req, res) {
    try {
      const { nome, email_padrao, senha, tipo } = req.body;

      // Validações básicas
      if (!nome || nome.trim() === "") {
        return res.status(400).json({
          sucesso: false,
          erro: "Nome obrigatório",
          mensagem: "O nome é obrigatório",
        });
      }

      if (!email_padrao || email_padrao.trim() === "") {
        return res.status(400).json({
          sucesso: false,
          erro: "Email obrigatório",
          mensagem: "O email_padrao é obrigatório",
        });
      }

      if (!senha || senha.trim() === "") {
        return res.status(400).json({
          sucesso: false,
          erro: "Senha obrigatória",
          mensagem: "A senha é obrigatória",
        });
      }

      // Validações de formato
      if (nome.length < 2) {
        return res.status(400).json({
          sucesso: false,
          erro: "Nome muito curto",
          mensagem: "O nome deve ter pelo menos 2 caracteres",
        });
      }

      if (nome.length > 255) {
        return res.status(400).json({
          sucesso: false,
          erro: "Nome muito longo",
          mensagem: "O nome deve ter no máximo 255 caracteres",
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email_padrao)) {
        return res.status(400).json({
          sucesso: false,
          erro: "Email inválido",
          mensagem: "Formato de email inválido",
        });
      }

      if (senha.length < 6) {
        return res.status(400).json({
          sucesso: false,
          erro: "Senha muito curta",
          mensagem: "A senha deve ter pelo menos 6 caracteres",
        });
      }

      // Verificar se o email_padrao já existe
      const usuarioExistente = await UsuarioModel.buscarPorEmail(email_padrao);
      if (usuarioExistente) {
        return res.status(409).json({
          sucesso: false,
          erro: "Email já cadastrado",
          mensagem: "Este email já está sendo usado por outro usuário",
        });
      }

      // Preparar dados do usuário
      const dadosUsuario = {
        nome: nome.trim(),
        email_padrao: email_padrao.trim().toLowerCase(),
        senha: hash,
        tipo: tipo || "comum",
      };

      // Criar usuário
      const usuarioId = await UsuarioModel.criar(dadosUsuario);

      res.status(201).json({
        sucesso: true,
        mensagem: "Usuário criado com sucesso",
        dados: {
          id: usuarioId,
          nome: dadosUsuario.nome,
          email_padrao: dadosUsuario.email_padrao,
          tipo: dadosUsuario.tipo,
        },
      });
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      res.status(500).json({
        sucesso: false,
        erro: "Erro interno do servidor",
        mensagem: "Não foi possível criar o usuário",
      });
    }
  }

  // PUT /usuarios/:id - Atualizar usuário (apenas admin)
  static async atualizarUsuario(req, res) {
    try {
      const { id } = req.params;
      // campos que o frontend envia: nome, cargo, turno, GMID, senha
      const { nome, cargo, turno, GMID, senha } = req.body;

      // Validação do ID
      if (!id || isNaN(id)) {
        return res.status(400).json({
          sucesso: false,
          erro: "ID inválido",
          mensagem: "O ID deve ser um número válido",
        });
      }

      // Verificar se o usuário existe
      const usuarioExistente = await UsuarioModel.buscarPorId(id);
      if (!usuarioExistente) {
        return res.status(404).json({
          sucesso: false,
          erro: "Usuário não encontrado",
          mensagem: `Usuário com ID ${id} não foi encontrado`,
        });
      }

      // Preparar dados para atualização (mapear para nomes de coluna se necessário)
      const dadosAtualizacao = {};

      if (nome !== undefined) {
        if (typeof nome !== "string" || nome.trim() === "") {
          return res.status(400).json({
            sucesso: false,
            erro: "Nome inválido",
            mensagem: "O nome não pode estar vazio",
          });
        }
        if (nome.length < 2) {
          return res.status(400).json({
            sucesso: false,
            erro: "Nome muito curto",
            mensagem: "O nome deve ter pelo menos 2 caracteres",
          });
        }

        // mapear para a coluna do DB (ajuste se seu DB usa 'nome' minúsculo)
        dadosAtualizacao.Nome = nome.trim();
      }

      if (cargo !== undefined) {
        if (typeof cargo !== "string" || cargo.trim() === "") {
          return res.status(400).json({
            sucesso: false,
            erro: "Cargo inválido",
            mensagem: "O cargo não pode estar vazio",
          });
        }
        dadosAtualizacao.Cargo = cargo.trim();
      }

      if (turno !== undefined) {
        if (typeof turno !== "string" || turno.trim() === "") {
          return res.status(400).json({
            sucesso: false,
            erro: "Turno inválido",
            mensagem: "O turno não pode estar vazio",
          });
        }
        dadosAtualizacao.Turno = turno.trim();
      }

      if (GMID !== undefined) {
        if (typeof GMID !== "string" || GMID.trim() === "") {
          return res.status(400).json({
            sucesso: false,
            erro: "GMID inválido",
            mensagem: "O GMID não pode estar vazio",
          });
        }

        // Verificar se já existe outro usuário com esse GMID
        const existe = await UsuarioModel.buscarPorGMID(GMID.trim());
        if (existe && existe.id !== parseInt(id, 10)) {
          return res.status(409).json({
            sucesso: false,
            erro: "GMID já cadastrado",
            mensagem: "Este GMID já está sendo usado por outro usuário",
          });
        }

        dadosAtualizacao.GMID = GMID.trim();
      }

      if (senha !== undefined) {
        if (typeof senha !== "string" || senha.trim() === "") {
          return res.status(400).json({
            sucesso: false,
            erro: "Senha inválida",
            mensagem: "A senha não pode estar vazia",
          });
        }
        if (senha.length < 6) {
          return res.status(400).json({
            sucesso: false,
            erro: "Senha muito curta",
            mensagem: "A senha deve ter pelo menos 6 caracteres",
          });
        }

        // criptografar antes de salvar
        const hash = await bcrypt.hash(senha, 10);
        // mapear para a coluna do DB (ajuste caso sua coluna seja 'senha' minúsculo)
        dadosAtualizacao.Senha = hash;
      }

      // Se não houver nada para atualizar
      if (Object.keys(dadosAtualizacao).length === 0) {
        return res.status(400).json({
          sucesso: false,
          erro: "Nenhum dado para atualizar",
          mensagem: "Forneça pelo menos um campo para atualizar",
        });
      }

      // Chamar model para atualizar (se seu model espera chaves minúsculas ajuste o objeto acima)
      const resultado = await UsuarioModel.atualizar(id, dadosAtualizacao);

      return res.status(200).json({
        sucesso: true,
        mensagem: "Usuário atualizado com sucesso",
        dados: { linhasAfetadas: resultado || 1 },
      });
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      return res.status(500).json({
        sucesso: false,
        erro: "Erro interno do servidor",
        mensagem: "Não foi possível atualizar o usuário",
      });
    }
  }

  // DELETE /usuarios/:id - Excluir usuário (apenas admin)
  static async excluirUsuario(req, res) {
    try {
      const { id } = req.params;

      // Validação do ID
      if (!id || isNaN(id)) {
        return res.status(400).json({
          sucesso: false,
          erro: "ID inválido",
          mensagem: "O ID deve ser um número válido",
        });
      }

      // Verificar se o usuário existe
      const usuarioExistente = await UsuarioModel.buscarPorId(id);
      if (!usuarioExistente) {
        return res.status(404).json({
          sucesso: false,
          erro: "Usuário não encontrado",
          mensagem: `Usuário com ID ${id} não foi encontrado`,
        });
      }

      // Excluir usuário
      const resultado = await UsuarioModel.excluir(id);

      res.status(200).json({
        sucesso: true,
        mensagem: "Usuário excluído com sucesso",
        dados: {
          linhasAfetadas: resultado || 1,
        },
      });
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      res.status(500).json({
        sucesso: false,
        erro: "Erro interno do servidor",
        mensagem: "Não foi possível excluir o usuário",
      });
    }
  }

  static async atualizarProprioUsuario(req, res) {
    try {
      const userId = req.user.id; // ID vindo do token JWT
      const { nome, email_padrao, senha } = req.body;

      const camposParaAtualizar = {};

      if (nome) camposParaAtualizar.nome = nome;
      if (email_padrao) camposParaAtualizar.email_padrao = email_padrao;

      // Se o usuário quiser alterar a senha
      if (senha) {
        const hashed = await bcrypt.hash(senha, 10);
        camposParaAtualizar.senha = hashed;
      }

      const usuarioAtualizado = await UsuarioModel.atualizar(
        userId,
        camposParaAtualizar
      );

      res.json({
        sucesso: true,
        mensagem: "Usuário atualizado com sucesso!",
        dados: usuarioAtualizado,
      });
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      res
        .status(500)
        .json({ sucesso: false, mensagem: "Erro interno no servidor" });
    }
  }
}

export default AuthController;
