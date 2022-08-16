import { Logger } from 'tslog';
import { ErrorMessages, FileStatusMessages, InnerError } from '../constants';
import { childLogger } from '../helpers';
import { FileStorageGetter } from '../libs';
import { metadataStorageSingleton } from '../singletons';
import { FileMetaData } from '../types';

export class StorageService {
  static readonly log: Logger = childLogger('StorageService');

  public static async getFile() {
    return;
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
          { upsert: true }, // If not exists => create
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
