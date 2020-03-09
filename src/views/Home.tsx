import React, { FC } from 'react';

import usePanels from '../hooks/use-panels';

import { View } from '@vkontakte/vkui';
import Main from '../panels/Main';
import Vote from '../panels/Vote';

export interface HomeProps {
    id: string
}

export enum HomePanels {
    MAIN = 'main',
    VOTE = 'vote'
}

const Home: FC<HomeProps> = ({ id }: HomeProps) => {
    const [activePanel, history, goForward, goBack] = usePanels(HomePanels.MAIN);

    return (
        <View
            id={id}
            activePanel={activePanel}
            history={history}
            header={false}
            onSwipeBack={goBack}>
            <Main id={HomePanels.MAIN} goForward={goForward} />
            <Vote id={HomePanels.VOTE} goBack={goBack} />
        </View>
    );
};

export default Home;