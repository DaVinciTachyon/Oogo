import setEnvironment from './setEnvironment.js';

setEnvironment();

export interface ServerConfig {
  port: number;
  path: string;
  secretPhrase: string;
}

const config: ServerConfig = {
  port: 8080,
  path: '/api',
  secretPhrase: process.env['SECRET_PHRASE'] as string
};

export default config;
