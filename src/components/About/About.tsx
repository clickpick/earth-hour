import React, { FC, HTMLAttributes, useCallback, memo } from 'react';

import bridge from '@vkontakte/vk-bridge';
import { Links } from '../../config';

import Headline from '../../components/Headline';
import Footnote from '../../components/Footnote';
import Group from '../../components/Group';
import Button from '../../components/Button';

import { ReactComponent as WWFLogo } from '../../svg/wwf.svg';
import { ReactComponent as IconReply } from '../../svg/reply.svg';
import { ReactComponent as IconVK } from '../../svg/vk.svg';
import { ReactComponent as IconEarth } from '../../svg/earth.svg';

export interface AboutProps extends HTMLAttributes<HTMLDivElement> { }

const About: FC<AboutProps> = (props: AboutProps) => {
    const handleShareApp = useCallback(() => {
        bridge.send('VKWebAppShare', { link: Links.APP_LINK });
    }, []);

    return (
        <Group vertical center {...props}>
            <WWFLogo className="margin-aqua--bottom" />
            <Headline>WWF Россия</Headline>
            <Footnote className="margin-purple--bottom color-opacity--secondary">Организатор акции</Footnote>
            <Group>
                <Button
                    className="margin-purple--right"
                    shape="circle"
                    icon={<IconReply />}
                    onClick={handleShareApp}>
                    Поделиться<br />приложением
                </Button>
                <Button
                    className="margin-purple--right"
                    shape="circle"
                    icon={<IconVK />}
                    href={Links.WWF}>
                    Перейти<br />в группу
                </Button>
                <Button
                    shape="circle"
                    icon={<IconEarth />}
                    href={Links.WWF_60}>
                    Перейти <br />на сайт акции
                </Button>
            </Group>
        </Group>
    );
};

export default memo(About);