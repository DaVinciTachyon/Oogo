import express, { json } from 'express';
import cors from 'cors';
import router from './controllers/router.js';
import config from './configurations/server.js';
import {
  exceptionHandler,
  notFoundHandler,
} from './services/ExceptionService.js';

const app = express();

app.use(cors());
app.use(json());

app.use(config.path, router);

app.use(exceptionHandler);
app.use(notFoundHandler);

export default function startServer() {
  app.listen(config.port, () => console.info('Server is listening'));
}

startServer();
