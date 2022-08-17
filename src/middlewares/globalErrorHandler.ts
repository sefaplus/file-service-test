import { NextFunction, Request, Response } from 'express';
import { Logger } from 'tslog';
import { InnerError } from '../errors';
import { childLogger, getResponse } from '../helpers';
import { AnswerStatuses, ServerStatusCodes } from '../types';

export class ErrorHandler {
  private static readonly log: Logger = childLogger('Global Error Handler');

  // Disabling esling for next line, because {next} is required, but is never used in this part of the code
  // since this is the endpoint of a program.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static globalErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof InnerError) {
      const response = getResponse(AnswerStatuses.ERROR, err.message);

      return res.status(err.status).json(response);
    }

    ErrorHandler.log.error(err.message);

    const response = getResponse(AnswerStatuses.ERROR, 'Internal server error');

    return res.status(ServerStatusCodes.INTERNAL_SERVER_ERROR).json(response);
  }
}
