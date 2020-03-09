import React, { FC, useMemo } from 'react';

import useVote from '../../hooks/use-vote';

import { Panel, PanelHeaderSimple } from '@vkontakte/vkui';
import Transition from '../../components/Transition';
import Headline from '../../components/Headline';
import Footnote from '../../components/Footnote';
import Card from '../../components/Card';

import posterQuiz from '../../images/poster-quiz.png';

export interface MainProps {
    id: string,
    goForward: (e: any) => void
}

const Main: FC<MainProps> = ({ id, goForward }: MainProps) => {
    const { questionIds } = useVote();

    const hasQuestions = useMemo(() => !!questionIds, [questionIds]);

    return (
        <Panel id={id}>
            <PanelHeaderSimple separator={false} />
            <div className="padding-orange--rl">
                <Transition in={hasQuestions} timeout={500}>
                    <Headline className="margin-purple--top margin-aqua--bottom">Час земли</Headline>
                </Transition>
                <Transition in={hasQuestions} timeout={1000}>
                    <Footnote className="color-opacity--secondary margin-pink--bottom">
                        Самая массовая экологическая
                    <br />
                        акция на планете
                </Footnote>
                </Transition>
                <Transition in={hasQuestions} timeout={1500}>
                    <Card
                        className="margin-pink--bottom"
                        poster={posterQuiz}
                        title="Всё об акции «Час земли» за 5 минут"
                        hint="Квиз (3 из 10 выполнено)"
                        data-to="vote"
                        onClick={goForward}
                        disabled />

                    <Card
                        className="margin-pink--bottom"
                        size="large"
                        poster={posterQuiz}
                        title="Всё об акции «Час земли» за 5 минут"
                        hint="Квиз (3 из 10 выполнено)"
                        data-to="vote"
                        onClick={goForward} />
                </Transition>
            </div>
        </Panel>
    );
};

export default Main;