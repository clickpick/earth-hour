import { Error, Action } from '../types/store';

export const initialError: Error = null;

function findType(this: string, type: string) {
    return this === type;
}

export default function error<T extends Action>(state = initialError, action: T, type: string | string[]) {
    if (typeof type === 'string') {
        if (action.type === type) {
            return action.error;
        }
    }

    if (Array.isArray(type)) {
        if (type.some(findType, action.type)) {
            return action.error;
        }
    }

    return state;
}