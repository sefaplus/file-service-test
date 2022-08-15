import { NextFunction, Request, Response } from 'express';
import { Logger } from 'tslog';
import { AnswerStatuses, InnerError, MESSAGE } from '../constants';
import { answerMsg, childLogger } from '../helpers';
import { FileStorageAdapter } from '../libs';

export class FileStorageController {
  private static readonly log: Logger = childLogger('FileStorageController');

  static async getFile(req: Request, res: Response) {
    res.send('answer');
  }

  static async saveFile(req: Request, res: Response, next: NextFunction) {
    try {
      const storage = FileStorageAdapter.get();

      if (!storage) throw new InnerError(MESSAGE.ERROR.STORAGE.NOT_FOUND);

      /* Forcing types because these were checked and provided in file validator */
      const [content_type, content_length] = [
        req.headers['content-type'] as string,
        req.headers['content-length'] as string,
      ];

      const { filename } = req.params;

      this.log.info(MESSAGE.STATUS.FILE.FILE_RECIEVED);

      const response = await storage.saveFile(req.body, filename, { content_type, content_length });

      if (!response) throw new InnerError(MESSAGE.ERROR.FILE.ERROR_UPLOADING_FILE);

      this.log.info(MESSAGE.STATUS.FILE.FILE_UPLOADED);

      res.json(answerMsg(AnswerStatuses.SUCCESS, { uploaded: response }));
    } catch (err) {
      this.log.error(err);

      next(err);
    }
  }
}
