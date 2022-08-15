import express, { Application } from 'express';
import { CONFIG } from './constants/config';
import { globalErrorHandler } from './middleware/globalErrorHandler';
import { fileStorageRouter } from './routers/fileStorage.router';
export default class Server {
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
      console.log('SERVER STARTED');
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
    Server.app.use(globalErrorHandler);
  }
}
