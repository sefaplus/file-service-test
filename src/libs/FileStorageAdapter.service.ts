import multer from "multer";

export const localUpload = multer({ dest: "tmp/" });
export class FileStorageAdapter {
  static async getFile(filename: string) {
    try {
    } catch (err) {}
  }
  static async saveFile(binary: Buffer, filename: string, metadata: object) {
    try {
    } catch (err) {}
  }
}
