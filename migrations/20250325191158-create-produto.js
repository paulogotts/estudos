export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Produtos', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      nome: { type: Sequelize.STRING, allowNull: false },
      preco: { type: Sequelize.FLOAT, allowNull: false },
      estoque: { type: Sequelize.INTEGER, defaultValue: 0 },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Produtos');
  }
};