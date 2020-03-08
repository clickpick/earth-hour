import { Action } from '../types/store';

export const initialPending: boolean = false;

export default function pending<T extends Action>(state = initialPending, action: T, types: Array<string>): boolean {
    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected an array of three action types.');
    }

    if (!types.every(type => typeof type === 'string')) {
        throw new Error('Expected action types to be strings.');
    }

    const [requestType, successType, failureType] = types;

    switch (action.type) {
        case requestType:
            return true;
        
        case successType:
        case failureType:
            return false;

        default:
            return state;
    }
}