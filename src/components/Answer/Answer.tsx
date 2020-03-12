import React, { FC, HTMLAttributes, useMemo, memo } from 'react';
import cn from 'classnames';

import { HasChildren } from '../../types/props';

export interface AnswerProps extends HTMLAttributes<HTMLButtonElement>, HasChildren { }

const Answer: FC<AnswerProps> = ({ className, ...restProps }: AnswerProps) => {
    const classNames = useMemo(() => cn(className, 'Answer', 'Footnote', 'padding-green--tb', 'padding-blue--rl'), [className]);

    return <button className={classNames} {...restProps} />;
};

export default memo(Answer);