import { NextFunction, Request, Response } from 'express';
import { config } from '../config';
import { ErrorMessages } from '../constants';
import { InnerError } from '../errors';
import { AllowedFileTypes } from '../types';

export class FileMiddleware {
  /**
   * Checks recieved binary file for allowed extension, and size. Then writes new Content-Length header size, and sets body as buffer of file
   *   */
  static async validate(req: Request, res: Response, next: NextFunction) {
    try {
      const allowedContentTypes = Object.values(AllowedFileTypes);
      const recievedContentTypes = req.headers['content-type'] as AllowedFileTypes;

      if (!recievedContentTypes) throw new InnerError(ErrorMessages.HEADER.CONTENT_TYPE_CANNOT_BE_NULL);

      /* If header Content-Type of not allowed extensions, throw err */
      if (!allowedContentTypes.includes(recievedContentTypes))
        throw new InnerError(ErrorMessages.FILE.EXTENSION_DISALLOWED);

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

      if (buffer.length > config.storage.maxFileSizeBytes || !buffer.length)
        throw new InnerError(
          `${ErrorMessages.FILE.SIZE_REQUIREMENT_FAILED} Must be >0b and  <${Math.round(
            config.storage.maxFileSizeBytes / 1048576
          )}mb `
        );

      /* Writing new content-length size, to avoid confusion */
      req.headers['content-length'] = buffer.length.toString();
      /* Writing buffer to body */
      req.body = buffer;
      next();
    } catch (err) {
      return next(err);
    }
  }
}
