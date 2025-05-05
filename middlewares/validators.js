import { body, validationResult } from 'express-validator';

// Validações para registro
export const validarRegistro = [
  body('nome')
    .notEmpty().withMessage('Nome é obrigatório')
    .isLength({ min: 3 }).withMessage('Nome deve ter pelo menos 3 caracteres'),
  
  body('email')
    .isEmail().withMessage('Email inválido')
    .normalizeEmail(),
  
  body('senha')
    .isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres')
    .matches(/\d/).withMessage('Senha deve conter um número')
];

// Validações para login
export const validarLogin = [
  body('email')
    .isEmail().withMessage('Email inválido'),
  
  body('senha')
    .notEmpty().withMessage('Senha é obrigatória')
];

// Middleware para tratar os erros de validação
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