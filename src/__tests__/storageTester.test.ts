import fs from 'fs';
import { config } from '../config';
import { FileStorageGetter } from '../libs';
import { FileDataObject } from '../types';
import { testConstants, testFilePath } from './mockFiles/mockFileConstants';

describe('Storage Adapter', () => {
  describe('getFile', () => {
    it('Should be instance of ReadStream', async () => {
      const storage = FileStorageGetter.getStorage();

      const data = await storage.getFile(testFilePath);
      expect(data).toBeInstanceOf(fs.ReadStream);
    });
  });

  describe('saveFile', () => {
    it('Should not throw', async () => {
      const storage = FileStorageGetter.getStorage();

      const filename = 'otjYQU1lDdCjONSvTUGmuuUUacpTEooF';
      const file = fs.readFileSync(`${__dirname}/mockFiles/file.${testConstants.extension}`);
      const metadata = { content_type: testConstants.content_type, content_length: testConstants.content_length };

      const data = await storage.saveFile(file, filename, metadata);

      /* Checking that all of the data properties are not null or undefined */
      Object.keys(data).map((key) => {
        if (!data[key as keyof FileDataObject])
          throw new Error(`${key} of response from storage.saveFile() was null or undefined, which shouldn't happen `);
      });

      /* Expected uploaded file path */
      const expectedPath = `${config.server.root}/${config.storage.localSavePath}${filename}.${testConstants.extension}`;
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
