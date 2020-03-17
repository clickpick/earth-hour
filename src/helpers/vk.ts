import bridge from '@vkontakte/vk-bridge';
import { Links } from '../config';

export const share = (link: string) => bridge.send('VKWebAppShare', { link });
export const shareApp = () => share(Links.APP_LINK);

export const showStoryBox = (stickerUrl: string) =>
    bridge.send('VKWebAppShowStoryBox', {
        background_type: 'none',
        stickers: [
            {
                sticker_type: 'renderable',
                sticker: {
                    content_type: 'image',
                    url: stickerUrl,
                    transform: {
                        translation_y: 0.08,
                        relation_width: 0.6,
                        gravity: 'right_top'
                    },
                }
            }
        ]
    });