import { Logger } from 'tslog';
import { ErrorMessages, FileStatusMessages } from '../constants';
import { InnerError } from '../errors';
import { childLogger } from '../helpers';
import { FileStorageGetter } from '../libs';
import { FileMetaData } from '../types';
import { MongoFileService } from './mongoFileService';

export class StorageService {
  static readonly log: Logger = childLogger('StorageService');

  public static async getFile(filename: string) {
    const storage = FileStorageGetter.getStorage();

    const fetchedMetadata = await MongoFileService.fileFindOne(filename);
    if (!fetchedMetadata) throw new InnerError(ErrorMessages.FILE.NOT_FOUND);

    const file = await storage.getFile(fetchedMetadata.path);
    if (!file) throw new InnerError(ErrorMessages.FILE.NOT_FOUND);

    return { file, metadata: fetchedMetadata };
  }

  public static async saveFile(buffer: Buffer, filename: string, metadata: FileMetaData) {
    try {
      const storage = FileStorageGetter.getStorage();

      this.log.info(`${FileStatusMessages.FILE_RECIEVED} {${filename}}`);

      /* File saved to local drive result, returns FileDataObject, containing required metadata for mongoDb*/
      const result = await storage.saveFile(buffer, filename, metadata);
      /* Saving metadata in mongodb */
      const response = await MongoFileService.fileUpdateAndCreateIfNotExist(result);

      this.log.info(`${FileStatusMessages.FILE_UPLOADED} {${filename}}`);
      return response;
    } catch (err) {
      this.log.error(err);
      throw err;
    }
  }
}
