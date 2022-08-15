import { AnswerStatuses } from '../constants/enums';

/**
 *  Returns AnswerMessage object. Used to improve readability.
 * @param  {string} string Erorr message.
 * @return {ErrorMessage} Returns object of type ErrorMessage.
 */
export function answerMsg(status: AnswerStatuses, data: object | string) {
  return { status, data };
}
