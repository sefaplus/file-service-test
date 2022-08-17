export const FileStatusMessages = {
  FILE_RECIEVED: 'File has been recieved and is queued for upload.',
  FILE_UPLOADED: 'File has beed successfully uploaded.',
};

export const ErrorMessages = {
  HEADER: {
    CONTENT_TYPE_CANNOT_BE_NULL: 'Content-Type header must be provided for this operation.',
  },
  FILE: {
    SIZE_REQUIREMENT_FAILED: 'File size does not meet our requirements.',
    EXTENSION_DISALLOWED: 'This extenstion is not allowed for upload.',
    ERROR_UPLOADING_FILE: 'There was an error uploading file.',
    ERROR_SAVING_METADATA: 'There was an error whilst saving file metadata',
    NOT_FOUND: 'FILE NOT FOUND',
  },
  STORAGE: {
    NOT_FOUND: 'There was an error whilst trying to access storage',
    BAD_TYPE: 'This is not an acceptable file storage system',
    MD_CONN_FAILED: 'Connection to Metadata storage failed.',
    ERROR_FETCHING_FILE: 'Error fetching file from metadata database',
  },
};
