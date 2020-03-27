import React, { FC, HTMLAttributes, useCallback, memo } from 'react';
import cn from 'classnames';

import useUser from '../../hooks/use-user';
import { allowMessages } from '../../helpers/vk';

import Group from '../Group';
import Footnote from '../Footnote';
import Button from '../Button';

import { ReactComponent as IconMessage } from '../../svg/message.svg';

export interface AllowMessagesProps extends HTMLAttributes<HTMLDivElement> {
    successCallback?(): void
}

const AllowMessages: FC<AllowMessagesProps> = ({ className, successCallback }: AllowMessagesProps) => {
    const { data, toggleMessages } = useUser();

    const allowMessage = useCallback(() => allowMessages((result: boolean) => {
        toggleMessages(result);

        if (successCallback && result) {
            successCallback();
        }
    }), [toggleMessages, successCallback]);

    if (!data || data.messagesAreEnabled) {
        return null;
    }

    return (
        <Group vertical center className={cn(className, 'AllowMessages padding-blue')}>
            <Footnote className="margin-purple--bottom padding-yellow--rl Ta(c)">
                Чтобы после прохождения квиза получить подарок
                от ВКонтакте, нужно разрешить сообществу WWF
                отправлять вам сообщения
            </Footnote>
            <Button
                shape="circle"
                icon={<IconMessage />}
                onClick={allowMessage}>
                Разрешить<br />сообщения
            </Button>
        </Group>
    );
};

export default memo(AllowMessages);