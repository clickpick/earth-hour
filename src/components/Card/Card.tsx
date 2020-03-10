import React, {
    FC, HTMLAttributes,
    useMemo, useCallback,
    memo
} from 'react';
import cn from 'classnames';

import { HasChildren } from '../../types/props';

import Headline from '../Headline';
import Caption from '../Caption';

export interface CardProps extends HTMLAttributes<HTMLElement>, HasChildren {
    size?: 'medium' | 'large',
    hint?: string,
    poster?: string,
    disabled?: boolean,
    href?: string
}

const Card: FC<CardProps> = ({ className, href, size, poster, children, hint, disabled, style, onClick, ...restProps }: CardProps) => {
    const classNames = useMemo(() =>
        cn(className, 'Card', `Card--${size}`, 'Bs(bb)', 'Bs(bb)--all', {
            'Card--disabled': disabled
        }),
        [className, size, disabled]);

    const styles = useMemo(() => (size === 'large' && !!poster)
        ? { ...style, backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${poster})` }
        : style,
        [size, style, poster]);

    const posterView = useMemo(() => (!!poster && size === 'medium') &&
        <div className="Card__poster margin-aqua--bottom" style={{ backgroundImage: `url(${poster})` }} />,
        [poster, size]);

    const hintView = useMemo(() => (!!hint) &&
        <Caption className="D(ib) margin-tomato--top color-opacity--secondary" children={hint} />,
        [hint]);

    const contentView = useMemo(() =>
        <div className={cn('Card__content', {
            'padding-blue': size === 'large',
            'color-opacity--secondary': disabled
        })}>
            <Headline children={children} />
            {hintView}
        </div>,
        [size, disabled, children, hintView]);

    const handleClick = useCallback((e) => {
        if (disabled) {
            return;
        }

        if (onClick) {
            onClick(e);
        }
    }, [disabled, onClick]);

    if (href) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className={classNames} style={styles} {...restProps}>
                {posterView}
                {contentView}
            </a>
        );
    }

    return (
        <div className={classNames} style={styles} onClick={handleClick} {...restProps}>
            {posterView}
            {contentView}
        </div>
    );
};

Card.defaultProps = {
    size: 'medium'
};

export default memo(Card);