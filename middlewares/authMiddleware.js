import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

// Middleware de autenticação
export const proteger = async (req, res, next) => {
  try {
    let token;
    
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ erro: 'Acesso não autorizado' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = await Usuario.findByPk(decoded.id, {
      attributes: ['id', 'role'] // Certifique-se de incluir 'role'
    });
    if (!req.usuario) {
      return res.status(401).json({ erro: 'Usuário não encontrado' });
    }

    next();
  } catch (error) {
    res.status(401).json({ erro: 'Token inválido' });
  }
};

// Middleware de autorização
export const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.usuario.role)) {
      return res.status(403).json({ erro: 'Acesso negado' });
    }
    next();
  };
};