export enum AllowedFileTypes {
  JPEG = 'image/jpeg',
  JPEG200 = 'image/jpeg2000',
  JPG = 'image/jpeg',
  PNG = 'image/png',
  GIF = 'image/gif',
  PDF = 'application/pdf',
  DOCX = 'application/docx',
  DOC = 'application/doc',
  PPT = 'application/ppt',
  PPTX = 'application/pptx',
  XLS = 'application/xls',
  XLSX = 'application/xlsx',
  ZIP = 'application/zip',
  RAR = 'application/rar',
}

export enum StorageTypes {
  LOCAL = 'LOCAL',
  FTP = 'FTP',
  WEBSOCKET = 'WEBSOCKET',
}

export enum AnswerStatuses {
  SUCCESS = 'success',
  ERROR = 'error',
}

export enum ServerStatusCodes {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_ACCEPTABLE = 406,
  INTERNAL_SERVER_ERROR = 500,
}
