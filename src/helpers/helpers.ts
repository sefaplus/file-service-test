import { Request, Response } from "express";
/**
 * Returns buffer from Express Request, if any binary data is attached to the request.
 *
 * @param {Request} req Request body
 * @return The converted buffer
 * @example
 * const buffer = await readRequestBuffer(req);
 */
export async function readRequestBuffer(req: Request): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    let buffer = Buffer.alloc(0);
    const tempBufferArray: Array<Buffer> = [];

    req.setEncoding("binary");

    req.on("data", (chunk: string) => tempBufferArray.push(Buffer.from(chunk)));

    req.on("end", () => {
      buffer = Buffer.concat(tempBufferArray);
      resolve(buffer);
    });

    req.on("error", reject);
  });
}
