import { NextFunction, Request, Response } from 'express';
import { AnswerStatuses, InnerError, ServerStatusCodes } from '../constants';
import { answerMsg } from '../helpers/helpers';

// Disabling esling for next line, because {next} is required, but is never used in this part of the code
// since this is the endpoint of a program.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const globalErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof InnerError) {
    const response = answerMsg(AnswerStatuses.ERROR, err.message);

    return res.status(err.status).json(response);
  } else {
    const response = answerMsg(AnswerStatuses.ERROR, 'Internal server error');

    return res.status(ServerStatusCodes.INTERNAL_SERVER_ERROR).json(response);
  }
};
