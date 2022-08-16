import { NextFunction, Request, Response } from 'express';
import { Logger } from 'tslog';
import { childLogger, getResponse } from '../helpers';
import { StorageService } from '../service/StorageService';
import { AnswerStatuses } from '../types';

export class FileController {
  private static readonly log: Logger = childLogger('FileController');

  static async getFile(req: Request, res: Response, next: NextFunction) {
    const { filename } = req.params;
    try {
      const response = await StorageService.getFile(filename);

      if (!response) return res.json(getResponse(AnswerStatuses.ERROR, 'FILE NOT FOUND'));

      /* Writing headers so browser knows it's a file for downloading */
      res.writeHead(200, {
        'Content-Type': response.metadata.mime_type,
        'Content-Length': response.metadata.size,
        'Content-Disposition': `attachment`, // Comment out this line to render the file if possible
      });
      /* Piping ReadStream */
      response.file.pipe(res).on('finish', () => response.file.close());
    } catch (err) {
      FileController.log.error(err);

      next(err);
    }
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
