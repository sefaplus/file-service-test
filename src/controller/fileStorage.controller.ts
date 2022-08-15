import { NextFunction, Request, Response } from "express";
import { readRequestBuffer } from "../helpers/helpers";
import { FileStorageAdapter } from "../libs";

export class FileStorageController {
  static async getFile(req: Request, res: Response, next: NextFunction) {}

  static async saveFile(req: Request, res: Response, next: NextFunction) {
    const { filename } = req.params;
    console.log(req.body);
    // const response = LocalFileStorageAdapter.saveFile(buffer, filename, {});
    res.send("answer");
  }
}
