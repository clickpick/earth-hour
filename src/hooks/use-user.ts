import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { UserState } from '../types/store';
import { getUserSelector } from '../reducers/user';
import * as UserActions from '../actions/user';

type Auth = () => void;

export interface UseUser extends UserState {
    auth: Auth
}

export default function useUser(): UseUser {
    const user = useSelector(getUserSelector);
    const dispatch = useDispatch();

    const auth = useCallback<Auth>(() => dispatch(UserActions.auth()), [dispatch]);

    return { ...user, auth };
}