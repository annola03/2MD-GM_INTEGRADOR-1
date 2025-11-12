import { create, read, update, deleteRecord, getConnection } from '../config/database.js';

// Model para operações com funcionarios
class funcionarioModel {
    // Listar todos os funcionarios (com paginação)
    static async listarTodos(limite, offset) {
        try {

            const connection = await getConnection();
            try {
                const sql = 'SELECT * FROM funcionarios ORDER BY id DESC LIMIT ? OFFSET ?';

                const [funcionarios] = await connection.query(sql, [limite, offset]);

                const [totalResult] = await connection.execute('SELECT COUNT(*) as total FROM funcionarios');
                const total = totalResult[0].total;

                const paginaAtual = (offset / limite) + 1;
                const totalPaginas = Math.ceil(total / limite);

                return {
                    funcionarios,
                    total,
                    pagina: paginaAtual,
                    limite,
                    totalPaginas
                };
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error('Erro ao listar funcionarios:', error);
            throw error;
        }
    }

    // Buscar funcionario por ID
    static async buscarPorId(id) {
        try {
            const rows = await read('funcionarios', `id = ${id}`);
            return rows[0] || null;
        } catch (error) {
            console.error('Erro ao buscar funcionario por ID:', error);
            throw error;
        }
    }

    // Criar novo funcionario
    static async criar(dadosfuncionario) {
        try {
            return await create('funcionarios', dadosfuncionario);
        } catch (error) {
            console.error('Erro ao criar funcionario:', error);
            throw error;
        }
    }

    // Atualizar funcionario
    static async atualizar(id, dadosfuncionario) {
        try {
            return await update('funcionarios', dadosfuncionario, `id = ${id}`);
        } catch (error) {
            console.error('Erro ao atualizar funcionario:', error);
            throw error;
        }
    }

    // Excluir funcionario
    static async excluir(id) {
        try {
            return await deleteRecord('funcionarios', `id = ${id}`);
        } catch (error) {
            console.error('Erro ao excluir funcionario:', error);
            throw error;
        }
    }

    // Buscar funcionarios por categoria
    static async buscarPorCategoria(categoria) {
        try {
            return await read('funcionarios', `categoria = '${categoria}'`);
        } catch (error) {
            console.error('Erro ao buscar funcionarios por categoria:', error);
            throw error;
        }
    }
}

export default funcionarioModel;
