import fs from 'fs';
import { Logger } from 'tslog';
import { childLogger } from '../helpers';
import { FileMetaData } from '../types/types';
export class LocalStorage {
  private static readonly log: Logger = childLogger('LocalStorage');

  async saveFile(buffer: Buffer, filename: string, metadata: FileMetaData) {
    const { content_type, content_length } = metadata;
    const ext = content_type.split('/')[1];
    try {
      fs.createWriteStream(`tmp/${filename}.${ext}`, {
        autoClose: true,
        encoding: 'binary',
      }).write(buffer);

      return true;
    } catch (err) {
      console.log(err);
    }
  }
}
