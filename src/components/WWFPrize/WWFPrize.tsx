import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import { Links } from '../../config';

import Group from '../Group';
import Headline from '../Headline';
import Footnote from '../Footnote';
import Button from '../Button';

import { ReactComponent as Prize } from '../../svg/prize.svg';
import { ReactComponent as IconVK } from '../../svg/vk.svg';
import { ReactComponent as IconEarth } from '../../svg/earth.svg';

export interface WWFPrizeProps extends HTMLAttributes<HTMLDivElement> { }

const WWFPrize: FC<WWFPrizeProps> = ({ className, ...restProps }: WWFPrizeProps) => {
    return (
        <Group vertical center className={cn(className, 'padding-blue')} {...restProps}>
            <Prize className="margin-aqua--bottom" />
            <Headline>Подарок от WWF</Headline>
            <Footnote className="margin-purple--bottom padding-blue--rl Ta(c) color-opacity--secondary">
                Чтобы забрать подарок, нужно быть
                подписанным на группу WWF
                и пройти тест на сайте акции
            </Footnote>
            <Group>
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

export default memo(WWFPrize);