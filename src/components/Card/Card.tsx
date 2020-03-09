import React, {
    FC, HTMLAttributes, SyntheticEvent,
    useMemo, useCallback,
    memo
} from 'react';
import cn from 'classnames';

import Headline from '../Headline';
import Caption from '../Caption';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    size?: 'medium' | 'large',
    title: string,
    hint?: string,
    poster?: string,
    disabled?: boolean
}

const Card: FC<CardProps> = ({ className, size, poster, title, hint, disabled, style, onClick, ...restProps }: CardProps) => {
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
        <Caption className="D(ib) margin-tomato--top" children={hint} />,
        [hint]);

    const contentView = useMemo(() =>
        <div className={cn('Card__content', {
            'padding-blue': size === 'large',
            'color-opacity--secondary': disabled
        })}>
            <Headline children={title} />
            {hintView}
        </div>,
        [size, disabled, title, hintView]);

    const handleClick = useCallback((e) => {
        if (disabled) {
            return;
        }

        if (onClick) {
            onClick(e);
        }
    }, [disabled, onClick]);

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