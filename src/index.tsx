import 'core-js/features/map';
import 'core-js/features/set';

import React from 'react';
import { render } from 'react-dom';

import bridge from '@vkontakte/vk-bridge';

import configureStore from './store/configureStore';
import Root from './containers/Root';

bridge.send('VKWebAppInit');

const store = configureStore();

render(<Root store={store} />, document.getElementById('root'));