import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Produto = sequelize.define('Produto', {
  nome: { type: DataTypes.STRING, allowNull: false },
  preco: { type: DataTypes.FLOAT, allowNull: false },
  descricao: { type: DataTypes.TEXT, allowNull: true },
  usuarioId: { type: DataTypes.INTEGER, allowNull: true }
}, {
  tableName: 'Produtos'
});

// Relacionamento: Um Produto pertence a um Usuário
Produto.associate = (models) => {
  Produto.belongsTo(models.Usuario, {
    foreignKey: 'usuarioId',
    as: 'usuario'
  });
};

export default Produto;