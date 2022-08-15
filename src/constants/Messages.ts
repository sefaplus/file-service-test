export const MESSAGE = {
  ERROR: {
    HEADER: {
      CONTENT_TYPE_CANNOT_BE_NULL: 'Content-Type header must be provided for this operation.',
    },
    FILE: {
      SIZE_EXCEEDED: 'Maximum file size is exceeded.',
      EXTENSION_DISALLOWED: 'This extenstion is not allowed for upload.',
      ERROR_UPLOADING_FILE: 'There was an error uploading file.',
    },
    STORAGE: {
      NOT_FOUND: 'There was an error whilst trying to access storage',
      BAD_TYPE: 'This is not an acceptable file storage system',
    },
  },
  STATUS: {
    FILE: {
      FILE_RECIEVED: 'File has been recieved and is queued for upload.',
      FILE_UPLOADED: 'File has beed successfully uploaded.',
    },
  },
};
