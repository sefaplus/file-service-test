import { AnswerStatuses } from '../types';

/**
 *  Returns AnswerMessage object. Used to improve readability.
 * @param  {string} string Erorr message.
 * @return {ErrorMessage} Returns object of type ErrorMessage.
 */
export function getResponse(status: AnswerStatuses, data: object | string) {
  return { status, data };
}
