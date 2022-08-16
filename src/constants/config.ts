import 'dotenv/config';

export const CONFIG = {
  STORAGE: {
    TYPE: process.env.STORAGE_TYPE || 'LOCAL',
    MAX_FILE_SIZE_BYTES: 104857600, // 1mb === 1048576; 100 mb === 104857600
    MONGO_ACCESS_URL: `mongodb://${process.env.MONGO_ROOT_USER}:${process.env.MONGO_ROOT_PASS}@mongo:27017/`,
    MONGO_USER_LOGIN: process.env.MONGO_USER_LOGIN,
    MONGO_USER_PASSW: process.env.MONGO_USER_PASSW,
  },
  SERVER: {
    PORT: process.env.SERVER_PORT || 5000,
  },
};
