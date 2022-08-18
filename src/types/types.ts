export type FileMetaData = {
  content_type: string;
  content_length: string;
};

export type FileDataObject = {
  filename: string;
  size: string;
  mime_type: string;
  path: string;
  extension: string;
};

export type AllowedFileTypesItem = {
  uploadedType: string;
  extenstion: string;
};
