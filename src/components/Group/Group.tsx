import React, { FC, HTMLAttributes, useMemo, memo } from 'react';
import cn from 'classnames';

import { HasChildren } from '../../types/props';

export interface GroupProps extends HTMLAttributes<HTMLDivElement>, HasChildren {
    vertical?: boolean,
    center?: boolean,
    start?: boolean,
    end?: boolean,
}

const Group: FC<GroupProps> = ({ className, vertical, center, start, end, ...restProps }: GroupProps) => {
    const classNames = useMemo(() => cn(className, 'Group', {
        'Group--vertical': vertical,
        'Group--center': center,
        'Group--start': start,
        'Group--end': end
    }), [className, vertical, center, start, end]);

    return <div className={classNames} {...restProps} />;
};

export default memo(Group);