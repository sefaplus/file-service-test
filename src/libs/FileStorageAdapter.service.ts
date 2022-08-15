import { CONFIG } from '../constants/config';
import { STORAGE_TYPES } from '../constants/enums';
import { LocalStorage } from '../service/localStorageService';
export class FileStorageAdapter {
  static get() {
    try {
      switch (CONFIG.STORAGE.TYPE) {
        case STORAGE_TYPES.LOCAL:
          return new LocalStorage();
        default:
          return new LocalStorage();
      }
    } catch (err) {
      console.log(err);
    }
  }
}
