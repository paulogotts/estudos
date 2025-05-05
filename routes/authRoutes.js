import express from 'express';
import { registrar, login } from '../controllers/authController.js';
import { validarRegistro, validarLogin, tratarErrosValidacao } from '../validators/authValidator.js';


const router = express.Router();

// Rotas de autenticação
router.post('/registrar', validarRegistro, tratarErrosValidacao, registrar );

router.post('/login', validarLogin, tratarErrosValidacao, login );

export default router;