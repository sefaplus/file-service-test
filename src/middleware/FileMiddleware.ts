import { NextFunction, Request, Response } from 'express';
import { CONFIG } from '../constants/config';
import { ALLOWED_FILE_TYPES } from '../constants/enums';
/**
 * Checks recieved binary file for allowed extension, and size.
 *   */
export function fileMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    /* Array of chunks of data */
    const data: Uint8Array[] = [];
    /* Buffer to return */
    let buffer: Buffer = Buffer.alloc(0);

    /* If header Content-Type not of allowed type, throw error. Actual file extenstion is not checked, but could be implemented by reading magic numbers */
    if (!Object.values(ALLOWED_FILE_TYPES).includes(req.headers['content-type'] as ALLOWED_FILE_TYPES))
      throw new Error('File extension is not allowed');

    req.on('data', function (chunk: Uint8Array) {
      data.push(chunk);
    });

    req.on('end', function () {
      buffer = Buffer.concat(data);
    });

    if (buffer.length < CONFIG.STORAGE.MAX_FILE_SIZE_BYTES)
      throw new Error(`Maximum file size is exceeded. Allowed (<${CONFIG.STORAGE.MAX_FILE_SIZE_BYTES / 1048576}mb)`);
    req.headers['content-length'] = buffer.length.toString();
    req.body = buffer;
    next();
  } catch (err) {
    console.log(err);
    res.send('NOT ALLOWED');
  }
}
