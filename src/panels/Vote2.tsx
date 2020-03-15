import React, { FC, useCallback } from 'react';

import bridge from '@vkontakte/vk-bridge';

import { Panel, PanelHeaderSimple, PanelHeaderBack } from '@vkontakte/vkui';
import Group from '../components/Group';
import Button from '../components/Button';
import About from '../components/About';

import { ReactComponent as IconNotification } from '../svg/notification.svg';

export interface VoteProps {
    id: string,
    goBack: () => void
}

const Vote2: FC<VoteProps> = ({ id, goBack }: VoteProps) => {
    const allowNotification = useCallback(() => {
        bridge.send('VKWebAppAllowNotifications', {});
    }, []);

    return (
        <Panel id={id} separator={false}>
            <PanelHeaderSimple left={<PanelHeaderBack onClick={goBack} />} separator={false} />
            <Group className="margin-pink--bottom" vertical center>
                <Button
                    shape="circle"
                    icon={<IconNotification />}
                    onClick={allowNotification}>
                    Уведомить, когда<br />квиз станет доступным
                </Button>
            </Group>
            <About />
        </Panel>
    );
};

export default Vote2;