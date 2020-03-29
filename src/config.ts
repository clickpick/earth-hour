export const WWF_GROUP_ID = 348403;

export enum Links {
    APP_LINK = 'https://vk.com/app7350422',
    WWF = 'https://vk.com/wwf',
    WWF_60 = 'https://60.wwf.ru/',
    PEOPLE_NATURE = 'https://vk.cc/arICHK',
    WWF_PEOJECT = 'https://vk.cc/arVQ0P',
    CLICK = 'https://vk.cc/arVPNX'
}

function generateTitle(title: string, answersCount: number, maxCount = 5): string {
    return title.replace(/n/gm, answersCount.toString()).replace(/m/gm, maxCount.toString());
}

export const results = {
    bad: [
        {
            title: (answersCount: number, maxCount?: number) => generateTitle('Пройдёно на n из m', answersCount, maxCount), 
            message: 'Зато без единой подсказки'
        },
        {
            title: (answersCount: number, maxCount?: number) => generateTitle('На правильном пути, n из m', answersCount, maxCount),
            message: 'Немного практики, и ты сможешь закончить квиз'
        },
        {
            title: (answersCount: number, maxCount?: number) => generateTitle('n из m, зато узнал много нового', answersCount, maxCount),
            message: 'В следующий раз получится!'
        }
    ],
    good: [
        {
            title: (answersCount: number, maxCount?: number) => generateTitle('Хороший результат, n из m', answersCount, maxCount),
            message: 'Ты знаешь почти всё!'
        },
        {
            title: (answersCount: number, maxCount?: number) => generateTitle('n из m. Неплохо разбираешься', answersCount, maxCount),
            message: 'Может, попросим подсказку у друга?'
        },
        {
            title: (answersCount: number, maxCount?: number) => generateTitle('Было близко, n из m', answersCount, maxCount),
            message: 'Можешь попробовать ещё разок'
        },
        {
            title: (answersCount: number, maxCount?: number) =>
                generateTitle('Это было сложно, но ты справился на n из m', answersCount, maxCount),
            message: 'Да ты готов соревноваться с друзьями!'
        }
    ],
    best: [
        {
            title: (answersCount: number, maxCount?: number) => generateTitle('Отлично, ты прошёл квиз!', answersCount, maxCount),
            message: 'С таким знатоком не пропадёшь!'
        },
        {
            title: (answersCount: number, maxCount?: number) => generateTitle('Ты прошёл квиз, легко и просто!', answersCount, maxCount),
            message: 'А смогут ли твои друзья так? Поделись с ними квизом, вот и узнаем'
        },
        {
            title: (answersCount: number, maxCount?: number) => generateTitle('Квиз пройден!', answersCount, maxCount),
            message: 'Идеально, гениально, шедеврально'
        },
        {
            title: (answersCount: number, maxCount?: number) => generateTitle('У тебя получилось пройти квиз!', answersCount, maxCount),
            message: 'Интересно, а твои друзья так смогут?'
        },
        {
            title: (answersCount: number, maxCount?: number) => generateTitle('Браво!', answersCount, maxCount),
            message: 'Либо тебе повезло, либо ты увлекаешься экологией :)'
        },
    ]
};

export function generateResultProps(mood: 'bad' | 'good' | 'best', answersCount: number, maxCount?: number): { title: string, message: string } {
    const variants: Array<any> = results[mood];
    const result = variants[Math.floor(Math.random() * variants.length)];

    return {
        ...result,
        title: result.title(answersCount, maxCount),
    };
}