import React, { FC, useState, useCallback, useEffect, memo } from 'react';
import cn from 'classnames';

import Planet from '../Planet';

export interface OfflineProps {
    visible?: boolean
}

export type AnimationType = 'enter' | 'leave';

const Offline: FC<OfflineProps> = ({ visible = false }: OfflineProps) => {
    const [show, setShow] = useState<boolean>(visible);
    const [animationType, setAnimationType] = useState<AnimationType>('leave');

    const handleAnimnationEnd = useCallback(() => {
        if (animationType === 'leave') {
            setShow(false);
        }
    }, [animationType]);

    useEffect(() => {
        if (visible && !show) {
            setShow(true);
            setAnimationType('enter')
        } else if (show && !visible) {
            setAnimationType('leave');
        }
    }, [visible, show]);

    if (!show) {
        return null;
    }

    return (
        <div className={cn('Offline', `Offline--${animationType}`)} onAnimationEnd={handleAnimnationEnd}>
            <div className="Offline__mask" />
            <Planet
                className="Offline__Planet"
                mood="lock"
                title="А где Интернет?"
                message="Без доступа в Интернет мы не сможешь работать" />
        </div>
    );
};

export default memo(Offline);