import express from 'express';
import { FileStorageController } from '../controller';
import { fileMiddleware } from '../middleware/FileMiddleware';

export const fileStorageRouter = express.Router();
fileStorageRouter.get('/:filename', FileStorageController.getFile);

fileStorageRouter.post('/:filename', fileMiddleware, FileStorageController.saveFile);
