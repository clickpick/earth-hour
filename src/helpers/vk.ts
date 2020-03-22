import bridge from '@vkontakte/vk-bridge';
import { Links, WWF_GROUP_ID } from '../config';

type AllowCallback = (result: boolean) => void

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

export const tapticNotification = (type: 'success' | 'warning' | 'error') =>
    bridge.send('VKWebAppTapticNotificationOccurred', { type });

async function allowHelper(method: 'VKWebAppAllowMessagesFromGroup' | 'VKWebAppAllowNotifications', config?: any, callback?: AllowCallback) {
    try {
        const response: any = await bridge.sendPromise(method, config);

        if (typeof callback === 'function') {
            callback(response.result);
        }
    } catch (e) { }
}


export const allowMessages = (callback?: AllowCallback | any) =>
    allowHelper('VKWebAppAllowMessagesFromGroup', { group_id: WWF_GROUP_ID }, callback);

export const allowNotifications = (callback?: AllowCallback) =>
    allowHelper('VKWebAppAllowNotifications', undefined, callback);
