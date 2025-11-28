import {
  create,
  read,
  update,
  deleteRecord,
  getConnection,
} from "../config/database.js";

// Model para operações com funcionarios
class funcionarioModel {
  // Listar todos os funcionarios (com paginação)
  static async listarTodos(limite, offset) {
    try {
      const connection = await getConnection();
      try {
        const sql =
          "SELECT * FROM funcionarios ORDER BY GMID DESC LIMIT ? OFFSET ?";

        const [funcionarios] = await connection.query(sql, [limite, offset]);

        const [totalResult] = await connection.execute(
          "SELECT COUNT(*) as total FROM funcionarios"
        );
        const total = totalResult[0].total;

        const paginaAtual = offset / limite + 1;
        const totalPaginas = Math.ceil(total / limite);

        return {
          funcionarios,
          total,
          pagina: paginaAtual,
          limite,
          totalPaginas,
        };
      } finally {
        connection.release();
      }
    } catch (error) {
      console.error("Erro ao listar funcionarios:", error);
      throw error;
    }
  }

  static async registrarPonto(GMID, turno) {
    try {
      const connection = await getConnection();

      const hoje = new Date().toISOString().split("T")[0];

      // Buscar registro aberto (entrada sem saída)
      const [registros] = await connection.query(
        `
      SELECT * FROM funcionarios 
      WHERE GMID = ? 
      AND data_registro = ? 
      ORDER BY id DESC LIMIT 1
      `,
        [GMID, hoje]
      );

      // Registrar SAÍDA
      if (registros.length > 0 && registros[0].Saida === "00:00:00") {
        const horaSaida = new Date().toLocaleTimeString("pt-BR", {
          hour12: false,
        });

        await connection.query(
          `UPDATE funcionarios SET Saida = ? WHERE id = ?`,
          [horaSaida, registros[0].id]
        );

        connection.release();

        return {
          tipo: "saida",
          mensagem: "Saída registrada!",
          id: registros[0].id,
        };
      }

      // Registrar ENTRADA
      const horaEntrada = new Date().toLocaleTimeString("pt-BR", {
        hour12: false,
      });

      const [result] = await connection.query(
        `
      INSERT INTO funcionarios (GMID, Entrada, Saida, Turno, data_registro)
      VALUES (?, ?, '00:00:00', ?, ?)
      `,
        [GMID, horaEntrada, turno, hoje]
      );

      connection.release();

      return {
        tipo: "entrada",
        mensagem: "Entrada registrada!",
        id: result.insertId,
      };
    } catch (error) {
      console.error("Erro ao registrar ponto:", error);
      throw error;
    }
  }

  // Buscar funcionario por GMID
  static async buscarPorGMID(GMID) {
    try {
      const rows = await read(
        "funcionarios",
        `GMID = '${GMID}' ORDER BY id DESC LIMIT 30`
      );
      return rows;
    } catch (error) {
      console.error("Erro ao buscar funcionario por GMID:", error);
      throw error;
    }
  }

  // Criar novo funcionario
  static async criar(dadosfuncionario) {
    try {
      return await create("funcionarios", dadosfuncionario);
    } catch (error) {
      console.error("Erro ao criar funcionario:", error);
      throw error;
    }
  }

  // Atualizar funcionario
  static async atualizar(GMID, dadosfuncionario) {
    try {
      return await update("funcionarios", dadosfuncionario, `GMID = ${GMID}`);
    } catch (error) {
      console.error("Erro ao atualizar funcionario:", error);
      throw error;
    }
  }

  // Excluir funcionario
  static async excluir(GMID) {
    try {
      return await deleteRecord("funcionarios", `GMID = ${GMID}`);
    } catch (error) {
      console.error("Erro ao excluir funcionario:", error);
      throw error;
    }
  }

  // Buscar funcionarios por categoria
  static async buscarPorCategoria(categoria) {
    try {
      return await read("funcionarios", `categoria = '${categoria}'`);
    } catch (error) {
      console.error("Erro ao buscar funcionarios por categoria:", error);
      throw error;
    }
  }
}

export default funcionarioModel;
