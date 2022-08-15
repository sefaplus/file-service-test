import { ServerStatusCodes } from './serverStatusCodes';

export class InnerError extends Error {
  public status = ServerStatusCodes.BAD_REQUEST;
  public message: string;

  constructor(message: string, currentStatus?: number) {
    super();
    if (currentStatus) this.status = currentStatus;
    this.message = message;
  }
}

export class ServiceError extends Error {
  constructor(message: string) {
    super(message);
  }
}
