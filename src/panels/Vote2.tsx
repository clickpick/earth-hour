import React, { FC, useCallback } from 'react';

import useUser from '../hooks/use-user';
import bridge from '@vkontakte/vk-bridge';

import { Panel, PanelHeaderSimple, PanelHeaderBack } from '@vkontakte/vkui';
import Planet from '../components/Planet';
import Transition from '../components/Transition';
import Group from '../components/Group';
import Button from '../components/Button';
import About from '../components/About';

import { ReactComponent as IconNotification } from '../svg/notification.svg';

export interface VoteProps {
    id: string,
    goBack: () => void
}

const Vote2: FC<VoteProps> = ({ id, goBack }: VoteProps) => {
    const { pending, data, toggleNotifications } = useUser();

    const allowNotification = useCallback(async () => {
        try {
            const response = await bridge.sendPromise('VKWebAppAllowNotifications');

            if (response.result) {
                toggleNotifications(true);
            }
        } catch (e) { }
    }, [toggleNotifications]);

    return (
        <Panel id={id} separator={false}>
            <PanelHeaderSimple left={<PanelHeaderBack onClick={goBack} />} separator={false} />

            <Planet
                className="margin-pink--bottom padding-blue--rl"
                mood="lock"
                title="Этот квиз будет доступен 28 марта"
                message="После его прохождения ты сможешь получить подарок от WWF." />
            <Transition in={!data?.notificationsAreEnabled} mountOnEnter>
                <Group className="margin-pink--bottom" vertical center>
                    <Button
                        shape="circle"
                        icon={<IconNotification />}
                        onClick={allowNotification}
                        disabled={pending}>
                        Уведомить, когда<br />квиз станет доступным
                </Button>
                </Group>
            </Transition>
            <About />
        </Panel>
    );
};

export default Vote2;