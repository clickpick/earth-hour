import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import { HasChildren } from '../../types/props';

export interface FootnoteProps extends HTMLAttributes<HTMLElement>, HasChildren {}

const Footnote: FC<FootnoteProps> = ({ className, ...restProps }: FootnoteProps) =>
    <p className={cn(className, 'Footnote')} {...restProps} />;

export default memo(Footnote);