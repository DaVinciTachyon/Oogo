const dotenv = require('dotenv')

dotenv.config()

const config = {
  dialect: 'mysql',
  database: 'ogoo',
  username: process.env['DB_USER'],
  password: process.env['DB_PASSWORD'],
  host: process.env['DB_HOST'],
  port: process.env['DB_PORT'],
}

module.exports = config
