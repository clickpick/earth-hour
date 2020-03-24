import bridge from '@vkontakte/vk-bridge';
import { Links, WWF_GROUP_ID } from '../config';

type AllowCallback = (result: boolean) => void

export const share = (link: string) => bridge.send('VKWebAppShare', { link });
export const shareApp = () => share(Links.APP_LINK);

export const showStoryBox = (stickerUrl: string) =>
    bridge.send('VKWebAppShowStoryBox', {
        background_type: 'none',
        attachment: {
            text: 'Пройти квиз',
            type: 'url',
            url: Links.APP_LINK,
        },
        stickers: [
            {
                sticker_type: 'renderable',
                sticker: {
                    content_type: 'image',
                    url: stickerUrl,
                    can_delete: false,
                    transform: {
                        translation_y: 0.08,
                        relation_width: 0.6,
                        gravity: 'right_top'
                    },
                    clickable_zones: [{
                        action_type: 'link',
                        action: { link: Links.APP_LINK, tooltip_text_key: 'Пройти квиз' },
                        clickable_area: [
                            { x: 0, y: 0 },
                            { x: 1029, y: 0 },
                            { x: 1029, y: 1242 },
                            { x: 0, y: 1242 }
                        ]
                    }]
                },
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
