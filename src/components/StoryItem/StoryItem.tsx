import React, { FC, HTMLAttributes, useMemo, memo } from 'react';
import cn from 'classnames';

import { HasChildren } from '../../types/props';

import Caption from '../Caption';

export interface StoryItemProps extends HTMLAttributes<HTMLButtonElement>, HasChildren {
    preview: string,
    gradient?: 'red-orange' | 'orange-yellow' | 'green-yellow' | 'blue-green' | 'purple-aqua'
}

const StoryItem: FC<StoryItemProps> = ({ className, gradient, preview, children, ...restProps }: StoryItemProps) => {
    const classNames = useMemo(() =>
        cn(className, 'StoryItem', 'padding-yellow', `StoryItem--${gradient}`),
        [className, gradient]);

    const previewView = useMemo(() =>
        <div
            className="StoryItem__preview"
            style={{ backgroundImage: `url(${preview})` }} />,
        [preview]);

    const contentView = useMemo(() => (!!children) &&
        <Caption className="margin-aqua--top color-opacity--secondary" children={children} />,
        [children]);

    return (
        <button className={classNames} {...restProps}>
            <div className="StoryItem__wrapper" children={previewView} />
            {contentView}
        </button>
    );
};

StoryItem.defaultProps = {
    gradient: 'red-orange'
};

export default memo(StoryItem);