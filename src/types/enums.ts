export const AllowedFileTypes = {
  JPEG: { uploadedType: 'image/jpeg', extenstion: 'jpeg' },
  JPEG2000: { uploadedType: 'image/jpeg2000', extenstion: 'jpeg2000' },
  JPG: { uploadedType: 'image/jpg', extenstion: 'jpg' },
  PNG: { uploadedType: 'image/png', extenstion: 'png' },
  GIF: { uploadedType: 'image/gif', extenstion: 'gif' },
  PDF: { uploadedType: 'application/pdf', extenstion: 'pdf' },
  ZIP: { uploadedType: 'application/zip', extenstion: 'zip' },
  RAR: { uploadedType: 'application/rar', extenstion: 'rar' },
  DOC: { uploadedType: 'application/msword', extenstion: 'doc' },
  DOCX: { uploadedType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', extenstion: 'docx' },
  XLS: { uploadedType: 'application/vnd.ms-excel', extenstion: 'xls' },
  XLSX: { uploadedType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', extenstion: 'xlsx' },
  PPT: { uploadedType: 'application/vnd.ms-powerpoint', extenstion: 'ppt' },
  PPTX: {
    uploadedType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    extenstion: 'pptx',
  },
};

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
