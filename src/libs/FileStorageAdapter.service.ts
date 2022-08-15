import { CONFIG, STORAGE_TYPES } from '../constants';
import { LocalStorage } from '../service/localStorageService';
export class FileStorageAdapter {
  static get() {
    switch (CONFIG.STORAGE.TYPE) {
      case STORAGE_TYPES.LOCAL:
        return new LocalStorage();
      case STORAGE_TYPES.FTP:
        return;
      case STORAGE_TYPES.WS:
        return;
      default:
        return undefined;
    }
  }
}
