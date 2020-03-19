import React, { FC, useRef, useCallback, useMemo, useEffect } from 'react';

import './Vote.css';

// @ts-ignore
import { checkWebPSupport } from 'supports-webp-sync';

import { PanelSecondary } from '../types/props';
import useVote from '../hooks/use-vote';
import { resultProps } from '../config';
import { shareApp, showStoryBox } from '../helpers/vk';

import { Panel, PanelHeaderSimple, PanelHeaderBack } from '@vkontakte/vkui';
import Question from '../components/Question';
import Planet from '../components/Planet';
import Transition from '../components/Transition';
import Group from '../components/Group';
import Button from '../components/Button';
import WWFPrize from '../components/WWFPrize';

import { ReactComponent as IconReply } from '../svg/reply.svg';
import { ReactComponent as IconAgain } from '../svg/again.svg';
import { ReactComponent as IconnUnion } from '../svg/union.svg';
import { ReactComponent as IconHome } from '../svg/home.svg';

export interface VoteProps extends PanelSecondary { }

const supportWebp: boolean = checkWebPSupport();

const Vote: FC<VoteProps> = ({ id, goBack }: VoteProps) => {
    const {
        questionIds, questions, answers, storyLink,
        isRightAnswersCount, nextQuestionId, finish,
        setNextQuestionId, attachAnswer, setIsRightAnswersCount,
        sendAnswers, resetQuiz
    } = useVote();

    const isRight = useRef<number>(isRightAnswersCount);

    useEffect(() => () => {
        if (!finish) {
            setNextQuestionId();
            setIsRightAnswersCount(isRight.current);
        }
    }, [finish, setNextQuestionId, setIsRightAnswersCount]);

    useEffect(() => {
        if (!finish && answers.length === questionIds?.length && nextQuestionId === null) {
            setTimeout(() => { sendAnswers(answers); }, 1500);
        }
    }, [finish, answers, questionIds, nextQuestionId, sendAnswers]);

    const questionsCount = useMemo(() => (Array.isArray(questionIds) && questionIds.length) || 0, [questionIds]);

    const incrementIsRight = useCallback((count: number) => {
        isRight.current += count;
    }, []);

    const shareStory = useCallback(() => showStoryBox(storyLink as string), [storyLink]);

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
        const result = (isRight.current / answers.length) * 100 || 0;
        const showPrize = finish || result === 100;
        let mood: 'best' | 'good' | 'bad' | 'lock' =
            (showPrize)
                ? 'best'
                : (result >= 60 && result <= 80)
                    ? 'good'
                    : 'bad';

        return (
            <Transition in={true} timeout={100}>
                <Planet
                    className="margin-pink--bottom padding-blue--rl"
                    mood={mood}
                    {...resultProps[mood]} />
                <Group jcCenter>
                    <Button
                        className="margin-purple--right"
                        shape="circle"
                        icon={<IconReply />}
                        onClick={shareApp}>
                        Поделиться<br />приложением
                    </Button>
                    {(showPrize)
                        ? <Button
                            className="margin-purple--right"
                            shape="circle"
                            icon={<IconnUnion />}
                            onClick={shareStory}>
                            Поделиться<br />в сторис
                        </Button>
                        : <Button
                            className="margin-purple--right"
                            shape="circle"
                            icon={<IconAgain />}
                            onClick={resetQuiz}>
                            Повторить квиз<br />заново
                        </Button>}

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
    }, [finish, answers, shareStory, resetQuiz, goBack]);

    const maskView = useMemo(() => {
        if (nextQuestionId === null) {
            return null;
        }

        const { image } = questions[nextQuestionId];

        return (
            <div
                className="Vote__mask"
                style={{
                    backgroundImage: `
                        linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
                        url(${(supportWebp) ? image.webp.x1 : image.jpg.x1})
                    `,
                }} />
        );
    }, [questions, nextQuestionId])

    const bodyView = useMemo(() => (!questionIds)
        ? <h1>А где вопросы?</h1>
        : (nextQuestionId !== null)
            ? questionIds.map(questionView)
            : resultView,
        [nextQuestionId, questionIds, questionView, resultView]);

    return (
        <Panel id={id} separator={false}>
            <PanelHeaderSimple left={<PanelHeaderBack onClick={goBack} />} separator={false} />
            {maskView}
            {bodyView}
        </Panel>
    );
};

export default Vote;