import { Options, Sequelize } from 'sequelize';
import setEnvironment from './setEnvironment.js';

setEnvironment();

const config: Options = {
  dialect: 'mysql',
  database: 'ogoo',
  username: process.env['DB_USER'] as string,
  password: process.env['DB_PASSWORD'] as string,
  host: process.env['DB_HOST'] as string,
  port: parseInt(process.env['DB_PORT'] as string, 10),
};

export default config;

const sequelize = new Sequelize(config);

export { Sequelize, sequelize };
