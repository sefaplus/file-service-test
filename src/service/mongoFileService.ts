import { WithId } from 'mongodb';
import { ErrorMessages } from '../constants';
import { InnerError } from '../errors';
import { MongoFileCollection } from '../libs/MongoDB/MongoFileCollection';
import { FileDataObject } from '../types';

export class MongoFileService {
  static async fileUpdateAndCreateIfNotExist(file: FileDataObject) {
    const collection = await MongoFileCollection.getCollection();

    return await new Promise((resolve) =>
      collection.findOneAndUpdate(
        { filename: file.filename }, // Filter
        { $set: file }, // New metadata
        { upsert: true, returnDocument: 'after' }, // If not exists => create
        (err, response) => {
          if (err || !response) throw new InnerError(ErrorMessages.FILE.ERROR_SAVING_METADATA);

          resolve(response.value);
        }
      )
    );
  }

  static async fileFindOne(filename: string): Promise<WithId<FileDataObject> | null | undefined> {
    const collection = await MongoFileCollection.getCollection();

    return await new Promise((resolve) =>
      collection.findOne({ filename }, (err, response) => {
        if (err) throw new InnerError('Error fetching file from metadata database');

        resolve(response);
      })
    );
  }
}
