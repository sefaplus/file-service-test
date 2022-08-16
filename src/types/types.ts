export type FileMetaData = {
  content_type: string;
  content_length: string;
};

export type StorageActions = {
  getFile: () => Promise<void>;
  saveFile: (buffer: Buffer, filename: string, metadata: FileMetaData) => Promise<boolean>;
};
