import Produto from '../models/produto.js';

export const criarProduto = async (req, res) => {
  try {
    const { nome, preco } = req.body;
    const produto = await Produto.create({ 
      nome, 
      preco,
      usuarioId: req.usuario.id
    });
    
    res.status(201).json(produto);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

// Adicione outras funções relacionadas a produtos aqui
export const listarProdutos = async (req, res) => {
  // Implementação...
};