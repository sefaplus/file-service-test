import express from 'express';
import { FileStorageController } from '../controller';
import { FileMiddleware } from '../middleware';

export const fileStorageRouter = express.Router();
fileStorageRouter.get('/:filename', FileStorageController.getFile);

fileStorageRouter.post('/:filename', FileMiddleware.validate, FileStorageController.saveFile);
