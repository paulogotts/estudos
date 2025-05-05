import jwt from 'jsonwebtoken';
import crypto from 'crypto'; 
import Usuario from '../models/Usuario.js';
import { validationResult } from 'express-validator';


const gerarToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

const gerarRefreshToken = () => {
  const token = crypto.randomBytes(40).toString('hex');
  const expiraEm = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  return { token, expiraEm };
};

export const registrar = async (req, res) => {
  const { nome, email, senha, role } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
      const usuario = await Usuario.create({ nome, email, senha, role });
    res.status(201).json({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      role: usuario.role,
      token: gerarToken(usuario.id, usuario.role)
    });
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

export const login = async (req, res) => {
  const { email, senha } = req.body;

  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario || !(await usuario.validarSenha(senha))) {
    return res.status(401).json({ erro: 'Credenciais inválidas' });
  }

  
  const token = gerarToken(usuario.id, usuario.role);
  const { token: refreshToken, expiraEm } = gerarRefreshToken();

  
  usuario.refreshToken = refreshToken;
  usuario.refreshTokenExpira = expiraEm;
  await usuario.save();

  res.json({
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    token,
    refreshToken,
    expiraEm,
    role: usuario.role
  });
};