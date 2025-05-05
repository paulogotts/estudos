import { Sequelize } from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

async function runMigrations() {
  const migrations = [
    path.join(__dirname, 'migrations', '20250326202014-add-role-to-usuarios.mjs')
  ];

  for (const migration of migrations) {
    const { up } = await import(migration);
    await up(sequelize.getQueryInterface(), Sequelize);
    console.log(`✅ Migration ${path.basename(migration)} executada`);
  }
}

runMigrations()
  .then(() => console.log('🎉 Todas migrações concluídas!'))
  .catch(console.error);