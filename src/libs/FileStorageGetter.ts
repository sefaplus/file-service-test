import { Logger } from 'tslog';
import { CONFIG, ErrorMessages, InnerError } from '../constants';
import { childLogger } from '../helpers';
import { LocalStorage } from '../service/localStorageService';
import { StorageTypes } from '../types';

export class FileStorageGetter {
  private static readonly log: Logger = childLogger('FileStorageGetter');

  static getStorage() {
    try {
      let storage_type;

      switch (CONFIG.STORAGE.TYPE) {
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
