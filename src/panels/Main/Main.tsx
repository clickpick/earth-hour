import React, { FC, useMemo, useCallback } from 'react';

import useVote from '../../hooks/use-vote';

import bridge from '@vkontakte/vk-bridge';
import { Links } from '../../config';

import { Panel, PanelHeaderSimple, HorizontalScroll } from '@vkontakte/vkui';
import Transition from '../../components/Transition';
import Headline from '../../components/Headline';
import Footnote from '../../components/Footnote';
import Card from '../../components/Card';
import Group from '../../components/Group';
import StoryItem from '../../components/StoryItem';
import Button from '../../components/Button';

import posterQuiz from '../../images/poster-quiz.png';
import posterQuiz2 from '../../images/poster-quiz-2.jpg';
import { ReactComponent as WWFLogo } from '../../svg/wwf.svg';
import { ReactComponent as IconReply } from '../../svg/reply.svg';
import { ReactComponent as IconVK } from '../../svg/vk.svg';
import { ReactComponent as IconEarth } from '../../svg/earth.svg';

export interface MainProps {
    id: string,
    goForward: (e: any) => void
}

const Main: FC<MainProps> = ({ id, goForward }: MainProps) => {
    const { questionIds, answers } = useVote();

    const hasQuestions = useMemo(() => !!questionIds, [questionIds]);

    const handleShareApp = useCallback(() => {
        bridge.send('VKWebAppShare', { link: Links.APP_LINK });
    }, []);

    return (
        <Panel id={id} separator={false}>
            <PanelHeaderSimple separator={false} />
            <Transition in={hasQuestions} timeout={500}>
                <Headline className="margin-purple--top margin-aqua--bottom padding-orange--rl">Час Земли</Headline>
            </Transition>
            <Transition in={hasQuestions} timeout={2000}>
                <div className="padding-orange--rl">
                    <Footnote className="color-opacity--secondary margin-pink--bottom">
                        Самая массовая экологическая
                        <br />
                        акция на планете
                    </Footnote>
                </div>
            </Transition>
            <Transition in={hasQuestions} timeout={4000} mountOnEnter>
                <HorizontalScroll className="margin-pink--bottom">
                    <Group className="padding-orange--rl">
                        <StoryItem
                            className="margin-purple--right"
                            preview={posterQuiz}
                            gradient="red-orange">
                            Что такое<br />«Час Земли»
                        </StoryItem>
                        <StoryItem
                            className="margin-purple--right"
                            preview=""
                            gradient="orange-yellow">
                            С чего всё<br />начиналось
                        </StoryItem>
                        <StoryItem
                            className="margin-purple--right"
                            preview=""
                            gradient="green-yellow">
                            Подарок<br />от WWF
                        </StoryItem>
                        <StoryItem
                            className="margin-purple--right"
                            preview=""
                            gradient="blue-green">
                            Час Земли<br />в России
                        </StoryItem>
                        <StoryItem
                            preview=""
                            gradient="purple-aqua">
                            Что будет в<br />2020 году
                        </StoryItem>
                    </Group>
                </HorizontalScroll>
                <Group className="margin-pink--bottom padding-orange--rl" vertical>
                    <Card
                        className="margin-pink--bottom"
                        poster={posterQuiz}
                        hint={`Квиз (${answers.length} из ${questionIds?.length} выполнено)`}
                        data-to="vote"
                        onClick={goForward}>
                        Всё об акции «Час Земли» за 5 минут
                    </Card>
                    <Card
                        className="margin-pink--bottom"
                        poster={posterQuiz2}
                        hint="Квиз будет доступен 28 марта">
                        Узнай, кто ты для планеты, и получи подарок от WWF
                    </Card>

                    <Group vertical center>
                        <WWFLogo className="margin-aqua--bottom" />
                        <Headline>WWF Россия</Headline>
                        <Footnote className="margin-purple--bottom color-opacity--secondary">Организатор акции</Footnote>
                        <Group>
                            <Button
                                className="margin-purple--right"
                                shape="circle"
                                icon={<IconReply />}
                                onClick={handleShareApp}>
                                Поделиться<br />приложением
                            </Button>
                            <Button
                                className="margin-purple--right"
                                shape="circle"
                                icon={<IconVK />}
                                href={Links.WWF}>
                                Перейти<br />в группу
                            </Button>
                            <Button
                                shape="circle"
                                icon={<IconEarth />}
                                href={Links.WWF_60}>
                                Перейти <br />на сайт акции
                            </Button>
                        </Group>
                    </Group>
                </Group>
            </Transition>
        </Panel>
    );
};

export default Main;