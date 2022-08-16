import { NextFunction, Request, Response } from 'express';
import { Logger } from 'tslog';
import { childLogger, getResponse } from '../helpers';
import { StorageService } from '../service/StorageService';
import { AnswerStatuses } from '../types';

export class FileController {
  private static readonly log: Logger = childLogger('FileController');

  static async getFile(req: Request, res: Response) {
    res.send('answer');
  }

  static async saveFile(req: Request, res: Response, next: NextFunction) {
    try {
      /* Forcing types because these were checked and provided in file validator */
      const [content_type, content_length] = [
        req.headers['content-type'] as string,
        req.headers['content-length'] as string,
      ];
      const { filename } = req.params;

      const response = await StorageService.saveFile(req.body, filename, { content_type, content_length });

      res.json(getResponse(AnswerStatuses.SUCCESS, { uploaded: response }));
    } catch (err) {
      FileController.log.error(err);

      next(err);
    }
  }
}
