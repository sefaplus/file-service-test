import 'dotenv/config';
import { StorageTypes } from '../types';

export const CONFIG = {
  STORAGE: {
    TYPE: process.env.STORAGE_TYPE as StorageTypes,
    MAX_FILE_SIZE_BYTES: 104857600, // 1mb === 1048576; 100 mb === 104857600
    LOCAL_SAVE_PATH: 'tmp/',
    MONGO_ACCESS_URL: `mongodb://${process.env.MONGO_ROOT_USER}:${process.env.MONGO_ROOT_PASS}@localhost:27017/`,
    MONGO_DB_NAME: process.env.MONGO_DB_NAME,
  },
  SERVER: {
    PORT: process.env.SERVER_PORT || 5000,
  },
};
