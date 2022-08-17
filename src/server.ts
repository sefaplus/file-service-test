import express, { Application } from 'express';
import { Logger } from 'tslog';
import { config } from './config';
import { childLogger } from './helpers';
import { MongoDBClient } from './libs/MongoDB/MongoDBClient';
import { ErrorHandler } from './middlewares';
import { fileRouter } from './routers';

export default class Server {
  private static readonly log: Logger = childLogger('ServerLog');
  public static app: Application;

  private static initServer() {
    Server.app = express();
    Server.settings();
    Server.applyRouters();
    Server.applyErrorHandler();
  }

  public static async startApp() {
    try {
      await MongoDBClient.getStorage();
      Server.initServer();
      Server.app.listen(config.server.port, () => {
        this.log.info(`Server started at ${config.server.port}`);
      });
    } catch (err) {
      this.log.error(err);
      process.exit(1);
    }
  }

  private static settings() {
    Server.app.use(express.urlencoded({ extended: true }));
    Server.app.use(express.json());
  }

  static applyRouters() {
    Server.app.use('/files', fileRouter);
    /* Simple interface for testing */
    Server.app.use('/', (req, res) => res.sendFile('./pages/index.html', { root: __dirname }));
  }
  static applyErrorHandler() {
    Server.app.use(ErrorHandler.globalErrorHandler);
  }
}
