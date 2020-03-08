import { combineReducers } from 'redux';

import user from './user';
import vote from './vote';

const rootReducer = combineReducers({
    user,
    vote
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>;

export { userInitialState } from './user';
export { voteInitialState } from './vote';