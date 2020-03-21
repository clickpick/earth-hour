import { Story } from './types/props';
import { timestamp } from './helpers/date';

import poster11 from './images/stories/stories1_1.jpg';
import poster12 from './images/stories/stories1_2.jpg';
import poster13 from './images/stories/stories1_3.jpg';
import poster21 from './images/stories/stories2_1.jpg';
import poster22 from './images/stories/stories2_2.jpg';
import poster23 from './images/stories/stories2_3.jpg';
import poster31 from './images/stories/stories3_1.jpg';
import poster41 from './images/stories/stories4_1.jpg';
import poster42 from './images/stories/stories4_2.jpg';
import poster43 from './images/stories/stories4_3.jpg';
import poster51 from './images/stories/stories5_1.jpg';
import poster52 from './images/stories/stories5_2.jpg';
import poster53 from './images/stories/stories5_3.jpg';

let stories: Array<Story> = [{
    id: 'story-1',
    name: 'Что такое «Час Земли»',
    photo: poster11,
    seen: false,
    gradient: 'red-orange',
    lastUpdated: timestamp(),
    items: [{
        id: 'story-1-1',
        length: 10,
        link: null,
        linkText: false,
        preview: poster11,
        seen: false,
        src: poster11,
        time: timestamp(),
        type: 'photo'
    }, {
        id: 'story-1-2',
        length: 10,
        link: null,
        linkText: false,
        preview: poster12,
        seen: false,
        src: poster12,
        time: timestamp(),
        type: 'photo'
    },  {
        id: 'story-1-3',
        length: 10,
        link: null,
        linkText: false,
        preview: poster13,
        seen: false,
        src: poster13,
        time: timestamp(),
        type: 'photo'
    }]
}, {
    id: 'story-2',
    name: 'С чего всё начиналось',
    photo: poster21,
    seen: false,
    gradient: 'blue-green',
    lastUpdated: timestamp(),
    items: [{
        id: 'story-2-1',
        length: 10,
        link: null,
        linkText: false,
        preview: poster21,
        seen: false,
        src: poster21,
        time: timestamp(),
        type: 'photo'
    }, {
        id: 'story-2-2',
        length: 10,
        link: null,
        linkText: false,
        preview: poster22,
        seen: false,
        src: poster22,
        time: timestamp(),
        type: 'photo'
    }, {
        id: 'story-2-3',
        length: 10,
        link: null,
        linkText: false,
        preview: poster23,
        seen: false,
        src: poster23,
        time: timestamp(),
        type: 'photo'
    }]
}, {
    id: 'story-3',
    name: 'Подарок от WWF',
    photo: poster31,
    seen: false,
    gradient: 'orange-yellow',
    lastUpdated: timestamp(),
    items: [{
        id: 'story-3-1',
        length: 10,
        link: 'https://vk.cc/2jyAav',
        linkText: 'Пройти тест',
        preview: poster31,
        seen: false,
        src: poster31,
        time: timestamp(),
        type: 'photo'
    }]
    }, {
    id: 'story-4',
    name: 'Час Земли в России',
    photo: poster41,
    seen: false,
    gradient: 'green-yellow',
    lastUpdated: timestamp(),
    items: [{
        id: 'story-4-1',
        length: 10,
        link: null,
        linkText: false,
        preview: poster41,
        seen: false,
        src: poster41,
        time: timestamp(),
        type: 'photo'
    }, {
        id: 'story-4-2',
        length: 10,
        link: null,
        linkText: false,
        preview: poster42,
        seen: false,
        src: poster42,
        time: timestamp(),
        type: 'photo'
    }, {
        id: 'story-4-3',
        length: 10,
        link: null,
        linkText: false,
        preview: poster43,
        seen: false,
        src: poster43,
        time: timestamp(),
        type: 'photo'
    }]
}, {
    id: 'story-5',
    name: 'Что будет в 2020 году',
    photo: poster51,
    seen: false,
    gradient: 'purple-aqua',
    lastUpdated: timestamp(),
    items: [{
        id: 'story-5-1',
        length: 10,
        link: null,
        linkText: false,
        preview: poster51,
        seen: false,
        src: poster51,
        time: timestamp(),
        type: 'photo'
    }, {
        id: 'story-5-2',
        length: 10,
        link: null,
        linkText: false,
        preview: poster52,
        seen: false,
        src: poster52,
        time: timestamp(),
        type: 'photo'
    }, {
        id: 'story-5-3',
        length: 10,
        link: 'https://vk.cc/arA20i',
        linkText: 'Узнать больше',
        preview: poster53,
        seen: false,
        src: poster53,
        time: timestamp(),
        type: 'photo'
    }]
}];

stories.reverse();

export { stories };
