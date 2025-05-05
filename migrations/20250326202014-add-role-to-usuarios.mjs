// migrations/XXXXXXXX-add-role-to-usuarios.mjs
import bcrypt from 'bcrypt';

export const up = async (queryInterface, Sequelize) => {
  await queryInterface.addColumn('usuarios', 'role', {
    type: Sequelize.ENUM('admin', 'user'),
    defaultValue: 'user',
    allowNull: false
  });

  // Opcional: Definir admin padrão
  const hashedPassword = await bcrypt.hash('senha123', 10);
  await queryInterface.bulkInsert('usuarios', [{
    nome: 'Admin',
    email: 'admin@exemplo.com',
    senha: hashedPassword,
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  }]);
};

export const down = async (queryInterface) => {
  await queryInterface.removeColumn('usuarios', 'role');
  await queryInterface.sequelize.query('DROP TYPE IF EXISTS enum_usuarios_role;');
};