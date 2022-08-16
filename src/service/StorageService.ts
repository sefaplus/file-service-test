import { WithId } from 'mongodb';
import { Logger } from 'tslog';
import { ErrorMessages, FileStatusMessages, InnerError } from '../constants';
import { childLogger } from '../helpers';
import { FileStorageGetter } from '../libs';
import { metadataStorageSingleton } from '../singletons';
import { FileDataObject, FileMetaData } from '../types';

export class StorageService {
  static readonly log: Logger = childLogger('StorageService');

  public static async getFile(filename: string) {
    const storage = FileStorageGetter.getStorage();
    const mongo = await metadataStorageSingleton.getStorage();

    const fetchedMetadata: WithId<FileDataObject> | null | undefined = await new Promise((resolve) =>
      mongo.findOne({ filename }, (err, response) => {
        if (err) throw new InnerError('Error fetching file from metadata database');

        resolve(response);
      })
    );
    if (!fetchedMetadata) return undefined;

    const file = await storage.getFile(fetchedMetadata.path);

    return { file, metadata: fetchedMetadata };
  }
  public static async saveFile(buffer: Buffer, filename: string, metadata: FileMetaData) {
    try {
      const storage = FileStorageGetter.getStorage();
      const mongo = await metadataStorageSingleton.getStorage();

      this.log.info(FileStatusMessages.FILE_RECIEVED);

      const result = await storage.saveFile(buffer, filename, metadata);

      /* Saving metadata in MongoDb with a promise */
      const response = await new Promise((resolve) =>
        mongo.findOneAndUpdate(
          { filename: result.filename }, // Filter
          { $set: result }, // New metadata
          { upsert: true, returnDocument: 'after' }, // If not exists => create
          (err, response) => {
            if (err || !response) throw new InnerError(ErrorMessages.FILE.ERROR_SAVING_METADATA);

            this.log.info(FileStatusMessages.FILE_UPLOADED);

            resolve(response.value);
          }
        )
      );

      return response;
    } catch (err) {
      this.log.error(err);
      throw err;
    }
  }
}
