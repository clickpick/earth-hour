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
