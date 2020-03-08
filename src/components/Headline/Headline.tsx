import { FC, HTMLAttributes, createElement, memo } from 'react';
import cn from 'classnames';

import { HasChildren } from '../../types/props';

export interface HeadlineProps extends HTMLAttributes<HTMLHeadingElement>, HasChildren {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const Headline: FC<HeadlineProps> = ({ className, level = 1, children, ...restProps }: HeadlineProps) =>
    createElement(
        `h${level}`,
        { className: cn(className, 'Headline'), ...restProps },
        children
    );

export default memo(Headline);
