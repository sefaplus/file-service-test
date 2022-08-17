import { NextFunction, Request, Response } from 'express';
import { Logger } from 'tslog';
import { config } from '../config';
import { ErrorMessages } from '../constants';
import { InnerError } from '../errors';
import { childLogger } from '../helpers';
import { AllowedFileTypes } from '../types';

export class FileMiddleware {
  static readonly log: Logger = childLogger('ServerLog');
  /**
   * Checks recieved binary file for allowed extension, and size. Then writes new Content-Length header size, and sets body as buffer of file
   *   */
  static async validateHeaders(req: Request, res: Response, next: NextFunction) {
    try {
      const allowedContentTypes = Object.values(AllowedFileTypes);
      const recievedContentTypes = req.headers['content-type'] as AllowedFileTypes;

      if (!recievedContentTypes) throw new InnerError(ErrorMessages.HEADER.CONTENT_TYPE_CANNOT_BE_NULL);

      /* If header Content-Type of not allowed extensions, throw err */
      if (!allowedContentTypes.includes(recievedContentTypes))
        throw new InnerError(ErrorMessages.FILE.EXTENSION_DISALLOWED);

      next();
    } catch (err) {
      FileMiddleware.log.warn(err);
      return next(err);
    }
  }
  static async supplyRequestWithFile(req: Request, res: Response, next: NextFunction) {
    try {
      /* Array of chunks of data */
      const data: Uint8Array[] = [];
      /* File buffer */
      const buffer: Buffer = await new Promise((resolve) => {
        req
          .on('data', function (chunk: Uint8Array) {
            data.push(chunk);
          })
          .on('end', function () {
            const buffer = Buffer.concat(data);

            resolve(buffer);
            return buffer;
          })
          .on('error', function (err) {
            throw new InnerError(`${ErrorMessages.FILE.ERROR_UPLOADING_FILE}. ${err}`);
          });
      });

      /* Writing new content-length size, to avoid confusion */
      req.headers['content-length'] = buffer.length.toString();
      /* Writing buffer to body */
      req.body = buffer;
      next();
    } catch (err) {
      FileMiddleware.log.warn(err);
      return next(err);
    }
  }

  static async validateFile(req: Request, res: Response, next: NextFunction) {
    try {
      const buffer = req.body;
      const mbInBytes = 1048576;
      if (buffer.length > config.storage.maxFileSizeBytes || !buffer.length)
        throw new InnerError(
          `${ErrorMessages.FILE.SIZE_REQUIREMENT_FAILED} Must be >0b and  <${Math.round(
            config.storage.maxFileSizeBytes / mbInBytes
          )}mb `
        );
    } catch (err) {
      FileMiddleware.log.warn(err);
      return next(err);
    }
  }
}
