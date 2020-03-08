import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import api from '../middleware/api';
import rootReducer, { AppState, userInitialState, voteInitialState } from '../reducers';

export const initialStore: AppState = {
    user: userInitialState,
    vote: voteInitialState
};

export default (preloadedState = initialStore) => createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, api)
);