import { Collection, MongoClient } from 'mongodb';
import { Logger } from 'tslog';
import { config } from '../config';
import { ErrorMessages } from '../constants';
import { ServiceError } from '../errors';
import { childLogger } from '../helpers';
import { FileDataObject } from '../types';

const log: Logger = childLogger('Metadata Storage');

export class metadataStorageSingleton {
  private static mongoClient = new MongoClient(config.storage.mongoAccessUrl);
  private static storage: Collection<FileDataObject>;

  public static async getStorage() {
    if (!this.storage) await this.connect();

    return this.storage;
  }

  private static async connect() {
    this.storage = await new Promise((resolve) => {
      this.mongoClient.connect((err, client) => {
        if (err || !client) throw new ServiceError(ErrorMessages.STORAGE.MD_CONN_FAILED);
        log.info('Connected to Metadata storage.');
        resolve(client.db(config.storage.mongoDbName).collection('files'));
      });
    });
  }
}
