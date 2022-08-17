import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import { FileMiddleware } from '../middlewares';
import { testConstants, testFilePath } from './mocks/mockFileConstants';

describe('Middleware', () => {
  describe('validateHeaders', () => {
    it('Should not throw', async () => {
      /* Mock request containing required fields for testing */
      const mockRequest = {
        headers: {
          'content-type': testConstants.content_type, // Header to be checked in validateHeaders
        },
      } as Request;

      const mockResponse = {} as Response;

      /* Testing headers that passes thru and not throwing error */
      await FileMiddleware.validateHeaders(mockRequest, mockResponse, ((err) => {
        if (err) throw err;
      }) as NextFunction);
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
  });
});
