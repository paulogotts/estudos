import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import bcrypt from 'bcrypt';

const Usuario = sequelize.define("Usuario", {
    nome: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    email: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true,
        validate: {
            isEmail: true
        }
    },
    senha: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'usuarios',
    timestamps: true, // Garante createdAt e updatedAt
    underscored: false, // 👈 Isso força camelCase
    createdAt: 'createdAt', // Nome exato da coluna
    updatedAt: 'updatedAt',
    hooks: {
        beforeCreate: async (usuario) => {
            const salt = await bcrypt.genSalt(10);
            usuario.senha = await bcrypt.hash(usuario.senha, salt);
        },
        beforeUpdate: async (usuario) => {
            if (usuario.changed('senha')) {
                const salt = await bcrypt.genSalt(10);
                usuario.senha = await bcrypt.hash(usuario.senha, salt);
            }
        }
    }
});

// Métodos de instância
Usuario.prototype.isAdmin = function() {
    return this.role === 'admin';
};

Usuario.prototype.validarSenha = async function(senha) {
    return await bcrypt.compare(senha, this.senha);
};

// Relacionamentos (devem ser definidos após a criação do modelo)
Usuario.associate = (models) => {
    Usuario.hasMany(models.Postagem, {
        foreignKey: "usuarioId",
        as: "postagens"
    });
    
    Usuario.hasMany(models.Produto, {
        foreignKey: 'usuarioId',
        as: 'produtos'
    });
};

export default Usuario;