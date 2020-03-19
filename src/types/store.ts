export enum ActionTypes {
    USER_AUTH_REQUEST = 'USER_AUTH_REQUEST',
    USER_AUTH_SUCCESS = 'USER_AUTH_SUCCESS',
    USER_AUTH_FAILURE = 'USER_AUTH_FAILURE',

    USER_TOGGLE_NOTIFICATIONS_SUCCESS = 'USER_TOGGLE_NOTIFICATIONS_SUCCESS',

    VOTE_REQUEST = 'VOTE_REQUEST',
    VOTE_SUCCESS = 'VOTE_SUCCESS',
    VOTE_FAILURE = 'VOTE_FAILURE',

    SET_NEXT_QUESTION_ID = 'SET_NEXT_QUESTION_ID',
    ATTACH_ANSWER = 'ATTACH_ANSWER',
    SET_IS_RIGHT_ANSWERS_COUNT = 'SET_IS_RIGHT_ANSWERS_COUNT',

    SET_FINISH = 'SET_FINISH',

    RESET_QUIZ = 'RESET_QUIZ',
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
    readonly notificationsAreEnabled: boolean,
    readonly successfulPolls: Array<{ id: number }>
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
    readonly comment: string,
    readonly storyLink: string,
    readonly landLink: string,
    readonly image: {
        jpg: {
            x1: string,
            x2: string,
            x3: string
        },
        webp: {
            x1: string,
            x2: string,
            x3: string
        }
    },
    readonly answers: Array<Answer>
}

export type Questions = EntitiesObject<Question>;
export type QuestionIds = IdsArray | null;

export interface UserAnswer {
    readonly questionId: number,
    readonly answerId: number
}

export interface VoteState extends DataState {
    readonly questionIds: QuestionIds,
    readonly questions: Questions,
    readonly storyLink: string | null,
    readonly nextQuestionId: number | null,
    readonly answers: Array<UserAnswer>
    readonly isRightAnswersCount: number,
    readonly finish: boolean
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

export interface UserToggleNotificationsSuccess {
    type: ActionTypes.USER_TOGGLE_NOTIFICATIONS_SUCCESS,
    payload: { result: User }
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
                    questions: IdsArray,
                    storyLink: string
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

export interface SetNextQuestionId {
    type: ActionTypes.SET_NEXT_QUESTION_ID,
    nextQuestionId: number
}

export interface AttachAnswer {
    type: ActionTypes.ATTACH_ANSWER,
    questionId: number,
    answerId: number
}

export interface SetIsRightAnswersCount {
    type: ActionTypes.SET_IS_RIGHT_ANSWERS_COUNT,
    count: number
}

export interface SetFinish {
    type: ActionTypes.SET_FINISH,
    payload: { result: { success: boolean } }
}

export interface ResetQuiz {
    type: ActionTypes.RESET_QUIZ,
    nextQuestionId: number
}