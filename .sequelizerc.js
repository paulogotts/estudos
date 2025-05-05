import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  config: path.resolve(__dirname, 'config', 'config.js'),
  'models-path': path.resolve(__dirname, 'models'),
  'migrations-path': path.resolve(__dirname, 'migrations'),
  'seeders-path': path.resolve(__dirname, 'seeders')
};