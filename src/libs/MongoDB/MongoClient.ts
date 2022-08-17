import { MongoClient } from 'mongodb';
import { Logger } from 'tslog';
import { config } from '../../config';
import { ErrorMessages } from '../../constants';
import { ServiceError } from '../../errors';
import { childLogger } from '../../helpers';

const log: Logger = childLogger('Mongo Client');

export class MongoDBClient {
  private static mongoClient = new MongoClient(config.storage.mongoAccessUrl);
  private static client: MongoClient;

  public static async getStorage() {
    if (!this.client) await this.connect();

    return this.client;
  }

  private static async connect() {
    this.client = await new Promise((resolve) => {
      this.mongoClient.connect((err, client) => {
        if (err || !client) throw new ServiceError(ErrorMessages.STORAGE.MD_CONN_FAILED);
        log.info('Connected to Metadata storage.');
        resolve(client);
      });
    });
  }
}
