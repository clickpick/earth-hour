import {
    ActionTypes,
    QuestionIds, Questions, UserAnswer, VoteState,
    VoteLoad, VoteSuccess, VoteFailure, UserAuthSuccess,
    SetNextQuestionId, AttachAnswer, SetIsRightAnswersCount, SetFinish, ResetQuiz
} from '../types/store';
import { AppState } from './index';
import isPending, { initialPending } from './pending';
import isError, { initialError } from './error';

type VoteReducerActions = VoteLoad | VoteSuccess | VoteFailure | UserAuthSuccess | SetNextQuestionId | AttachAnswer | SetIsRightAnswersCount | SetFinish | ResetQuiz;

const initialQuesitionIds: QuestionIds = null;
const initialQuesitions: Questions = {};
const initialStoryLink: string | null = null;
const initialNextQuestionId: number | null = 0;
const initialAnswers: Array<UserAnswer> = [];
const initialIsRightAnswersCount: number = 0;
const initialFinish: boolean = false;

export const voteInitialState: VoteState = {
    pending: initialPending,
    error: initialError,
    questionIds: initialQuesitionIds,
    questions: initialQuesitions,
    storyLink: initialStoryLink,
    nextQuestionId: initialNextQuestionId,
    answers: initialAnswers,
    isRightAnswersCount: initialIsRightAnswersCount,
    finish: initialFinish
};

function questionIds(state = initialQuesitionIds, action: VoteReducerActions): QuestionIds {
    switch (action.type) {
        case ActionTypes.VOTE_SUCCESS:
            return action.payload.entities.votes[action.payload.result].questions;
        default:
            return state;
    }
}

function questions(state = initialQuesitions, action: VoteReducerActions): Questions {
    switch (action.type) {
        case ActionTypes.VOTE_SUCCESS:            
            return action.payload.entities.question;
        default:
            return state;
    }
}

function storyLink(state = initialStoryLink, action: VoteReducerActions): string | null {
    if (action.type === ActionTypes.VOTE_SUCCESS) {
        return action.payload.entities.votes[action.payload.result].storyLink;
    }

    return state;
}

function nextQuestionId(state = initialNextQuestionId, action: VoteReducerActions): number | null {
    switch (action.type) {
        case ActionTypes.USER_AUTH_SUCCESS:
            return (!!action.payload.result.successfulPolls.find(quiz => quiz.id === 2))
                ? null
                : state;
        case ActionTypes.VOTE_SUCCESS:
            return (state === null)
                ? null
                : action.payload.entities.votes[action.payload.result].questions[0];
        case ActionTypes.SET_NEXT_QUESTION_ID:
        case ActionTypes.RESET_QUIZ:
            return action.nextQuestionId;
        default:
            return state;
    }
}

function answers(state = initialAnswers, action: VoteReducerActions): Array<UserAnswer> {
    if (action.type === ActionTypes.ATTACH_ANSWER) {
        return [...state].concat([{
            questionId: action.questionId,
            answerId: action.answerId
        }]);
    }

    if (action.type === ActionTypes.RESET_QUIZ) {
        return [];
    }

    return state;
}

function isRightAnswersCount(state = initialIsRightAnswersCount, action: VoteReducerActions): number {
    if (action.type === ActionTypes.SET_IS_RIGHT_ANSWERS_COUNT) {
        return action.count;
    }

    if (action.type === ActionTypes.RESET_QUIZ) {
        return 0;
    }

    return state;
}

function finish(state = initialFinish, action: VoteReducerActions): boolean {
    if (action.type === ActionTypes.USER_AUTH_SUCCESS) {
        if (!!action.payload.result.successfulPolls.find(quiz => quiz.id === 2)) {
            return true;
        }
    }

    if (action.type === ActionTypes.SET_FINISH) {
        return action.payload.result.success;
    }

    if (action.type === ActionTypes.RESET_QUIZ) {
        return false;
    }

    return state;
}

export default function vote(state = voteInitialState, action: VoteReducerActions): VoteState {
    return {
        pending: isPending<VoteReducerActions>(state.pending, action, [ActionTypes.VOTE_REQUEST, ActionTypes.VOTE_SUCCESS, ActionTypes.VOTE_FAILURE]),
        error: isError<VoteReducerActions>(state.error, action, ActionTypes.VOTE_FAILURE),
        questionIds: questionIds(state.questionIds, action),
        questions: questions(state.questions, action),
        storyLink: storyLink(state.storyLink, action),
        nextQuestionId: nextQuestionId(state.nextQuestionId, action),
        answers: answers(state.answers, action),
        isRightAnswersCount: isRightAnswersCount(state.isRightAnswersCount, action),
        finish: finish(state.finish, action)
    };
}

// Selectors
export const getVoteSelector = (state: AppState) => state.vote;