import { body, validationResult } from 'express-validator';

export const validarProduto = [
  body('nome')
    .trim()
    .notEmpty().withMessage('Nome do produto é obrigatório')
    .isLength({ min: 3 }).withMessage('Nome deve ter pelo menos 3 caracteres'),
  
  body('preco')
    .isFloat({ gt: 0 }).withMessage('Preço deve ser maior que 0')
    .toFloat(),
    
  body('descricao')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Descrição muito longa')
];

export const tratarErrosValidacao = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      erro: 'Dados inválidos',
      detalhes: errors.array().map(err => err.msg) 
    });
  }
  next();
};