import React, { FC, useMemo, useEffect } from 'react';

import { PanelSecondary } from '../types/props';
import useVote from '../hooks/use-vote';

import { Panel, PanelHeaderSimple, PanelHeaderBack } from '@vkontakte/vkui';
import Question from '../components/Question';

export interface VoteProps extends PanelSecondary { }

const Vote: FC<VoteProps> = ({ id, goBack }: VoteProps) => {
    const { questionIds, questions, nextQuestionId, setNextQuestionId, attachAnswer } = useVote();

    useEffect(() => () => { setNextQuestionId(); }, [setNextQuestionId]);

    const bodyView = useMemo(() => (!questionIds)
        ? <h1>А где вопросы?</h1>
        : <Question
            className="padding-blue"
            {...questions[nextQuestionId]}
            currentQuestionNumber={questionIds.indexOf(nextQuestionId) + 1}
            questionsCount={questionIds.length}
            goNext={setNextQuestionId}
            attachAnswer={attachAnswer} />,
        [questionIds, questions, nextQuestionId, setNextQuestionId, attachAnswer]);

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