export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Produtos', 'descricao', {
      type: Sequelize.TEXT, // Tipo TEXT para textos longos
      allowNull: true, // Pode ser opcional
      defaultValue: null // Valor padrão
    });

    // Adicione também a chave estrangeira para o relacionamento
    await queryInterface.addColumn('Produtos', 'usuarioId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Usuarios', // Nome da tabela no banco
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('Produtos', 'descricao');
    await queryInterface.removeColumn('Produtos', 'usuarioId');
  }
};