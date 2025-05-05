import express from "express";
import Usuario from "../models/Usuario.js";
import { Op } from 'sequelize'; // Importe o operador do Sequelize
import { proteger, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// ✅ Rota para listar usuários
router.get('/', 
    proteger, 
    authorize(['admin']),
            async (req, res) => {
    try {
        // Parâmetros de paginação
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
                
        // Parâmetros de filtro (opcionais)
        const { nome, email } = req.query;

        // Configurar condições de filtro
        const where = {};
        if (nome) {
            where.nome = { [Op.like]: `%${nome}%` }; // Busca parcial (ex: "Ana" encontra "Ana Silva")
        }
        if (email) {
            where.email = { [Op.eq]: email }; // Busca exata
        }

        const { dataInicio, dataFim } = req.query;
            if (dataInicio && dataFim) {
                where.createdAt = { 
                [Op.between]: [new Date(dataInicio), new Date(dataFim)]
            };
        }

        // Consulta com paginação + filtros
        const { count, rows: usuarios } = await Usuario.findAndCountAll({
            where,
            offset,
            limit,
            order: [['nome', 'ASC']] // Ordenar por nome (opcional)
        });

        res.json({
            total: count,
            pagina: page,
            porPagina: limit,
            usuarios
        });

        attributes: { exclude: ['senha'] } // Adicione isso à consulta

    } catch (error) {
        console.error("❌ Erro ao buscar usuários:", error);
        res.status(500).json({ erro: "Erro ao buscar usuários" });
    }
});

// ✅ Rota para criar um novo usuário
router.post("/", async (req, res) => {
    try {
        console.log("📌 Recebendo dados do body:", req.body);
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            console.warn("⚠️ Campos obrigatórios não preenchidos!");
            return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
        }

        const novoUsuario = await Usuario.create({ nome, email, senha });
        console.log("✅ Usuário criado com sucesso:", novoUsuario);
        res.status(201).json(novoUsuario);
    } catch (error) {
        console.error("❌ Erro ao cadastrar usuário:", error);
        res.status(500).json({ erro: "Erro ao cadastrar usuário" });
    }
});

// ✅ Rota para atualizar um usuário
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;

    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ erro: "Usuário não encontrado!" });
        }

        usuario.nome = nome;
        usuario.email = email;
        usuario.senha = senha;
        await usuario.save();

        res.json({ mensagem: "Usuário atualizado com sucesso!" });
    } catch (error) {
        console.error("❌ Erro detalhado:", error);
        res.status(500).json({ erro: "Erro ao atualizar usuário" });
    }
});

// ✅ Rota para excluir um usuário
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ erro: "Usuário não encontrado!" });
        }

        await usuario.destroy();
        res.json({ mensagem: "Usuário excluído com sucesso!" });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao excluir usuário" });
    }
});

export default router;
