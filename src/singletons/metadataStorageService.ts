import { Collection, MongoClient } from 'mongodb';
import { CONFIG } from '../config';
import { ServiceError } from '../constants';
import { FileDataObject } from '../types';

export class metadataStorageSingleton {
  private static mongoClient = new MongoClient(CONFIG.STORAGE.MONGO_ACCESS_URL);
  private static storage: Collection<FileDataObject>;

  public static async getStorage() {
    if (!this.storage) await this.connect();

    return this.storage;
  }

  private static async connect() {
    this.storage = await new Promise((resolve) => {
      this.mongoClient.connect((err, client) => {
        if (err || !client) throw new ServiceError('MongoDB Connection failed.');
        console.log('Connected');
        resolve(client.db('FilesDB').collection('files'));
      });
    });
  }
}
