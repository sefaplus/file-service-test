import 'dotenv/config';
import { StorageTypes } from '../types';

export const config = {
  storage: {
    type: process.env.STORAGE_TYPE as StorageTypes,
    maxFileSizeBytes: 104857600, // 1mb === 1048576; 100 mb === 104857600
    localSavePath: 'tmp/',
    // mongoAccessUrl: `mongodb://${process.env.MONGO_ROOT_USER}:${process.env.MONGO_ROOT_PASS}@localhost:27017/`,
    mongoAccessUrl: `mongodb+srv://gizmailov:H6z3wSxEEQ6ZdcG3@todos.gxoqj.mongodb.net/?retryWrites=true&w=majority`,
    mongoDbName: process.env.MONGO_DB_NAME || 'FilesDb',
  },
  server: {
    port: process.env.SERVER_PORT || 5000,
  },
};
