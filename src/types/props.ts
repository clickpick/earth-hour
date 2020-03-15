import { ReactNode } from 'react';

export interface HasChildren {
    children?: ReactNode
}

export type Gradient = 'red-orange' | 'orange-yellow' | 'green-yellow' | 'blue-green' | 'purple-aqua';

export interface Story {
    id: string,
    name: string,
    gradient: Gradient,
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