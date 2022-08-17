import express, { Application } from 'express';
import { Logger } from 'tslog';
import { config } from './config';
import { childLogger } from './helpers';
import { ErrorHandler } from './middlewares';
import { fileRouter } from './routers/fileStorage.router';
import { metadataStorageSingleton } from './singletons';

export default class Server {
  private static readonly log: Logger = childLogger('ServerLog');
  private static app: Application;

  private static initServer() {
    Server.app = express();
    Server.settings();
    Server.applyRouters();
    Server.applyErrorHandler();
  }

  public static async startApp() {
    Server.initServer();
    Server.app.listen(config.server.port, () => {
      this.log.info(`Server started at ${config.server.port}`);
    });
    metadataStorageSingleton.getStorage(); // Initiate MongoDB connection
  }

  private static settings() {
    Server.app.use(express.urlencoded({ extended: true }));
    Server.app.use(express.json());
  }

  static applyRouters() {
    Server.app.use('/files', fileRouter);
  }
  static applyErrorHandler() {
    Server.app.use(ErrorHandler.globalErrorHandler);
  }
}
