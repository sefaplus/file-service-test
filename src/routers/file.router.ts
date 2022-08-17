import express from 'express';
import { FileController } from '../controllers';
import { FileMiddleware } from '../middlewares';

export const fileRouter = express.Router();

fileRouter.get('/:filename', FileController.getFile);

fileRouter.post(
  '/:filename',
  FileMiddleware.validateHeaders,
  FileMiddleware.supplyRequestWithFile,
  FileMiddleware.validateFile,
  FileController.saveFile
);
