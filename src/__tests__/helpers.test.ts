import { getResponse } from '../helpers';
import { AnswerStatuses } from '../types';

describe('helpers.ts', () => {
  it('should return object', () => {
    const response = getResponse(AnswerStatuses.SUCCESS, {});

    expect(response).toMatchObject({
      status: AnswerStatuses.SUCCESS,
      data: {},
    });
  });
});
