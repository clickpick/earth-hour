import React, {
    FC, HTMLAttributes, ReactNode,
    useMemo,
    memo
} from 'react';
import cn from 'classnames';

import { HasChildren } from '../../types/props';

import Caption from '../Caption';

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement>, HasChildren {
    shape?: 'round' | 'circle',
    icon?: ReactNode
}

const Button: FC<ButtonProps> = ({ className, shape, children, icon, ...restProps }: ButtonProps) => {
    const classNames = useMemo(() => cn(className, 'Button', 'Bs(bb)', 'Bs(bb)--all', 'padding-yellow', {
        [`Button--${shape}`]: shape
    }), [className, shape]);

    const contentView = useMemo(() => {
        if (shape === 'circle') {
            return (
                <div className="Button__content">
                    <div className="Button__icon margin-aqua--bottom" children={icon} />
                    <Caption children={children} />
                </div>
            );
        }

        return (
            <div className="Button__content" children={children} />
        );
    }, [shape, children, icon]);

    return (
        <button className={classNames} {...restProps}>
            {contentView}
        </button>
    );
};

Button.defaultProps = {
    shape: 'round'
};

export default memo(Button);