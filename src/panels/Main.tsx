import React, { FC, useMemo } from 'react';

import { PanelPrimary } from '../types/props';
import { HomePanels } from '../types/panels';

import useVote from '../hooks/use-vote';

import { stories } from '../stories';

import { Panel, PanelHeaderSimple } from '@vkontakte/vkui';
import Transition from '../components/Transition';
import Headline from '../components/Headline';
import Footnote from '../components/Footnote';
import Card from '../components/Card';
import Group from '../components/Group';
import Stories from '../components/Stories';
import About from '../components/About';

import posterQuiz2 from '../images/poster-quiz-2-mini.png';

export interface MainProps extends PanelPrimary { }

const Main: FC<MainProps> = ({ id, goForward }: MainProps) => {
    const { questionIds, answers, finish } = useVote();

    const hasQuestions = useMemo(() => !!questionIds, [questionIds]);

    const quizMessage = useMemo(() => (finish)
        ? 'Квиз выполнен'
        : `Квиз (${answers.length} из ${questionIds?.length} выполнено)`,
        [finish, answers, questionIds]);

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
                <Stories className="margin-pink--bottom" stories={stories} />
                <Group className="margin-pink--bottom padding-orange--rl" vertical>
                    <Card
                        className="margin-pink--bottom"
                        poster={posterQuiz2}
                        hint={quizMessage}
                        data-to={HomePanels.VOTE}
                        onClick={goForward}>
                        Узнай, кто ты для планеты, и получи подарок от VK и WWF
                    </Card>
                    <About />
                </Group>
            </Transition>
        </Panel>
    );
};

export default Main;