import React, { FC, useEffect } from 'react';

import '../styles/style.css';

import useUser from '../hooks/use-user';
import useVote from '../hooks/use-vote';

import { ConfigProvider, Root } from '@vkontakte/vkui';
import Home from '../views/Home';

const App: FC = () => {
    const { getQuestions } = useVote();
    const { auth } = useUser();

    useEffect(() => {
        getQuestions();
        auth();
    }, [getQuestions, auth]);

    return (
        <ConfigProvider isWebView={true}>
            <Root activeView="home">
                <Home id="home" />
            </Root>
        </ConfigProvider>
    );
};

export default App;