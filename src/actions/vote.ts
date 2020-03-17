import { CALL_API, Methods } from '../middleware/api'
import { ActionTypes, UserAnswer } from '../types/store';
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

    const nextQuestionId: number | null = questionIds[answers.length] || null;

    dispath({
        type: ActionTypes.SET_NEXT_QUESTION_ID,
        nextQuestionId
    });
};

export const attachAnswer = (questionId: number, answerId: number) => ({
    type: ActionTypes.ATTACH_ANSWER,
    questionId,
    answerId
});

export const setIsRightAnswersCount = (count: number) => ({
    type: ActionTypes.SET_IS_RIGHT_ANSWERS_COUNT,
    count
});

export const sendAnswers = (answers: Array<UserAnswer>) => ({
    [CALL_API]: {
        types: ['', ActionTypes.SET_FINISH, ''],
        endpoint: '/votes/1/verify',
        method: Methods.POST,
        schema: {},
        data: { answers }
    }
});

export const resetQuiz = () => (dispath: any, getState: any) => {
    const { vote: { questionIds } } = getState();

    if (!questionIds) {
        throw new Error('questionIds is null');
    }

    const nextQuestionId: number | null = questionIds[0] || null;

    dispath({
        type: ActionTypes.RESET_QUIZ,
        nextQuestionId
    });
};