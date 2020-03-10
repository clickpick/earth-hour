import React, { FC, HTMLAttributes, useMemo, memo } from 'react';
import cn from 'classnames';

import { HasChildren } from '../../types/props';

export interface GroupProps extends HTMLAttributes<HTMLDivElement>, HasChildren {
    vertical?: boolean,
    center?: boolean
}

const Group: FC<GroupProps> = ({ className, vertical, center, ...restProps }: GroupProps) => {
    const classNames = useMemo(() => cn(className, 'Group', {
        'Group--vertical': vertical,
        'Group--center': center
    }), [className, vertical, center]);

    return <div className={classNames} {...restProps} />;
};

export default memo(Group);