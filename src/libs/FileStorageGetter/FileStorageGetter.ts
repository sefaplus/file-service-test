import { Logger } from 'tslog';
import { config } from '../../config';
import { ErrorMessages } from '../../constants';
import { InnerError } from '../../errors';
import { childLogger } from '../../helpers';
import { StorageTypes } from '../../types';
import { LocalStorage } from '../';

export class FileStorageGetter {
  private static readonly log: Logger = childLogger('FileStorageGetter');

  static getStorage() {
    try {
      let storage_type;

      switch (config.storage.type) {
        case StorageTypes.LOCAL:
          storage_type = new LocalStorage();
          break;
        case StorageTypes.FTP:
          storage_type = undefined;
          break;
        case StorageTypes.WEBSOCKET:
          storage_type = undefined;
          break;
        default:
          storage_type = undefined;
          break;
      }

      if (!storage_type) throw new InnerError(ErrorMessages.STORAGE.NOT_FOUND);

      return storage_type;
    } catch (err) {
      this.log.error(err);
      throw err;
    }
  }
}
