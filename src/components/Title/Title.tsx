import { FC, HTMLAttributes, createElement, memo } from 'react';
import cn from 'classnames';

import { HasChildren } from '../../types/props';

export interface TitleProps extends HTMLAttributes<HTMLHeadingElement>, HasChildren {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const Title: FC<TitleProps> = ({ className, level = 1, children, ...restProps }: TitleProps) =>
    createElement(
        `h${level}`,
        { className: cn(className, 'Title'), ...restProps },
        children
    );

export default memo(Title);
