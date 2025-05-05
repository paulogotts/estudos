import express from 'express';
import { proteger, authorize } from '../middlewares/authMiddleware.js';
import Usuario from '../models/Usuario.js';

const router = express.Router();

// 👇 Apenas admin pode listar todos usuários
router.get('/usuarios', 
    proteger,
    authorize(['admin']),
    async (req, res) => { // 👈 Certifique-se de usar async
        try {
            const usuarios = await Usuario.findAll({
                attributes: ['id', 'nome', 'email', 'role'],
                where: {
                    role: 'user' // 👈 Filtro opcional
                }
            });
            res.json(usuarios); // 👈 Resposta explícita
        } catch (error) {
            res.status(500).json({ erro: error.message }); // 👈 Tratamento de erro
        }
    }
);
// 👇 Promover usuário para admin
router.put('/usuarios/:id/promover', proteger, authorize(['admin']), async (req, res) => {
    await Usuario.update(
        { role: 'admin' },
        { where: { id: req.params.id } }
    );
    res.json({ mensagem: 'Usuário promovido a admin' });
});

export default router;