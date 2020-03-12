import {
    ActionTypes,
    QuestionIds, Questions, UserAnswer, VoteState,
    VoteLoad, VoteSuccess, VoteFailure, SetNextQuestionId, AttachAnswer
} from '../types/store';
import { AppState } from './index';
import isPending, { initialPending } from './pending';
import isError, { initialError } from './error';

type VoteReducerActions = VoteLoad | VoteSuccess | VoteFailure | SetNextQuestionId | AttachAnswer;

const initialQuesitionIds: QuestionIds = null;
const initialQuesitions: Questions = {};
const initialNextQuestionId: number = 0;
const initialAnswers: Array<UserAnswer> = [];

export const voteInitialState: VoteState = {
    pending: initialPending,
    error: initialError,
    questionIds: initialQuesitionIds,
    questions: initialQuesitions,
    nextQuestionId: initialNextQuestionId,
    answers: initialAnswers
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

function nextQuestionId(state = initialNextQuestionId, action: VoteReducerActions): number {
    switch (action.type) {
        case ActionTypes.VOTE_SUCCESS:
            return action.payload.entities.votes[action.payload.result].questions[0];
        case ActionTypes.SET_NEXT_QUESTION_ID:
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

    return state;
}

export default function vote(state = voteInitialState, action: VoteReducerActions): VoteState {
    return {
        pending: isPending<VoteReducerActions>(state.pending, action, [ActionTypes.VOTE_REQUEST, ActionTypes.VOTE_SUCCESS, ActionTypes.VOTE_FAILURE]),
        error: isError<VoteReducerActions>(state.error, action, ActionTypes.VOTE_FAILURE),
        questionIds: questionIds(state.questionIds, action),
        questions: questions(state.questions, action),
        nextQuestionId: nextQuestionId(state.nextQuestionId, action),
        answers: answers(state.answers, action)
    };
}

// Selectors
export const getVoteSelector = (state: AppState) => state.vote;