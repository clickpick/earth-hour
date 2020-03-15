import React, {
    FC, ReactNode,
    useState, useMemo, useRef, useEffect,
    memo
} from 'react';
import cn from 'classnames';

import { Story, StoryItem as IStoryItem } from '../../types/props';

// @ts-ignore
import Zuck from 'zuck.js';

import StoryItem from '../../components/StoryItem';

export interface StoriesProps {
    className?: string
    stories: Array<Story>
}

const Stories: FC<StoriesProps> = ({ className, stories }: StoriesProps) => {
    const classNames = useMemo(() => cn(className, 'Stories'), [className]);

    const storiesAPI = useRef(null);
    const [state, setState] = useState<any[]>(stories);

    useEffect(() => {
        storiesAPI.current = new Zuck('stories-react', {
            skin: 'snapgram',
            backNative: false,
            avatars: true,
            openEffect: true,
            // cubeEffect: true,
            autoFullScreen: true,
            previousTap: true,
            localStorage: false,
            reactive: true,
            stories,
            callbacks: {
                onDataUpdate: function (currentState: any, callback: any) {
                    setState(currentState);
                    // setTimeout(callback, 200);
                }
            }
        });
    }, [stories]);

    const content = useMemo(() => {
        const timelineItems: ReactNode[] = [];

        state.forEach((story: Story, storyId: number) => {
            const items = story.items.map((storyItem: IStoryItem) => (
                <li key={storyItem.id} data-id={storyItem.id} data-time={storyItem.time} className={(storyItem.seen ? 'seen' : '')}>
                    <a href={storyItem.src} data-type={storyItem.type} data-length={storyItem.length} data-link={storyItem.link} data-link-text={storyItem.linkText}>
                        <img src={storyItem.preview} alt="" />
                    </a>
                </li>
            ));

            const content = (
                <StoryItem
                    className="Stories__StoryItem margin-purple--left"
                    key={storyId}
                    data-id={storyId}
                    data-last-updated={story.lastUpdated}
                    data-photo={story.photo}
                    seen={story.seen}
                    photo={story.photo}
                    name={story.name}
                    gradient={story.gradient}
                    lastUpdated={story.lastUpdated}>
                    <ul className="items">
                        {items}
                    </ul>
                </StoryItem>
            );

            if (story.seen) {
                timelineItems.push(content);
            } else {
                timelineItems.unshift(content);
            }
        });

        return timelineItems;
    }, [state]);

    return (
        <div className={classNames}>
            <div id="stories-react" className="storiesWrapper" children={content} />
        </div>
    );
};

export default memo(Stories);