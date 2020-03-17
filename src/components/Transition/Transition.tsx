import React, { FC, useState, useCallback, useEffect, cloneElement, memo } from 'react';
import cn from 'classnames';

import { HasChildren } from '../../types/props';

export interface TransitionProps extends HasChildren {
    in?: boolean,
    mounted?: boolean,
    timeout?: number,
    mountOnEnter?: boolean
}

const Transition: FC<TransitionProps> = ({ in: inProp, mounted, timeout, mountOnEnter, children }: TransitionProps) => {
    const [show, setShow] = useState<boolean>(!!inProp);

    const contentView = useCallback((children) => {
        if (!children) {
            return null;
        }

        const className = cn(children.props.className, {
            'hidden': mountOnEnter && !show,
            'fade-enter': mounted,
            'fade-exit': !mounted,
            'fade-enter-active': show,
            'fade-exit-active': !show
        });

        return cloneElement(children, { className });
    }, [show, mounted, mountOnEnter]);

    useEffect(() => {
        if (!timeout) {
            setShow(!!inProp);
        }

        const timerId = setTimeout(() => {
            requestAnimationFrame(() => setShow(!!inProp));
        }, timeout);

        return () => {
            clearTimeout(timerId);
        };
    }, [inProp, timeout]);

    if (!children) {
        return null;
    }

    return <>{React.Children.map(children, contentView)}</>;
};

Transition.defaultProps = {
    mounted: true,
    timeout: 0
};

export default memo(Transition);