import { Collection } from 'mongodb';
import { config } from '../../config';
import { FileDataObject } from '../../types';
import { MongoDBClient } from './MongoClient';

export class MongoFileCollection {
  static async getCollection(): Promise<Collection<FileDataObject>> {
    return (await MongoDBClient.getStorage()).db(config.storage.mongoDbName).collection('files');
  }
}
