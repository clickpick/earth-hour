import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import { HasChildren } from '../../types/props';

export interface CaptionProps extends HTMLAttributes<HTMLElement>, HasChildren { }

const Caption: FC<CaptionProps> = ({ className, ...restProps }: CaptionProps) =>
    <span className={cn(className, 'Caption')} {...restProps} />;

export default memo(Caption);