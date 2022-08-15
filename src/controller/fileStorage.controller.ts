import { Request, Response } from 'express';
import { FileStorageAdapter } from '../libs';

export class FileStorageController {
  static async getFile(req: Request, res: Response) {
    res.send('answer');
  }

  static async saveFile(req: Request, res: Response) {
    try {
      const storage = FileStorageAdapter.get();
      if (!storage) throw new Error('NO STORAGE FOUND');

      const [content_type, content_length] = [req.headers['content-type'], req.headers['content-length']];
      const { filename } = req.params;

      const response = await storage.saveFile(req.body, filename, { content_type, content_length });

      if (response) res.send('answer');
    } catch (err) {
      console.log(err);
    }
  }
}
