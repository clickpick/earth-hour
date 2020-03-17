import bridge from '@vkontakte/vk-bridge';
import { Links } from '../config';

export const shareApp = () => bridge.send('VKWebAppShare', { link: Links.APP_LINK });

