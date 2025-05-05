import express from 'express';
import Produto from '../models/produto.js';
import { proteger, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Criar um produto
router.post('/', proteger, async (req, res) => {
  req.body.usuarioId = req.usuario.id; // Associa ao usuário logado
    try {
      const produto = await Produto.create(req.body);
      res.status(201).json(produto);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  });
  

// Listar produtos
router.get('/', async (req, res) => {
    try {
      const produtos = await Produto.findAll();
      res.json(produtos);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  });

export default router;