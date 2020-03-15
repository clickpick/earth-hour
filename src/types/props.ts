import { ReactNode } from 'react';

export interface HasChildren {
    children?: ReactNode
}

export interface Story {
    id: string,
    name: string,
    photo: string,
    seen: boolean,
    lastUpdated: number
    items: Array<StoryItem>
}

export interface StoryItem {
    id: string,
    length: number
    link: string | null,
    linkText: string | boolean
    preview: string
    seen: boolean
    src: string
    time: number
    type: 'photo' | 'video'
}