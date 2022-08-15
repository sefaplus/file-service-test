import express, { Application } from 'express';
import { Logger } from 'tslog';
import { CONFIG } from './constants/config';
import { childLogger } from './helpers';
import { ErrorHandler } from './middleware/';
import { fileStorageRouter } from './routers/fileStorage.router';
export default class Server {
  private static readonly log: Logger = childLogger('FileStorageController');
  private static app: Application;

  private static initServer() {
    Server.app = express();
    Server.settings();
    Server.applyRouters();
    Server.applyErrorHandler();
  }

  public static async startApp() {
    Server.initServer();
    Server.app.listen(CONFIG.SERVER.PORT, () => {
      this.log.info(`Server started at ${CONFIG.SERVER.PORT}`);
    });
  }

  private static settings() {
    Server.app.use(express.urlencoded({ extended: true }));
    Server.app.use(express.json());
  }

  static applyRouters() {
    Server.app.use('/files', fileStorageRouter);
  }
  static applyErrorHandler() {
    Server.app.use(ErrorHandler.globalErrorHandler);
  }
}
