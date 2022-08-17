import { Collection } from 'mongodb';
import { config } from '../../config';
import { FileDataObject } from '../../types';
import { MongoDBClient } from './MongoDBClient';

export class MongoDBFileCollection {
  static async getCollection(): Promise<Collection<FileDataObject>> {
    return (await MongoDBClient.getStorage()).db(config.storage.mongoDbName).collection('files');
  }
}
