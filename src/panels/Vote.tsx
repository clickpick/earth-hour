import React, { FC, useEffect, useMemo } from 'react';

import { PanelSecondary } from '../types/props';
import useVote from '../hooks/use-vote';

import { Panel, PanelHeaderSimple, PanelHeaderBack } from '@vkontakte/vkui';
import Quiz from '../components/Quiz';

export interface VoteProps extends PanelSecondary { }

const Vote: FC<VoteProps> = ({ id, goBack }: VoteProps) => {
    const {
        questionIds, questions, answers, storyLink,
        isRightAnswersCount, nextQuestionId, finish,
        setNextQuestionId, attachAnswer, setIsRightAnswersCount,
        sendAnswers, resetQuiz
    } = useVote();

    useEffect(() => {
        if (!finish && answers.length === questionIds?.length && nextQuestionId === null) {
            setTimeout(() => { sendAnswers(answers); }, 1500);
        }
    }, [finish, answers, questionIds, nextQuestionId, sendAnswers]);

    useEffect(() => {
        function handleTouchMove(e: TouchEvent) {
            e.preventDefault();
        }

        window.addEventListener('touchmove', handleTouchMove, false);

        return () => {
            window.removeEventListener('touchmove', handleTouchMove);
        }
    }, []);

    const bodyView = useMemo(() => (questionIds === null)
        ? <h1>А где вопросы?</h1>
        : <Quiz
            isRightAnswersCount={isRightAnswersCount}
            questionIds={questionIds}
            questions={questions}
            nextQuestionId={nextQuestionId}
            storyLink={storyLink as string}
            answersCount={answers.length}
            finish={finish}
            setNextQuestionId={setNextQuestionId}
            setIsRightAnswersCount={setIsRightAnswersCount}
            attachAnswer={attachAnswer}
            resetQuiz={resetQuiz}
            exit={goBack} />,
        [
            isRightAnswersCount, questionIds, questions, nextQuestionId, storyLink, answers, finish,
            setNextQuestionId, setIsRightAnswersCount, attachAnswer, resetQuiz, goBack
        ]);

    return (
        <Panel id={id} separator={false}>
            <PanelHeaderSimple left={<PanelHeaderBack onClick={goBack} />} separator={false} />
            {bodyView}
        </Panel>
    );
};

export default Vote;