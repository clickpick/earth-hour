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
    const { vote: { questionIds, answers } } = getState();

    if (!questionIds) {
        throw new Error('questionIds is null');
    }


    const nextQuestionId: number = questionIds[answers.length];

    if (!!nextQuestionId) {
        dispath({
            type: ActionTypes.SET_NEXT_QUESTION_ID,
            nextQuestionId
        });
    }
};

export const attachAnswer = (questionId: number, answerId: number) => ({
    type: ActionTypes.ATTACH_ANSWER,
    questionId,
    answerId
});