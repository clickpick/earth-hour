import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import api from '../middleware/api';
import rootReducer, { AppState } from '../reducers';

export const initialStore: AppState = {};

export default (preloadedState = initialStore) => createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, api)
);