import sequelize from '../config/db.js';

async function addRoleColumn() {
  try {
    await sequelize.query(`
      ALTER TABLE usuarios 
      ADD COLUMN role ENUM('admin', 'user') NOT NULL DEFAULT 'user'
    `);
    console.log('✅ Coluna "role" adicionada com sucesso!');
  } catch (error) {
    console.error('❌ Erro na migração:', error.message);
  } finally {
    await sequelize.close();
  }
}

addRoleColumn();