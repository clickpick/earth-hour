import { Story } from './types/props';
import { timestamp } from './helpers/date';

import posterQuiz from './images/poster-quiz.png';
import posterQuiz2 from './images/poster-quiz-2-mini.png';

export const stories: Array<Story> = [{
    id: 'story-1',
    name: 'Что такое «Час Земли»',
    photo: posterQuiz,
    seen: false,
    gradient: 'red-orange',
    lastUpdated: timestamp(),
    items: [{
        id: 'story-1-0',
        length: 10,
        link: null,
        linkText: false,
        preview: posterQuiz,
        seen: false,
        src: 'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/1.jpg',
        time: timestamp(),
        type: 'photo'
    }, {
        id: 'story-1-1',
        length: 10,
        link: null,
        linkText: false,
        preview: posterQuiz,
        seen: false,
        src: 'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/3.png',
        time: timestamp(),
        type: 'photo'
    }]
}, {
    id: 'story-2',
    name: 'Подарок от WWF',
    photo: posterQuiz2,
    seen: false,
    gradient: 'blue-green',
    lastUpdated: timestamp(),
    items: [{
        id: 'story-2-0',
        length: 10,
        link: null,
        linkText: false,
        preview: posterQuiz,
        seen: false,
        src: 'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/1.jpg',
        time: timestamp(),
        type: 'photo'
    }, {
        id: 'story-2-1',
        length: 10,
        link: null,
        linkText: false,
        preview: posterQuiz,
        seen: false,
        src: 'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/3.png',
        time: timestamp(),
        type: 'photo'
    }]
}];