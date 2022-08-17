import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import { config } from '../config';
import { FileStorageGetter } from '../libs';
import { FileMiddleware } from '../middlewares';
import Server from '../server';
import { FileDataObject } from '../types';
/* Test constants, must correspond to the file being tested */
const testConstants = {
  extension: 'png', // Extension of a file to be used for testing
  content_type: 'image/png', // Mime type of the file to be used for testing
  content_length: '14338', // Size in bytes of the file to be tested
};

const testFilePath = `${__dirname}/mockFiles/file.${testConstants.extension}`; // Path to test file
describe('Middleware', () => {
  test('FileMiddleware: \n', async () => {
    /* Mock request containing required fields for testing */
    const mockRequest = {
      headers: {
        'content-type': testConstants.content_type, // Header to be checked in validateHeaders
      },
      body: fs.readFileSync(testFilePath), // A Buffer read from file, to be checked in validateFile
    } as Request;

    const mockResponse = {} as Response;

    /* Testing headers that passes thru and not throwing error */
    await FileMiddleware.validateHeaders(mockRequest, mockResponse, ((err) => {
      if (err) throw err;
    }) as NextFunction);

    /* Testing validate file that it works correctly and not throwing error */
    await FileMiddleware.validateFile(mockRequest, mockResponse, ((err) => {
      if (err) throw err;
    }) as NextFunction);
  });
});
describe('Storage adapter', () => {
  test('getFile \n', () => {
    const storage = FileStorageGetter.getStorage();

    return storage.getFile(testFilePath).then((data) => {
      expect(data).toBeInstanceOf(fs.ReadStream);
    });
  });

  test('saveFile\n', () => {
    const storage = FileStorageGetter.getStorage();
    const filename = 'otjYQU1lDdCjONSvTUGmuuUUacpTEooF';
    const file = fs.readFileSync(`${__dirname}/mockFiles/file.${testConstants.extension}`);
    const metadata = { content_type: testConstants.content_type, content_length: testConstants.content_length };

    return storage.saveFile(file, filename, metadata).then((data) => {
      /* Checking that all of the data properties are not null or undefined */
      Object.keys(data).map((key) => {
        if (!data[key as keyof FileDataObject])
          throw new Error(`${key} of response from storage.saveFile() was null or undefined, which shouldn't happen `);
      });

      /* Expected uploaded file path */
      const expectedPath = `${Server.rootFolder.substring(0, Server.rootFolder.length - 4)}/${
        config.storage.localSavePath
      }${filename}.${testConstants.extension}`;

      /* Check file exists */
      if (!fs.existsSync(expectedPath))
        throw new Error(`File did not save at the expected location of ${expectedPath}`);

      /* Delete file after */
      fs.unlinkSync(expectedPath);

      /* If data.filename is of type string */
      expect(typeof data.filename === 'string').toBeTruthy();
      /* If parsed data.size of type number */
      expect(typeof parseInt(data.size) === 'number').toBeTruthy();
      /* If data.mime_type split bigger than 0 and less than 2.
         I.e. application/json => [application, json] is bigger
         than 0 and less than 2 */
      expect(() => {
        const mimeTypeLen = data.mime_type.split('/').length;
        return mimeTypeLen > 0 && mimeTypeLen < 2;
      }).toBeTruthy();
      /* data.path is of type string */
      expect(typeof data.path === 'string').toBeTruthy();
    });
  });
});
