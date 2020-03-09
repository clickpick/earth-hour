import { FC, useState, useCallback, useEffect, cloneElement, memo } from 'react';
import cn from 'classnames';

import { HasChildren } from '../../types/props';

export interface TransitionProps extends HasChildren {
    in?: boolean,
    mounted?: boolean,
    timeout?: number
}

const Transition: FC<TransitionProps> = ({ in: inProp, mounted, timeout, children }: TransitionProps) => {
    const [show, setShow] = useState<boolean>(!!inProp);

    const contentView = useCallback((children) => {
        const className = cn(children.props.className, {
            'fade-enter': mounted,
            'fade-exit': !mounted,
            'fade-enter-active': show,
            'fade-exit-active': !show
        });

        return cloneElement(children, { className });
    }, [show, mounted]);

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

    return contentView(children);
};

Transition.defaultProps = {
    mounted: true,
    timeout: 0
};

export default memo(Transition);