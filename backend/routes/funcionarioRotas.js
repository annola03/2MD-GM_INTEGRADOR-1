import express from 'express';
import FuncionarioController from '../controllers/FuncionarioController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { uploadImagens, handleUploadError } from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// Rotas públicas (não precisam de autenticação)
router.get('/', FuncionarioController.listarTodos);
router.get('/:id', FuncionarioController.buscarPorId);

// Rotas protegidas (precisam de autenticação)
router.post('/', authMiddleware, uploadImagens.single('imagem'), handleUploadError, FuncionarioController.criar);
router.post('/upload', authMiddleware, uploadImagens.single('imagem'), handleUploadError, FuncionarioController.uploadImagem);
router.put('/:id', authMiddleware, uploadImagens.single('imagem'), handleUploadError, FuncionarioController.atualizar);
router.delete('/:id', authMiddleware, FuncionarioController.excluir);

// Rotas OPTIONS para CORS (preflight requests)
router.options('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).send();
});

router.options('/upload', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).send();
});

router.options('/:id', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).send();
});

export default router;

