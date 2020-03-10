import React, { FC, useEffect } from 'react';

import '../styles/style.css';

import useVote from '../hooks/use-vote';

import { ConfigProvider, Root } from '@vkontakte/vkui';
import Home from '../views/Home';

const App: FC = () => {
    const { getQuestions } = useVote();

    useEffect(() => { getQuestions(); }, [getQuestions]);

    return (
        <ConfigProvider isWebView={true}>
            <Root activeView="home">
                <Home id="home" />
            </Root>
        </ConfigProvider>
    );
};

export default App;