import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { VoteState } from '../types/store';
import { getVoteSelector } from '../reducers/vote';
import * as VoteActions from '../actions/vote';

type GetQuestions = () => void;
type SetNextQuestionId = () => void;
type AttachAnswer = (questionId: number, answerId: number) => void;

export interface UseVote extends VoteState {
    getQuestions: GetQuestions,
    setNextQuestionId: SetNextQuestionId,
    attachAnswer: AttachAnswer
}

export default function useVote(): UseVote {
    const vote = useSelector(getVoteSelector);
    const dispatch = useDispatch();

    const getQuestions = useCallback<GetQuestions>(() => dispatch(VoteActions.fetchQuetions()), [dispatch]);
    const setNextQuestionId = useCallback<SetNextQuestionId>(() => dispatch(VoteActions.setNextQuestionId()), [dispatch]);
    const attachAnswer = useCallback<AttachAnswer>((questionId, answerId) =>
        dispatch(VoteActions.attachAnswer(questionId, answerId)), [dispatch]);

    return { ...vote, getQuestions, setNextQuestionId, attachAnswer };
}