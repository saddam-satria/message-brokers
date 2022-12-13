import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './app/routes/api';
import { BASE_ASSET, BASE_URL, PORT } from './app/config/utils/constant';
import helpers from './app/config/helpers';
import { logging } from './app/middlewares/logging';
import { connection } from './app/rabbitmq/connection';

(() => {
  dotenv.config();
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(logging);
  app.use('/assets', express.static(BASE_ASSET));
  app.use('/api', apiRoutes);

  app.listen(PORT, async () => {
    try {
      helpers.logger.server.setLog(
        'info',
        `server started on ${BASE_URL}`,
        'success'
      );
      const rabbitConnection = await connection();
      rabbitConnection.on('error', (error) => {
        console.error(error);
      });
    } catch (error) {
      helpers.logger.server.setLog('info', `${error.message}`, 'error');
    }
  });

  helpers.logger.server.getLog();
  helpers.logger.database.getLog();
})();
