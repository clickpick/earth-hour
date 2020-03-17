import React, { FC, useRef, useCallback, useMemo, useEffect } from 'react';

import { PanelSecondary } from '../types/props';
import useVote from '../hooks/use-vote';

import { Panel, PanelHeaderSimple, PanelHeaderBack } from '@vkontakte/vkui';
import Question from '../components/Question';
import Planet from '../components/Planet';
import Transition from '../components/Transition';
import Group from '../components/Group';
import Button from '../components/Button';
import WWFPrize from '../components/WWFPrize';

import { ReactComponent as IconReply } from '../svg/reply.svg';
import { ReactComponent as IconAgain } from '../svg/again.svg';
import { ReactComponent as IconHome } from '../svg/home.svg';

export interface VoteProps extends PanelSecondary { }

const Vote: FC<VoteProps> = ({ id, goBack }: VoteProps) => {
    const {
        questionIds, questions, answers,
        isRightAnswersCount, nextQuestionId,
        setNextQuestionId, attachAnswer, setIsRightAnswersCount,
        sendAnswers, resetQuiz
    } = useVote();

    const isRight = useRef<number>(isRightAnswersCount);

    useEffect(() => () => {
        setNextQuestionId();
        setIsRightAnswersCount(isRight.current);
    }, [setNextQuestionId, setIsRightAnswersCount]);

    useEffect(() => {
        if (answers.length === questionIds?.length) {
            sendAnswers(answers);
        }
    }, [answers, questionIds, sendAnswers]);

    const questionsCount = useMemo(() => (Array.isArray(questionIds) && questionIds.length) || 0, [questionIds]);

    const incrementIsRight = useCallback((count: number) => {
        isRight.current += count;
    }, []);

    const questionView = useCallback((id, index) => {
        if (nextQuestionId !== id) {
            return null;
        }

        return (
            <Question
                key={id}
                className="padding-blue"
                {...questions[id]}
                currentQuestionNumber={index + 1}
                questionsCount={questionsCount}
                triggerAnswer={incrementIsRight}
                goNext={setNextQuestionId}
                attachAnswer={attachAnswer} />
        );
    }, [nextQuestionId, questions, questionsCount, incrementIsRight, setNextQuestionId, attachAnswer]);

    const resultView = useMemo(() => {
        const result = (isRight.current / answers.length) * 100;
        let mood: 'best' | 'good' | 'bad' | 'lock' = 'bad';
        let title = 'Плохо';
        let message = '123';
        let showPrize = false;

        if (result >= 60 && result <= 80) {
            mood = 'good';
            title = 'Норм';
            message = '456';
        }

        if (result === 100) {
            mood = 'best';
            title = 'Норм';
            message = '456';
            showPrize = true;
        }

        return (
            <Transition in={true} timeout={100}>
                <Planet
                    className="margin-pink--bottom padding-blue--rl"
                    mood={mood}
                    title={title}
                    message={message} />
                <Group jcCenter>
                    <Button
                        className="margin-purple--right"
                        shape="circle"
                        icon={<IconReply />}
                        onClick={undefined}>
                        Поделиться<br />приложением
                    </Button>
                    <Button
                        className="margin-purple--right"
                        shape="circle"
                        icon={<IconAgain />}
                        onClick={resetQuiz}>
                        Повторить квиз<br />заново
                    </Button>
                    <Button
                        shape="circle"
                        icon={<IconHome />}
                        onClick={goBack}>
                        Вернуться<br />на главную
                    </Button>
                </Group>
                {(showPrize) && <WWFPrize className="margin-pink--top" />}
            </Transition>
        );
    }, [answers, resetQuiz, goBack]);

    const bodyView = useMemo(() => (!questionIds)
        ? <h1>А где вопросы?</h1>
        : (nextQuestionId !== null)
            ? questionIds.map(questionView)
            : resultView,
        [nextQuestionId, questionIds, questionView, resultView]);

    return (
        <Panel id={id} separator={false}>
            <PanelHeaderSimple
                left={<PanelHeaderBack onClick={goBack} />}
                separator={false}
                children="Час Земли" />
            {bodyView}
        </Panel>
    );
};

export default Vote;