import fs from 'fs';
import { Logger } from 'tslog';
import { config } from '../../config';
import { InnerError } from '../../errors';
import { childLogger } from '../../helpers';
import { AllowedFileTypes, AllowedFileTypesItem, FileDataObject, FileMetaData } from '../../types';

export class LocalStorageAdapter {
  private readonly log: Logger = childLogger('LocalStorage');

  async getFile(path: string) {
    try {
      return fs.createReadStream(path, { autoClose: true }).on('error', () => {
        throw new InnerError('Error getting file');
      });
    } catch (err) {
      this.log.error(err);
      throw err;
    }
  }

  async saveFile(buffer: Buffer, filename: string, metadata: FileMetaData): Promise<FileDataObject> {
    const { content_type, content_length } = metadata;
    const extension = Object.values(AllowedFileTypes).find(
      (item: AllowedFileTypesItem) => item.uploadedType === content_type
    )?.extenstion;

    try {
      const result = await new Promise((resolve) => {
        const path = `${config.storage.localSavePath}${filename}.${extension}`;
        const writeSteam = fs
          .createWriteStream(path, {
            autoClose: true,
            encoding: 'binary',
          })
          .on('error', () => {
            throw new InnerError('Error saving file');
          });

        writeSteam.write(buffer, () => {
          writeSteam.close();
        });

        writeSteam.on('close', () => {
          resolve({ filename, size: content_length, mime_type: content_type, path, extension } as FileDataObject);
        });
      });

      return result as FileDataObject;
    } catch (err) {
      this.log.error(err);
      throw err;
    }
  }
}
