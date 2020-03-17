import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { VoteState } from '../types/store';
import { getVoteSelector } from '../reducers/vote';
import * as VoteActions from '../actions/vote';

type GetQuestions = () => void;
type SetNextQuestionId = () => void;
type AttachAnswer = (questionId: number, answerId: number) => void;
type SetIsRightAnswersCount = (count: number) => void;
type ResetQuiz = () => void;

export interface UseVote extends VoteState {
    getQuestions: GetQuestions,
    setNextQuestionId: SetNextQuestionId,
    attachAnswer: AttachAnswer,
    setIsRightAnswersCount: SetIsRightAnswersCount,
    resetQuiz: ResetQuiz
}

export default function useVote(): UseVote {
    const vote = useSelector(getVoteSelector);
    const dispatch = useDispatch();

    const getQuestions = useCallback<GetQuestions>(() => dispatch(VoteActions.fetchQuetions()), [dispatch]);
    const setNextQuestionId = useCallback<SetNextQuestionId>(() => dispatch(VoteActions.setNextQuestionId()), [dispatch]);
    const attachAnswer = useCallback<AttachAnswer>((questionId, answerId) =>
        dispatch(VoteActions.attachAnswer(questionId, answerId)), [dispatch]);
    const setIsRightAnswersCount = useCallback<SetIsRightAnswersCount>((count) =>
        dispatch(VoteActions.setIsRightAnswersCount(count)), [dispatch]);
    const resetQuiz = useCallback<ResetQuiz>(() => dispatch(VoteActions.resetQuiz()), [dispatch]);

    return { ...vote, getQuestions, setNextQuestionId, attachAnswer, setIsRightAnswersCount, resetQuiz };
}