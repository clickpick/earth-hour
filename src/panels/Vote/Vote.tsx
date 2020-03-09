import React, { FC } from 'react';

import { Panel, PanelHeaderSimple, PanelHeaderBack } from '@vkontakte/vkui';

export interface VoteProps {
    id: string,
    goBack: () => void
}

const Vote: FC<VoteProps> = ({ id, goBack }: VoteProps) => {
    return (
        <Panel id={id}>
            <PanelHeaderSimple
                left={<PanelHeaderBack onClick={goBack} />}
                separator={false} />
            Vote
        </Panel>
    );
};

export default Vote;