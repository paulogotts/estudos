import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  dialect: 'mysql',
  define: {
    timestamps: true,
    underscored: true
  }
});

// Teste a conexão
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco estabelecida!');
  } catch (error) {
    console.error('❌ Erro na conexão:', error);
  }
})();

export default sequelize;