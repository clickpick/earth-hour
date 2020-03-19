import React, { FC, useRef, useMemo, useCallback, useEffect, memo } from 'react';

import { Questions } from '../../types/store';

// @ts-ignore
import { checkWebPSupport } from 'supports-webp-sync';
import { resultProps } from '../../config';
import { shareApp, showStoryBox } from '../../helpers/vk';

import Question from '../Question';
import Planet from '../Planet';
import Transition from '../Transition';
import Group from '../Group';
import Button from '../Button';
import WWFPrize from '../WWFPrize';

import { ReactComponent as IconReply } from '../../svg/reply.svg';
import { ReactComponent as IconAgain } from '../../svg/again.svg';
import { ReactComponent as IconnUnion } from '../../svg/union.svg';
import { ReactComponent as IconHome } from '../../svg/home.svg';

const supportWebp: boolean = checkWebPSupport();

export interface QuizProps {
    isRightAnswersCount: number,
    questionIds: Array<number>,
    questions: Questions,
    nextQuestionId: number | null,
    storyLink: string,
    answersCount: number,
    finish: boolean,
    setNextQuestionId(): void,
    setIsRightAnswersCount(count: number): void,
    attachAnswer(questionId: number, answerId: number): void,
    resetQuiz(): void,
    exit(): void
}

const Quiz: FC<QuizProps> = ({
    isRightAnswersCount, questionIds, questions, nextQuestionId,
    storyLink, answersCount, finish,
    setNextQuestionId, setIsRightAnswersCount, attachAnswer, resetQuiz, exit
}: QuizProps) => {
    const isRight = useRef<number>(isRightAnswersCount);

    const questionsCount = useMemo<number>(() => (Array.isArray(questionIds) && questionIds.length) || 0, [questionIds]);
    const shareStory = useCallback(() => showStoryBox(storyLink), [storyLink]);

    const incrementIsRight = useCallback((count: number) => {
        isRight.current += count;
    }, []);

    const reset = useCallback(() => {
        isRight.current = 0;
        resetQuiz();
    }, [resetQuiz]);

    useEffect(() => () => {
        console.log(1);
        console.log(isRight.current);

        if (!finish) {
            setNextQuestionId();
            setIsRightAnswersCount(isRight.current);
        }
    }, [finish, setNextQuestionId, setIsRightAnswersCount]);

    const maskView = useMemo(() => {
        if (nextQuestionId === null) {
            return null;
        }

        const { image } = questions[nextQuestionId];

        return (
            <div
                className="Quiz__mask"
                style={{
                    backgroundImage: `
                        linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
                        url(${(supportWebp) ? image.webp.x1 : image.jpg.x1})
                    `,
                }} />
        );
    }, [questions, nextQuestionId]);

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
        const result = (isRight.current / answersCount) * 100 || 0;
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
                            onClick={reset}>
                            Повторить квиз<br />заново
                        </Button>}

                    <Button
                        shape="circle"
                        icon={<IconHome />}
                        onClick={exit}>
                        Вернуться<br />на главную
                    </Button>
                </Group>
                {(showPrize) && <WWFPrize className="margin-pink--top" />}
            </Transition>
        );
    }, [finish, answersCount, shareStory, reset, exit]);

    const bodyView = useMemo(() => (nextQuestionId !== null)
        ? questionIds.map(questionView)
        : resultView,
        [nextQuestionId, questionIds, questionView, resultView]);

    return (
        <div className="Quiz">
            {maskView}
            {bodyView}
        </div>
    );
};

export default memo(Quiz);