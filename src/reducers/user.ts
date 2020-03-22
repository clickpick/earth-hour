import {
    ActionTypes,
    User, UserState,
    UserAuthLoad, UserAuthSuccess, UserAuthFailure, UserToggleNotificationsSuccess, UserToggleMessages
} from '../types/store';
import { AppState } from './index';
import isPending, { initialPending } from './pending';
import isError, { initialError } from './error';

type UserReducerActions = UserAuthLoad | UserAuthSuccess | UserAuthFailure | UserToggleNotificationsSuccess | UserToggleMessages;

const initialData: User | null = null;

export const userInitialState: UserState = {
    pending: initialPending,
    error: initialError,
    data: initialData
};

function data(state = initialData, action: UserReducerActions): User | null {
    switch (action.type) {
        case ActionTypes.USER_AUTH_SUCCESS:
        case ActionTypes.USER_TOGGLE_NOTIFICATIONS_SUCCESS:
            return action.payload.result;

        case ActionTypes.USER_TOGGLE_MESSAGES:
            return (state === null)
                ? null
                : {
                    ...state,
                    messagesAreEnabled: action.value
                };

        default:
            return state;
    }
}

export default function userReducer(state = userInitialState, action: UserReducerActions): UserState {
    return {
        pending: isPending<UserReducerActions>(state.pending, action, [ActionTypes.USER_AUTH_REQUEST, ActionTypes.USER_AUTH_SUCCESS, ActionTypes.USER_AUTH_FAILURE]),
        error: isError<UserReducerActions>(state.error, action, ActionTypes.USER_AUTH_FAILURE),
        data: data(state.data, action)
    };
}

// Selectors
export const getUserSelector = (state: AppState) => state.user;