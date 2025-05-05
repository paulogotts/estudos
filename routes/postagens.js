import express from "express";
import Postagem from "../models/Postagem.js";
import Usuario from "../models/Usuario.js";
import { proteger, authorize } from '../middlewares/authMiddleware.js'

const router = express.Router();

// 🔹 Criar uma postagem vinculada a um usuário
router.post("/", async (req, res) => {
    try {
        const { titulo, conteudo, usuarioId } = req.body;

        const usuario = await Usuario.findByPk(usuarioId);
        if (!usuario) {
            return res.status(404).json({ erro: "Usuário não encontrado!" });
        }

        const postagem = await Postagem.create({ titulo, conteudo, usuarioId });
        res.status(201).json(postagem);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao criar postagem" });
    }
});

// 🔹 Listar todas as postagens com informações do usuário
router.get("/", async (req, res) => {
    try {
        const postagens = await Postagem.findAll({ include: Usuario });
        res.json(postagens);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar postagens" });
    }
});

export default router;
