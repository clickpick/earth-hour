import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { VoteState } from '../types/store';
import { getVoteSelector } from '../reducers/vote';
import * as VoteActions from '../actions/vote';

type GetQuestions = () => void;

export interface UseVote extends VoteState {
    getQuestions: GetQuestions
}

export default function useVote(): UseVote {
    const vote = useSelector(getVoteSelector);
    const dispatch = useDispatch();

    const getQuestions = useCallback<GetQuestions>(() => dispatch(VoteActions.fetchQuetions()), [dispatch]);

    return { ...vote, getQuestions };
}