import { Story } from './types/props';
import { timestamp } from './helpers/date';

import posterQuiz from './images/poster-quiz.png';

export const stories: Array<Story> = [{
    id: 'story-1',
    name: 'Что такое «Час Земли»',
    photo: posterQuiz,
    seen: false,
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
}];