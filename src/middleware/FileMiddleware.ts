import { NextFunction, Request, Response } from 'express';
import { ALLOWED_FILE_TYPES, CONFIG, MESSAGE, InnerError } from '../constants';

export class FileMiddleware {
  /**
   * Checks recieved binary file for allowed extension, and size. Then writes new Content-Length header size, and sets body as buffer of file
   *   */
  static async validate(req: Request, res: Response, next: NextFunction) {
    try {
      const allowedContentTypes = Object.values(ALLOWED_FILE_TYPES);
      const recievedContentTypes = req.headers['content-type'] as ALLOWED_FILE_TYPES;

      if (!recievedContentTypes) throw new InnerError(MESSAGE.ERROR.HEADER.CONTENT_TYPE_CANNOT_BE_NULL);

      /* If header Content-Type of not allowed extensions, throw err */
      if (!allowedContentTypes.includes(recievedContentTypes))
        throw new InnerError(MESSAGE.ERROR.FILE.EXTENSION_DISALLOWED);

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
          });
      });

      if (buffer.length > CONFIG.STORAGE.MAX_FILE_SIZE_BYTES)
        throw new InnerError(
          `${MESSAGE.ERROR.FILE.SIZE_EXCEEDED} Must be <${CONFIG.STORAGE.MAX_FILE_SIZE_BYTES / 1048576}mb`
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
