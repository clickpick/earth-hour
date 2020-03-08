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
