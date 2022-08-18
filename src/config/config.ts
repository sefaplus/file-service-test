import 'dotenv/config';
import { StorageTypes } from '../types';

export const config = {
  storage: {
    type: process.env.STORAGE_TYPE as StorageTypes,
    maxFileSizeBytes: parseInt(process.env.MAX_FILE_LIMIT || '1') * 1048576, // 1mb === 1048576;
    localSavePath: process.env.LOCAL_SAVE_PATH,
    mongoAccessUrl:
      (parseInt(process.env.USING_DOCKER_COMPOSE || '0')
        ? `mongodb://${process.env.MONGO_ROOT_USER}:${process.env.MONGO_ROOT_PASS}@localhost:27017/`
        : process.env.MONGO_CLOUD_URL) || '',
    mongoDbName: process.env.MONGO_DB_NAME || 'FilesDb',
  },
  server: {
    port: process.env.PORT || 5000,
    rootDir: __dirname.split('/').slice(0, -2).join('/'),
  },
};
