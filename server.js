import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import usuarioRoutes from "./routes/usuarios.js";
import postagemRoutes from "./routes/postagens.js";
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/admin.js';
import produtoRoutes from './routes/produtoRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use("/postagens", postagemRoutes);
app.use("/usuarios", usuarioRoutes);
app.use('/produtos', produtoRoutes);
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);

app.use((req, res, next) => {
    req.setTimeout(5000, () => {
        res.status(408).json({ erro: 'Timeout' });
    });
    next();
});

// Sincronizar o banco de dados
(async () => {
    try {
        await sequelize.sync({ force: false }); // force: false para não apagar tabelas existentes
        console.log("✅ Banco de dados sincronizado!");
    } catch (error) {
        console.error("❌ Erro ao sincronizar o banco:", error);
    }
})();

// Iniciar servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
