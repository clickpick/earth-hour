export enum ActionTypes {
    USER_AUTH_REQUEST = 'USER_AUTH_REQUEST',
    USER_AUTH_SUCCESS = 'USER_AUTH_SUCCESS',
    USER_AUTH_FAILURE = 'USER_AUTH_FAILURE',
}

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
    readonly firstName: string,
    readonly lastName: string,
    readonly avatar200: string | null,
    readonly utcOffset: number,
    readonly messagesAreEnabled: boolean,
    readonly notificationsAreEnabled: boolean
}

export interface UserState extends DataState {
    readonly data: User | null
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
