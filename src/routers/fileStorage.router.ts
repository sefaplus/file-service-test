import express from "express";
import { FileStorageController } from "../controller";
import { localUpload } from "../service";

export const fileStorageRouter = express.Router();
fileStorageRouter.get(
  "/:filename",
  localUpload.single("file"),
  FileStorageController.getFile
);

fileStorageRouter.post("/:filename", FileStorageController.saveFile);
