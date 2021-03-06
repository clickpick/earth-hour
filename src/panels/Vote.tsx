import React, { FC, useEffect, useMemo } from 'react';

import { PanelSecondary } from '../types/props';
import useVote from '../hooks/use-vote';
import useUser from '../hooks/use-user';

import { Panel, PanelHeaderSimple, PanelHeaderBack } from '@vkontakte/vkui';
import Quiz from '../components/Quiz';

export interface VoteProps extends PanelSecondary { }

const Vote: FC<VoteProps> = ({ id, goBack }: VoteProps) => {
    const {
        questionIds, questions, answers, image, storyLink,
        isRightAnswersCount, nextQuestionId, finish,
        setNextQuestionId, attachAnswer, setIsRightAnswersCount,
        sendAnswers, resetQuiz, present
    } = useVote();
    const { data } = useUser();

    const hasPresent = useMemo<boolean>(() => finish && !!data?.messagesAreEnabled && !data?.hasPresent, [finish, data]);

    useEffect(() => {
        if (!finish && answers.length === questionIds?.length && nextQuestionId === null) {
            sendAnswers(answers);
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
            image={image}
            storyLink={storyLink as string}
            answersCount={answers.length}
            finish={finish}
            hasPresent={hasPresent}
            setNextQuestionId={setNextQuestionId}
            setIsRightAnswersCount={setIsRightAnswersCount}
            attachAnswer={attachAnswer}
            resetQuiz={resetQuiz}
            exit={goBack}
            present={present} />,
        [
            isRightAnswersCount, questionIds, questions, nextQuestionId, image, storyLink, answers, finish, hasPresent,
            setNextQuestionId, setIsRightAnswersCount, attachAnswer, resetQuiz, goBack, present
        ]);

    return (
        <Panel id={id} separator={false}>
            <PanelHeaderSimple left={<PanelHeaderBack onClick={goBack} />} separator={false} />
            {bodyView}
        </Panel>
    );
};

export default Vote;