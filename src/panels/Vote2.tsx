import React, { FC, useCallback, useMemo } from 'react';

import useUser from '../hooks/use-user';
import { allowNotifications, allowMessages } from '../helpers/vk';

import { Panel, PanelHeaderSimple, PanelHeaderBack } from '@vkontakte/vkui';
import Planet from '../components/Planet';
import Group from '../components/Group';
import Button from '../components/Button';
import About from '../components/About';

import { ReactComponent as IconNotification } from '../svg/notification.svg';
import { ReactComponent as IconMessages } from '../svg/messages.svg';

export interface VoteProps {
    id: string,
    goBack: () => void
}

const Vote2: FC<VoteProps> = ({ id, goBack }: VoteProps) => {
    const { pending, data, toggleMessages, toggleNotifications } = useUser();

    const allowMessage = useCallback(() => allowMessages(toggleMessages), [toggleMessages]);
    const allowNotification = useCallback(() => allowNotifications(toggleNotifications), [toggleNotifications]);

    const actionsView = useMemo(() => {
        if (data?.notificationsAreEnabled && data.messagesAreEnabled) {
            return null;
        }

        return (
            <Group className="margin-pink--bottom" jcCenter start>
                {(!data?.messagesAreEnabled) &&
                    <Button
                        className="margin-purple--right"
                        shape="circle"
                        icon={<IconMessages />}
                        onClick={allowMessage}
                        disabled={pending}>
                        Подписаться<br />
                        на сообщения<br />
                        WWF России
                    </Button>}
                {(!data?.notificationsAreEnabled) &&
                    <Button
                        shape="circle"
                        icon={<IconNotification />}
                        onClick={allowNotification}
                        disabled={pending}>
                        Уведомить,<br />
                        когда квиз<br />станет доступным
                    </Button>}
            </Group>
        );
    }, [data, pending, allowNotification, allowMessage]);

    return (
        <Panel id={id} separator={false}>
            <PanelHeaderSimple left={<PanelHeaderBack onClick={goBack} />} separator={false} />

            <Planet
                className="margin-pink--bottom padding-blue--rl"
                mood="lock"
                title="Этот квиз будет доступен 28 марта"
                message="После его прохождения ты сможешь получить подарок от VK и WWF." />

            {actionsView}

            <About />
        </Panel>
    );
};

export default Vote2;