import { NextFunction, Request, Response } from 'express';
import { Logger } from 'tslog';
import { ErrorMessages, FileStatusMessages, InnerError } from '../constants';
import { childLogger, getResponse } from '../helpers';
import { FileStorageAdapter } from '../libs';
import { AnswerStatuses } from '../types';

export class FileController {
  private static readonly log: Logger = childLogger('FileController');

  static async getFile(req: Request, res: Response) {
    res.send('answer');
  }

  static async saveFile(req: Request, res: Response, next: NextFunction) {
    try {
      const storage = FileStorageAdapter.getStorage();

      /* Forcing types because these were checked and provided in file validator */
      const [content_type, content_length] = [
        req.headers['content-type'] as string,
        req.headers['content-length'] as string,
      ];

      const { filename } = req.params;
      FileController.log.info(FileStatusMessages.FILE_RECIEVED);

      const response = await storage.saveFile(req.body, filename, { content_type, content_length });

      if (!response) throw new InnerError(ErrorMessages.FILE.ERROR_UPLOADING_FILE);

      FileController.log.info(FileStatusMessages.FILE_UPLOADED);

      res.json(getResponse(AnswerStatuses.SUCCESS, { uploaded: response }));
    } catch (err) {
      FileController.log.error(err);

      next(err);
    }
  }
}
