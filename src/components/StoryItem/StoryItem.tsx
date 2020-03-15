import React, { FC, HTMLAttributes, useMemo, memo } from 'react';
import cn from 'classnames';

import { HasChildren } from '../../types/props';

import Caption from '../Caption';

export interface StoryItemProps extends HTMLAttributes<HTMLButtonElement>, HasChildren {
    seen?: boolean,
    gradient?: 'red-orange' | 'orange-yellow' | 'green-yellow' | 'blue-green' | 'purple-aqua',
    photo: string,
    name: string,
    lastUpdated: number
}

const StoryItem: FC<StoryItemProps> = ({ className, gradient, seen, photo, name, lastUpdated, children, ...restProps }: StoryItemProps) => {
    const classNames = useMemo(() =>
        cn(className, 'StoryItem', 'padding-yellow', 'story', `StoryItem--${gradient}`, {
            'StoryItem--seen': seen
        }),
        [className, gradient, seen]);

    const photoView = useMemo(() =>
        <div
            className="StoryItem__preview item-preview"
            style={{ backgroundImage: `url(${photo})` }}>
            <img src={photo} alt="" />
        </div>,
        [photo]);

    return (
        <button className={classNames} {...restProps}>
            <div className="item-link StoryItem__wrapper">
                <div className="StoryItem__photo-wrapper margin-aqua--bottom" children={photoView} />
                <div className="info StoryItem__info" itemProp="author" itemType="http://schema.org/Person">
                    <Caption
                        className="name color-opacity--secondary StoryItem__name"
                        itemProp="name"
                        children={name} />
                    <span className="time StoryItem__time">{lastUpdated}</span>
                </div>
            </div>
        </button>
    );
};

StoryItem.defaultProps = {
    gradient: 'red-orange'
};

export default memo(StoryItem);