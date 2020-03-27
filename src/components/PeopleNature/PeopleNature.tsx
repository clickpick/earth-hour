import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Headline from '../../components/Headline';
import Footnote from '../../components/Footnote';
import Group from '../../components/Group';

export interface PeopleNatureProps extends HTMLAttributes<HTMLDivElement> { }

const PeopleNature: FC<PeopleNatureProps> = ({ className, ...restProps }: PeopleNatureProps) => {
    return (
        <Group
            vertical
            center
            className={cn(className, 'padding-blue--top padding-blue--bottom padding-orange--rl')}
            {...restProps}>
            <img
                src="./images/people-nature.jpg"
                alt="people-nature"
                className="margin-aqua--bottom Br(16)"
                width="70"
                height="70" />
            <Headline>Люди – Природе</Headline>
            <Footnote className="margin-purple--bottom Ta(c) color-opacity--secondary">
                Онлайн-платформа для обмена экологическими инициативами.
                Тут каждый может поделиться своим успехом и получить совет от единомышленников.
            </Footnote>
        </Group>
    );
};

export default memo(PeopleNature);