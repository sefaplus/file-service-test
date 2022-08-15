import fs from 'fs';
export class LocalStorage {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async saveFile(buffer: Buffer, filename: string, metadata: object) {
    try {
      fs.createWriteStream(`tmp/${filename}.jpeg`, { autoClose: true, encoding: 'binary' }).write(buffer);
      return true;
    } catch (err) {
      console.log(err);
    }
  }
}
