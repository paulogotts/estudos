export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("Postagens", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    titulo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    conteudo: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    usuarioId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "usuarios", // Certifique-se de que o nome está correto
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable("Postagens");
}
