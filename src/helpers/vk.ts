import bridge from '@vkontakte/vk-bridge';
import { Links } from '../config';

export const share = (link: string) => bridge.send('VKWebAppShare', { link });
export const shareApp = () => share(Links.APP_LINK);

