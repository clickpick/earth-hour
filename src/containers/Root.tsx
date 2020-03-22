import React, { FC, useState, useEffect } from 'react';
import { Provider } from 'react-redux';

import App from './App';
import Offline from '../components/Offline';

export interface RootProps {
    store: any
}

const Root: FC<RootProps> = ({ store }: RootProps) => {
    const [showOffline, setShowOffline] = useState<boolean>(false);

    useEffect(() => {
        function handleOnlineStatus() {
            setShowOffline(!navigator.onLine);
        }

        window.addEventListener('online', handleOnlineStatus);
        window.addEventListener('offline', handleOnlineStatus);
    }, []);

    return (
        <Provider store={store}>
            <App />
            <Offline visible={showOffline} />
        </Provider>
    );
};

export default Root;