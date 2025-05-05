import { body, validationResult } from 'express-validator';
import Usuario from '../models/Usuario.js';

export const validarRegistro = [
  body('nome')
    .notEmpty().withMessage('Nome é obrigatório')
    .isLength({ min: 3 }).withMessage('Nome deve ter pelo menos 3 caracteres'),
  
  body('email')
    .isEmail().withMessage('Email inválido')
    .custom(async (email) => {
      const usuario = await Usuario.findOne({ where: { email } });
      if (usuario) {
        throw new Error('Email já cadastrado');
      }
    }),
  
  body('senha')
    .notEmpty().withMessage('Senha é obrigatória')
    .isLength({ min: 6 }).withMessage('Senha deve ter 6+ caracteres')
];

export const validarLogin = [
  body('email')
    .isEmail().withMessage('Email inválido'),
  
  body('senha')
    .notEmpty().withMessage('Senha é obrigatória')
];

export const validarProduto = [
  body('nome')
    .notEmpty().withMessage('Nome do produto é obrigatório'),
  
  body('preco')
    .isFloat({ gt: 0 }).withMessage('Preço deve ser maior que 0')
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