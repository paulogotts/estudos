import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Postagem = sequelize.define("Postagem", {
    titulo: { type: DataTypes.STRING, allowNull: false },
    conteudo: { type: DataTypes.TEXT, allowNull: false },
    usuarioId: { type: DataTypes.INTEGER, allowNull: false }, // Relacionamento com o usuário
}, {
    tableName: 'postagens' // Garantir que a tabela se chame "postagens"
});

export default Postagem;
