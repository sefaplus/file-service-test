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
    try {
      if (!this.client) await this.connect();

      return this.client;
    } catch (err) {
      throw new ServiceError(ErrorMessages.STORAGE.MD_CONN_FAILED);
    }
  }

  private static async connect() {
    try {
      this.client = await this.mongoClient.connect();
      log.info('Connected to Metadata storage.');
    } catch (err) {
      log.error(err);
      throw new ServiceError(ErrorMessages.STORAGE.MD_CONN_FAILED);
    }
  }
}
