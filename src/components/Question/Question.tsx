import React, { FC, useRef, useState, useCallback, useMemo, useEffect, memo } from 'react';
import cn from 'classnames';

import { Question as IQuestion, Answer as IAnswer } from '../../types/store';

import bridge from '@vkontakte/vk-bridge';

import Caption from '../Caption';
import Headline from '../Headline';
import Answer from '../Answer';
import Group from '../Group';
import Card from '../Card';
import Button from '../Button';

import posterQuiz from '../../images/poster-quiz.png';
import { ReactComponent as IconReply } from '../../svg/reply.svg';
import { ReactComponent as IconUnion } from '../../svg/union.svg';
import { ReactComponent as IconNext } from '../../svg/next.svg';

export interface QuestionProps extends IQuestion {
    className?: string,
    currentQuestionNumber: number,
    questionsCount: number,
    goNext(): void
}

const Question: FC<QuestionProps> = ({ className, currentQuestionNumber, questionsCount, question, storyLink, comment, answers, goNext }: QuestionProps) => {
    const classNames = useMemo(() => cn(className, 'Question'), [className]);

    const [showQuestion, setShowQuestion] = useState<boolean>(true);
    const hideQuestion = useCallback(() => setShowQuestion(false), []);

    const isRight = useRef<boolean>(false);
    const [showResult, setShowResult] = useState<boolean>(false);

    const [next, setNext] = useState<boolean>(false);
    const hideResult = useCallback(() => setNext(true), []);

    const handleAnswer = useCallback((e: any) => {
        const hasRight = e.target.dataset.t;

        isRight.current = hasRight === '1';
        bridge.send('VKWebAppTapticNotificationOccurred', { type: (isRight.current) ? 'success' : 'error' });
        setShowResult(true);
    }, []);

    const handleShareFriends = useCallback(() => {
        bridge.send('VKWebAppShare', { link: storyLink });
    }, [storyLink]);

    const handleShareStory = useCallback(() => {
        bridge.send('VKWebAppShowStoryBox', {
            background_type: 'none',
            stickers: [
                {
                    sticker_type: 'renderable',
                    sticker: {
                        content_type: 'image',
                        url: storyLink,
                        transform: {
                            translation_y: 0.08,
                            relation_width: 0.6,
                            gravity: 'right_top'
                        },
                    }
                }
            ]
        });
    }, [storyLink]);

    useEffect(() => {
        setShowResult(false);
        setShowQuestion(true);
        setNext(false);
        isRight.current = false;
    }, [question]);

    const hintView = useMemo(() =>
        <Caption className="color-opacity--secondary">Вопрос {currentQuestionNumber} из {questionsCount}</Caption>,
        [currentQuestionNumber, questionsCount]);

    const answersView = useMemo(() =>
        answers.map((answer: IAnswer) =>
            <Answer
                key={answer.id}
                className="margin-purple--bottom"
                children={answer.answer}
                data-t={Number(answer.isRight)}
                onClick={handleAnswer} />),
        [answers, handleAnswer]);

    const questionView = useMemo(() => {
        if (showQuestion) {
            const classNames = cn('Question__Group', 'Question__Group--question', {
                'Question__Group--fade-enter': showQuestion,
                'Question__Group--slide-left-leave': showResult && !isRight.current,
                'Question__Group--slide-right-leave': showResult && isRight.current
            });

            const handleAnimationEnd = (showResult) ? hideQuestion : undefined;

            return (
                <div className={classNames} onAnimationEnd={handleAnimationEnd}>
                    <Group className="padding-blue" vertical>
                        {hintView}
                        <Headline className="margin-aqua--bottom">{question}</Headline>
                        <img className="margin-pink--bottom" src={posterQuiz} alt="Час Земли" width="100%" height="131" />
                        {answersView}
                    </Group>
                </div>
            );
        }

        return null;
    }, [showQuestion, showResult, hintView, question, answersView, hideQuestion]);

    const resultActionsView = useMemo(() => {
        const hasNextQuestion = currentQuestionNumber !== questionsCount;

        return (
            <Group className="margin-aqua--top" start>
                <Button
                    className="margin-purple--right"
                    shape="circle"
                    icon={<IconReply />}
                    onClick={handleShareFriends}
                    disabled={next}>
                    Поделиться<br />c друзьями
                </Button>
                <Button
                    shape="circle"
                    icon={<IconUnion />}
                    onClick={handleShareStory}
                    disabled={next}>
                    Поделиться<br />в сторис
                </Button>
                {(hasNextQuestion) &&
                    <Button
                        className="margin-purple--left"
                        shape="circle"
                        icon={<IconNext />}
                        onClick={hideResult}
                        disabled={next}>
                        Дальше
                    </Button>}
            </Group>
        );
    }, [currentQuestionNumber, questionsCount, next, hideResult, handleShareFriends, handleShareStory]);

    const resultView = useMemo(() => {
        if (showResult) {
            const classNames = cn('Question__Group', 'Question__Group--result', {
                'Question__Group--fade-enter': showResult,
                'Question__Group--fade-leave': next
            });
            const title = (isRight.current) ? 'Верно!' : 'Почти...';
            const handleAnimationEnd = (next) ? goNext : undefined;

            return (
                <div className={classNames} onAnimationEnd={handleAnimationEnd}>
                    <Group className="padding-blue" vertical center>
                        <Card
                            className="margin-aqua--bottom"
                            size="large"
                            children={title}
                            hint={comment}
                            poster={posterQuiz} />
                        {hintView}
                        {resultActionsView}
                    </Group>
                </div>
            );
        }

        return null;
    }, [showResult, comment, next, hintView, resultActionsView, goNext]);

    return (
        <div className={classNames}>
            {questionView}
            {resultView}
        </div>
    );
};

export default memo(Question);