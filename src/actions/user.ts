import { CALL_API, Methods } from '../middleware/api'
import { ActionTypes } from '../types/store';

export const auth = () => ({
    [CALL_API]: {
        types: [ActionTypes.USER_AUTH_REQUEST, ActionTypes.USER_AUTH_SUCCESS, ActionTypes.USER_AUTH_FAILURE],
        endpoint: '/auth',
        method: Methods.POST,
        schema: {}
    }
});

export const toggleNotifications = (value = false) => ({
    [CALL_API]: {
        types: [ActionTypes.USER_AUTH_REQUEST, ActionTypes.USER_TOGGLE_NOTIFICATIONS_SUCCESS, ActionTypes.USER_AUTH_FAILURE],
        endpoint: '/notifications',
        method: Methods.POST,
        schema: {},
        data: { value }
    }
});

export const toggleMessages = (value = false) => ({
    type: ActionTypes.USER_TOGGLE_MESSAGES,
    value
});