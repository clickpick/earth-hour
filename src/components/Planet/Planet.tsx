import React, { FC, HTMLAttributes, useMemo, memo } from 'react';
import cn from 'classnames';

import { HasChildren } from '../../types/props';

import Group from '../Group';
import Title from '../Title';
import Footnote from '../Footnote';

import { ReactComponent as PlanetBest } from '../../svg/planet-best.svg';
import { ReactComponent as PlanetGood } from '../../svg/planet-good.svg';
import { ReactComponent as PlanetBad } from '../../svg/planet-bad.svg';
import { ReactComponent as PlanetLock } from '../../svg/planet-lock.svg';

export interface PlanetProps extends HTMLAttributes<HTMLDivElement>, HasChildren {
    mood: 'best' | 'good' | 'bad' | 'lock',
    title: string,
    message: string
}

const Planet: FC<PlanetProps> = ({ className, mood, title, message, ...restProps }: PlanetProps) => {
    const classNames = useMemo(() => cn(className, 'Planet'), [className]);
    const planetView = useMemo(() => {
        switch (mood) {
            case 'best':
                return <PlanetBest className="Planet__planet margin-aqua--right" width="100" height="100" />;
            case 'bad':
                return <PlanetBad className="Planet__planet margin-aqua--right" width="100" height="100" />;
            case 'lock':
                return <PlanetLock className="Planet__planet margin-aqua--right" width="100" height="100" />;
            default:
                return <PlanetGood className="Planet__planet margin-aqua--right" width="100" height="100" />;
        }
    }, [mood]);

    return (
        <Group className={classNames} end {...restProps}>
            {planetView}
            <Group vertical className="Planel__bubble padding-yellow--tb padding-blue--rl">
                <Title className="margin-aqua--bottom" children={title} />
                <Footnote className="color-opacity--secondary" children={message} />
            </Group>
        </Group>
    );
};

export default memo(Planet);