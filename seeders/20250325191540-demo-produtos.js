module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Produtos', [
      { nome: "Notebook", preco: 3500.00, estoque: 10, createdAt: new Date(), updatedAt: new Date() },
      { nome: "Mouse", preco: 50.50, estoque: 100, createdAt: new Date(), updatedAt: new Date() }
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Produtos', null, {});
  }
};