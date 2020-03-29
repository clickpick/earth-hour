import React, { FC, useState, useEffect } from 'react';

import { PanelPrimary } from '../types/props';

import { stories } from '../stories';
import { Links } from '../config';

import { Panel, PanelHeaderSimple } from '@vkontakte/vkui';
import Transition from '../components/Transition';
import Headline from '../components/Headline';
import Footnote from '../components/Footnote';
import Card from '../components/Card';
import Group from '../components/Group';
import Stories from '../components/Stories';
import Finish from '../components/Finish';
import Button from '../components/Button';

import posterQrGame from '../images/poster-qr.png';

export interface MainProps extends PanelPrimary { }

const Main: FC<MainProps> = ({ id }: MainProps) => {
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => setShow(true), 100);
    }, []);

    return (
        <Panel id={id} separator={false}>
            <PanelHeaderSimple separator={false} />
            <Transition in={show} timeout={500}>
                <Headline className="margin-purple--top margin-aqua--bottom padding-orange--rl">Час Земли</Headline>
            </Transition>
            <Transition in={show} timeout={2000}>
                <div className="padding-orange--rl">
                    <Footnote className="color-opacity--secondary margin-pink--bottom">
                        Самая массовая экологическая
                        <br />
                        акция на планете
                    </Footnote>
                </div>
            </Transition>
            <Transition in={show} timeout={4000} mountOnEnter>
                <Stories className="margin-pink--bottom" stories={stories} />
                <Group className="margin-pink--bottom padding-orange--rl" vertical center>
                    <Finish className="margin-pink--bottom" />
                    <Card
                        className="margin-pink--bottom"
                        poster={posterQrGame}
                        hint="Благотворительный проект WWF России"
                        href={Links.WWF_PEOJECT}>
                        Сохраним остров беринга – дом милых тюленей
                    </Card>
                </Group>
                <Group vertical center>
                    <Headline className="margin-purple--bottom">Полезые ссылки</Headline>
                    <Group start>
                        <Button
                            className="margin-purple--right"
                            shape="circle"
                            icon={<img src="./svg/wwf.svg" alt="wwf" width="20" height="20" />}
                            href={Links.WWF}>
                            Сообщество<br />WWF России
                        </Button>
                        <Button
                            className="margin-purple--right"
                            shape="circle"
                            icon={<img src="./images/people-nature.jpg" className="Br(4)" alt="people-nature" width="20" height="20" />}
                            href={Links.PEOPLE_NATURE}>
                            Платформа<br />Люди – Природе
                        </Button>
                        <Button
                            shape="circle"
                            icon={<img src="./svg/click.svg" alt="click" width="20" height="20" />}
                            href={Links.CLICK}>
                            Разработчики<br />приложения
                        </Button>
                    </Group>
                </Group>
            </Transition>
        </Panel>
    );
};

export default Main;