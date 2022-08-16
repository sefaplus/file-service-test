import fs from 'fs';
import { Logger } from 'tslog';
import { CONFIG } from '../config';
import { childLogger } from '../helpers';
import { FileDataObject, FileMetaData } from '../types';

export class LocalStorage {
  private readonly log: Logger = childLogger('LocalStorage');

  async saveFile(buffer: Buffer, filename: string, metadata: FileMetaData) {
    const { content_type, content_length } = metadata;
    const ext = content_type.split('/')[1];

    try {
      const result = await new Promise((resolve) => {
        const path = `${CONFIG.STORAGE.LOCAL_SAVE_PATH}${filename}.${ext}`;
        const writeSteam = fs.createWriteStream(path, {
          autoClose: true,
          encoding: 'binary',
        });

        writeSteam.write(buffer, () => {
          writeSteam.close();
        });

        writeSteam.on('close', () => {
          resolve({ filename, size: content_length, mime_type: content_type, path } as FileDataObject);
        });
      });

      return result;
    } catch (err) {
      this.log.error(err);
      throw err;
    }
  }
}
