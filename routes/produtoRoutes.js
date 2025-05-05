import express from 'express';
import { criarProduto } from '../controllers/produtoController.js';
import { proteger } from '../middlewares/authMiddleware.js';
import { validarProduto, tratarErrosValidacao } from '../validators/produtoValidator.js';

const router = express.Router();

router.post('/', proteger, validarProduto, tratarErrosValidacao, criarProduto);

export default router;