import { CALL_API, Methods } from '../middleware/api'
import { ActionTypes } from '../types/store';
import { vote } from '../schema';

export const fetchQuetions = () => ({
    [CALL_API]: {
        types: [ActionTypes.VOTE_REQUEST, ActionTypes.VOTE_SUCCESS, ActionTypes.VOTE_FAILURE],
        endpoint: '/votes/1',
        method: Methods.GET,
        schema: vote
    }
});

export const setNextQuestionId = () => (dispath: any, getState: any) => {
    const { vote: { questionIds, nextQuestionId: currentQuestionId } } = getState();

    if (!questionIds) {
        throw new Error('questionIds is null');
    }
    
    const indexCurrentQuestionId: number = questionIds.indexOf(currentQuestionId);

    if (indexCurrentQuestionId === -1) {
        throw new Error('index current question id not found');
    }

    const nextQuestionId: number = questionIds[indexCurrentQuestionId + 1];

    if (!!nextQuestionId) {
        dispath({
            type: ActionTypes.SET_NEXT_QUESTION_ID,
            nextQuestionId
        });
    }
};