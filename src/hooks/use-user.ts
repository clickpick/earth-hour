import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { UserState } from '../types/store';
import { getUserSelector } from '../reducers/user';
import * as UserActions from '../actions/user';

type Auth = () => void;
type ToggleNotifications = (value: boolean) => void

export interface UseUser extends UserState {
    auth: Auth,
    toggleNotifications: ToggleNotifications,
}

export default function useUser(): UseUser {
    const user = useSelector(getUserSelector);
    const dispatch = useDispatch();

    const auth = useCallback<Auth>(() => dispatch(UserActions.auth()), [dispatch]);
    const toggleNotifications = useCallback<ToggleNotifications>((value) =>
        dispatch(UserActions.toggleNotifications(value)),
        [dispatch]);

    return { ...user, auth, toggleNotifications };
}