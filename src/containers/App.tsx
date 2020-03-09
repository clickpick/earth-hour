import React, { FC, useEffect } from 'react';

import '../styles/style.css';

import useVote from '../hooks/use-vote';

import { Root } from '@vkontakte/vkui';
import Home from '../views/Home';

const App: FC = () => {
    const { getQuestions } = useVote();

    useEffect(() => { getQuestions(); }, [getQuestions]);

    return (
        <Root activeView="home">
            <Home id="home" />
        </Root>
    );
};

export default App;