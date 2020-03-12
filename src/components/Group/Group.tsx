import React, { FC, HTMLAttributes, useMemo, memo } from 'react';
import cn from 'classnames';

import { HasChildren } from '../../types/props';

export interface GroupProps extends HTMLAttributes<HTMLDivElement>, HasChildren {
    vertical?: boolean,
    center?: boolean,
    start?: boolean,
}

const Group: FC<GroupProps> = ({ className, vertical, center, start, ...restProps }: GroupProps) => {
    const classNames = useMemo(() => cn(className, 'Group', {
        'Group--vertical': vertical,
        'Group--center': center,
        'Group--start': start
    }), [className, vertical, center, start]);

    return <div className={classNames} {...restProps} />;
};

export default memo(Group);