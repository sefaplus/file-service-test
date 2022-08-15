import express, { Application } from 'express';
import { CONFIG } from './constants/config';
import { fileStorageRouter } from './routers/fileStorage.router';
export default class Server {
  private static app: Application;

  private static initServer() {
    Server.app = express();
    Server.settings();
    Server.applyRouters();
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
    // Server.app.use(
    //   formData.parse({
    //     uploadDir: "./tmp",
    //     autoClean: true,
    //   })
    // );
    // Server.app.use(formData.format());
    // Server.app.use(formData.union());
  }

  static applyRouters() {
    Server.app.use(
      '/files',
      //   bodyParser.raw({ type: "application/octet-stream", limit: "2mb" }),
      fileStorageRouter
    );
  }
}
