import { WithId } from 'mongodb';
import { ErrorMessages } from '../constants';
import { InnerError } from '../errors';
import { MongoDBFileCollection } from '../libs/';
import { FileDataObject } from '../types';

export class MongoFileService {
  static async fileUpdateAndCreateIfNotExist(file: FileDataObject) {
    try {
      const collection = await MongoDBFileCollection.getCollection();

      const response = await collection.findOneAndUpdate(
        { filename: file.filename }, // Filter
        { $set: file }, // New metadata
        { upsert: true, returnDocument: 'after' } // Create if not exist; return document state after action
      );

      return response.value;
    } catch (err) {
      throw new InnerError(ErrorMessages.FILE.ERROR_SAVING_METADATA);
    }
  }

  static async fileFindOne(filename: string): Promise<WithId<FileDataObject>> {
    try {
      const collection = await MongoDBFileCollection.getCollection();
      const response = await collection.findOne({ filename });

      if (!response) throw new InnerError(ErrorMessages.STORAGE.ERROR_FETCHING_FILE);

      return response;
    } catch (err) {
      throw new InnerError(ErrorMessages.STORAGE.ERROR_FETCHING_FILE);
    }
  }
}
