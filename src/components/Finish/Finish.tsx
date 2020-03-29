import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Group from '../Group';
import Headline from '../Headline';
import Footnote from '../Footnote';

import confetti from '../../images/confetti.png';

export interface FinishProps extends HTMLAttributes<HTMLDivElement> { }

const Finish: FC<FinishProps> = ({ className }: FinishProps) => {
    return (
        <Group className={cn(className, 'Finish')} vertical center jcCenter>
            <img
                className="Finish__confetti"
                src={confetti}
                alt="confetti"
                width="343"
                height="290" />

            <Footnote className="color-opacity--secondary margin-purple--bottom">Акция завершилась!</Footnote>
            <Headline className="Finish__Headline margin-aqua--bottom">350 000</Headline>
            <Footnote className="color-opacity--secondary">
                людей поучаствовало в этом<br />
                флэшмобе, спасибо каждому!
            </Footnote>
        </Group>
    );
};

export default memo(Finish);