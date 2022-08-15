import { NextFunction, Request, Response } from 'express';
import { InnerError } from '../constants';
import { CONFIG } from '../constants/config';
import { ALLOWED_FILE_TYPES } from '../constants/enums';
import { ERROR_MESSAGE } from '../constants/errorMessages';
/**
 * Checks recieved binary file for allowed extension, and size. Then writes new Content-Length header size, and sets body as buffer of file
 *   */
export async function fileMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const allowedExtensions = Object.values(ALLOWED_FILE_TYPES);
    const recievedExtension = req.headers['content-type'] as ALLOWED_FILE_TYPES;

    /* If header Content-Type of not allowed extensions, throw err */
    if (!allowedExtensions.includes(recievedExtension)) throw new InnerError(ERROR_MESSAGE.EXTENSION_DISALLOWED);

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
      throw new InnerError(`${ERROR_MESSAGE.SIZE_EXCEEDED} Must be <${CONFIG.STORAGE.MAX_FILE_SIZE_BYTES / 1048576}mb`);

    /* Writing new content-length size, to avoid confusion */
    req.headers['content-length'] = buffer.length.toString();
    /* Writing buffer to body */
    req.body = buffer;
    next();
  } catch (err) {
    return next(err);
  }
}
