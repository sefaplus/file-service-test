import 'dotenv/config';

export const CONFIG = {
  STORAGE: {
    TYPE: process.env.STORAGE_TYPE || 'LOCAL',
    MAX_FILE_SIZE_BYTES: 104857600, // 1mb === 1048576; 100 mb === 104857600
  },
  SERVER: {
    PORT: process.env.SERVER_PORT || 5000,
  },
};
