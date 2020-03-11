export enum ActionTypes {
    USER_AUTH_REQUEST = 'USER_AUTH_REQUEST',
    USER_AUTH_SUCCESS = 'USER_AUTH_SUCCESS',
    USER_AUTH_FAILURE = 'USER_AUTH_FAILURE',

    VOTE_REQUEST = 'VOTE_REQUEST',
    VOTE_SUCCESS = 'VOTE_SUCCESS',
    VOTE_FAILURE = 'VOTE_FAILURE',
}

interface EntitiesObject<T> { [index: string]: T }
type IdsArray = Array<number>;

export type Error = string | null;

export interface DataState {
    readonly pending: boolean,
    readonly error: Error
}

export interface Action {
    type: ActionTypes,
    [index: string]: any
}

/* ––––––––––––––––––––––––––––––––––––––––––––––– */

/**
 * State
 */

/* User */
export interface User {
    readonly vkUserId: number,
    readonly messagesAreEnabled: boolean,
    readonly notificationsAreEnabled: boolean
}

export interface UserState extends DataState {
    readonly data: User | null
}

/* Vote */
export interface Answer {
    readonly id: number,
    readonly answer: string,
    readonly isRight: boolean
}

export interface Question {
    readonly id: number,
    readonly question: string,
    readonly comment: string | null,
    readonly storyLink: string,
    readonly answers: Array<Answer>
}

export type Questions = EntitiesObject<Question>;
export type QuestionIds = IdsArray | null;

export interface VoteState extends DataState {
    readonly questionIds: QuestionIds,
    readonly questions: Questions,
    readonly nextQuestionId: number
}

/* ––––––––––––––––––––––––––––––––––––––––––––––– */

/**
 * Actions
 */

/* User */
export interface UserAuthLoad {
    type: ActionTypes.USER_AUTH_REQUEST
}

export interface UserAuthSuccess {
    type: ActionTypes.USER_AUTH_SUCCESS,
    payload: { result: User }
}

export interface UserAuthFailure {
    type: ActionTypes.USER_AUTH_FAILURE,
    error: string
}

/* Vote */
export interface VoteLoad {
    type: ActionTypes.VOTE_REQUEST
}

export interface VoteSuccess {
    type: ActionTypes.VOTE_SUCCESS,
    payload: {
        entities: {
            question: Questions,
            votes: {
                [index: string]: {
                    id: string,
                    questions: QuestionIds
                }
            }
        },
        result: number
    }
}

export interface VoteFailure {
    type: ActionTypes.VOTE_FAILURE,
    error: string
}