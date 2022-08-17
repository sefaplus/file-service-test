import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import { config } from '../config';
import { ErrorMessages } from '../constants';
import { InnerError } from '../errors';
import { FileMiddleware } from '../middlewares';
import { fileProperties, testFilePath } from './mocks/constants';

describe('Middleware', () => {
  describe('validateHeaders', () => {
    it('Should not throw', async () => {
      /* Mock request containing required fields for testing */
      const mockRequest = {
        headers: {
          'content-type': fileProperties.content_type, // Header to be checked in validateHeaders
        },
      } as Request;

      const mockResponse = {} as Response;

      /* Testing headers that passes thru and not throwing error */
      await FileMiddleware.validateHeaders(mockRequest, mockResponse, ((err) => {
        if (err) throw err;
      }) as NextFunction);
    });

    it('Should throw', async () => {
      /* Mock request containing required fields for testing */
      const mockRequest = {
        headers: {
          'content-type': 'mimetype/thatsNotAllowed', // Header to be checked in validateHeaders
        },
      } as Request;

      const mockResponse = {} as Response;

      /* Expecting this to throw because content_type header is not allowed */
      await expect(
        FileMiddleware.validateHeaders(mockRequest, mockResponse, ((err) => {
          if (err) throw err;
        }) as NextFunction)
      ).rejects.toThrow();
    });
  });

  describe('validateFile', () => {
    it('Should not throw', async () => {
      /* Mock request containing required fields for testing */
      const mockRequest = {
        body: fs.readFileSync(testFilePath), // A Buffer read from file, to be checked in validateFile
      } as Request;

      const mockResponse = {} as Response;
      /* Testing validate file that it works correctly and not throwing error */
      await FileMiddleware.validateFile(mockRequest, mockResponse, ((err) => {
        if (err) throw err;
      }) as NextFunction);
    });

    it('Should throw ', async () => {
      /* Mock request containing required fields for testing */
      const mockRequest = {
        body: Buffer.alloc(config.storage.maxFileSizeBytes + 1), // Max size for file + 1 byte
      } as Request;

      const mockResponse = {} as Response;
      /* This shoul throw error max size exceeded,
         because we are sending a file thats max size is 1 byte bigger than the allowed*/
      await expect(
        FileMiddleware.validateFile(mockRequest, mockResponse, ((err) => {
          if (err) throw err;
        }) as NextFunction)
      ).rejects.toThrow();
    });
  });
});
