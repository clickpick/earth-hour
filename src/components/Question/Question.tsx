import React, { FC, useRef, useState, useCallback, useMemo, memo } from 'react';
import cn from 'classnames';

import { Question as IQuestion, Answer as IAnswer } from '../../types/store';

import { share, showStoryBox, tapticNotification } from '../../helpers/vk';

import Caption from '../Caption';
import Title from '../Title';
import Answer from '../Answer';
import Group from '../Group';
import Card from '../Card';
import Button from '../Button';

import posterQuiz from '../../images/poster-quiz-mini.png';
import { ReactComponent as IconReply } from '../../svg/reply.svg';
import { ReactComponent as IconUnion } from '../../svg/union.svg';
import { ReactComponent as IconNext } from '../../svg/next.svg';

export interface QuestionProps extends IQuestion {
    className?: string,
    currentQuestionNumber: number,
    questionsCount: number,
    triggerAnswer(isRight: number): void,
    goNext(): void,
    attachAnswer(questionId: number, answerId: number): void
}

const Question: FC<QuestionProps> = ({
    className, id,
    currentQuestionNumber, questionsCount,
    question, storyLink, comment, answers,
    triggerAnswer, goNext, attachAnswer
}: QuestionProps) => {
    const classNames = useMemo(() => cn(className, 'Question'), [className]);

    const [showQuestion, setShowQuestion] = useState<boolean>(true);
    const hideQuestion = useCallback(() => setShowQuestion(false), []);

    const isRight = useRef<boolean>(false);
    const [showResult, setShowResult] = useState<boolean>(false);

    const [next, setNext] = useState<boolean>(false);
    const hideResult = useCallback(() => setNext(true), []);

    const handleAnswer = useCallback((e: any) => {
        const hasRight = e.target.dataset.t;
        const questionId = Number(e.target.dataset.questionId);
        const answerId = Number(e.target.dataset.answerId);

        isRight.current = hasRight === '1';
        triggerAnswer(Number(isRight.current));
        tapticNotification((isRight.current) ? 'success' : 'error');
        attachAnswer(questionId, answerId);
        setShowResult(true);
    }, [attachAnswer, triggerAnswer]);

    const handleShareFriends = useCallback((e: any) =>
        share(`https://wwf-earth-hour.ezavalishin.ru/share/${e.currentTarget.dataset.questionId}`), []);

    const handleShareStory = useCallback(() => showStoryBox(storyLink), [storyLink]);

    const hintView = useMemo(() =>
        <Caption className="color-opacity--secondary">Вопрос {currentQuestionNumber} из {questionsCount}</Caption>,
        [currentQuestionNumber, questionsCount]);

    const answersView = useMemo(() =>
        answers.map((answer: IAnswer) =>
            <Answer
                key={answer.id}
                className="margin-purple--bottom"
                children={answer.answer}
                data-question-id={id}
                data-answer-id={answer.id}
                data-t={Number(answer.isRight)}
                onClick={handleAnswer} />),
        [id, answers, handleAnswer]);

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
                        <Title className="margin-pink--bottom">{question}</Title>
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
                    data-question-id={id}
                    onClick={handleShareFriends}
                    disabled={next}>
                    Поделиться<br />c друзьями
                </Button>
                <Button
                    className="margin-purple--right"
                    shape="circle"
                    icon={<IconUnion />}
                    onClick={handleShareStory}
                    disabled={next}>
                    Поделиться<br />в сторис
                </Button>
                <Button
                    shape="circle"
                    icon={<IconNext />}
                    onClick={hideResult}
                    disabled={next}>
                    {(hasNextQuestion) ? 'Дальше' : <>Узнать<br />результат</>}
                </Button>
            </Group>
        );
    }, [id, currentQuestionNumber, questionsCount, next, hideResult, handleShareFriends, handleShareStory]);

    const resultView = useMemo(() => {
        if (showResult) {
            const classNames = cn('Question__Group', 'Question__Group--result', {
                'Question__Group--fade-enter': showResult,
                'Question__Group--fade-leave': next
            });
            const title = (isRight.current) ? 'Верно!' : 'Почти...';
            const handleAnimationEnd = (next) ? goNext : undefined;

            return (
                <div className={classNames} data-is-right={Number(isRight.current)} onAnimationEnd={handleAnimationEnd}>
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