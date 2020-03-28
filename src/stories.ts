import { Story } from './types/props';
import { timestamp } from './helpers/date';

let stories: Array<Story> = [{
    id: 'story-1',
    name: 'Что такое «Час Земли»',
    photo: './stories/preview-1.jpg',
    seen: false,
    gradient: 'red-orange',
    lastUpdated: timestamp(),
    items: [{
        id: 'story-1-1',
        length: 10,
        link: null,
        linkText: false,
        preview: './stories/stories1_1.jpg',
        seen: false,
        src: './stories/stories1_1.jpg',
        time: timestamp(),
        type: 'photo'
    }, {
        id: 'story-1-2',
        length: 10,
        link: null,
        linkText: false,
        preview: './stories/stories1_2.jpg',
        seen: false,
        src: './stories/stories1_2.jpg',
        time: timestamp(),
        type: 'photo'
    },  {
        id: 'story-1-3',
        length: 10,
        link: null,
        linkText: false,
        preview: './stories/stories1_3.jpg',
        seen: false,
        src: './stories/stories1_3.jpg',
        time: timestamp(),
        type: 'photo'
    }]
}, {
    id: 'story-5',
    name: 'Что будет в 2020 году',
    photo: './stories/preview-5.jpg',
    seen: false,
    gradient: 'purple-aqua',
    lastUpdated: timestamp(),
    items: [{
        id: 'story-5-1',
        length: 10,
        link: null,
        linkText: false,
        preview: './stories/stories5_1.jpg',
        seen: false,
        src: './stories/stories5_1.jpg',
        time: timestamp(),
        type: 'photo'
    }, {
        id: 'story-5-2',
        length: 10,
        link: null,
        linkText: false,
        preview: './stories/stories5_2.jpg',
        seen: false,
        src: './stories/stories5_2.jpg',
        time: timestamp(),
        type: 'photo'
    }, {
        id: 'story-5-3',
        length: 10,
        link: 'https://vk.cc/arICHK',
        linkText: 'Узнать больше',
        preview: './stories/stories5_3.jpg',
        seen: false,
        src: './stories/stories5_3.jpg',
        time: timestamp(),
        type: 'photo'
    }]
}, {
    id: 'story-2',
    name: 'С чего всё начиналось',
    photo: './stories/preview-2.jpg',
    seen: false,
    gradient: 'blue-green',
    lastUpdated: timestamp(),
    items: [{
        id: 'story-2-1',
        length: 10,
        link: null,
        linkText: false,
        preview: './stories/stories2_1.jpg',
        seen: false,
        src: './stories/stories2_1.jpg',
        time: timestamp(),
        type: 'photo'
    }, {
        id: 'story-2-2',
        length: 10,
        link: null,
        linkText: false,
        preview: './stories/stories2_2.jpg',
        seen: false,
        src: './stories/stories2_2.jpg',
        time: timestamp(),
        type: 'photo'
    }, {
        id: 'story-2-3',
        length: 10,
        link: null,
        linkText: false,
        preview: './stories/stories2_3.jpg',
        seen: false,
        src: './stories/stories2_3.jpg',
        time: timestamp(),
        type: 'photo'
    }]
}, {
    id: 'story-3',
    name: 'Эксклюзивные обои от WWF',
    photo: './stories/preview-3.jpg',
    seen: false,
    gradient: 'orange-yellow',
    lastUpdated: timestamp(),
    items: [{
        id: 'story-3-1',
        length: 10,
        link: 'https://vk.cc/2jyAav',
        linkText: 'Пройти тест',
        preview: './stories/stories3_1.jpg',
        seen: false,
        src: './stories/stories3_1.jpg',
        time: timestamp(),
        type: 'photo'
    }]
    }, {
    id: 'story-4',
    name: 'Час Земли в России',
    photo: './stories/preview-4.jpg',
    seen: false,
    gradient: 'green-yellow',
    lastUpdated: timestamp(),
    items: [{
        id: 'story-4-1',
        length: 10,
        link: null,
        linkText: false,
        preview: './stories/stories4_1.jpg',
        seen: false,
        src: './stories/stories4_1.jpg',
        time: timestamp(),
        type: 'photo'
    }, {
        id: 'story-4-2',
        length: 10,
        link: null,
        linkText: false,
        preview: './stories/stories4_2.jpg',
        seen: false,
        src: './stories/stories4_2.jpg',
        time: timestamp(),
        type: 'photo'
    }, {
        id: 'story-4-3',
        length: 10,
        link: null,
        linkText: false,
        preview: './stories/stories4_3.jpg',
        seen: false,
        src: './stories/stories4_3.jpg',
        time: timestamp(),
        type: 'photo'
    }]
}];

stories.reverse();

export { stories };
