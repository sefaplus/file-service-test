import { WithId } from 'mongodb';
import { ErrorMessages, InnerError } from '../constants';
import { metadataStorageSingleton } from '../singletons';
import { FileDataObject } from '../types';

export class MongoFileService {
  static async fileUpdateAndCreateIfNotExist(file: FileDataObject) {
    const mongo = await metadataStorageSingleton.getStorage();

    return await new Promise((resolve) =>
      mongo.findOneAndUpdate(
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
    const mongo = await metadataStorageSingleton.getStorage();

    return await new Promise((resolve) =>
      mongo.findOne({ filename }, (err, response) => {
        if (err) throw new InnerError('Error fetching file from metadata database');

        resolve(response);
      })
    );
  }
}
