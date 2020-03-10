import 'core-js/features/map';
import 'core-js/features/set';

import React from 'react';
import { render } from 'react-dom';

import bridge from '@vkontakte/vk-bridge';

import configureStore from './store/configureStore';
import Root from './containers/Root';

bridge.send('VKWebAppInit');
bridge.send(
    'VKWebAppSetViewSettings',
    {
        status_bar_style: 'light',
        action_bar_color: '#FFF',
        navigation_bar_color: '#000'
    }
);

const store = configureStore();

render(<Root store={store} />, document.getElementById('root'));