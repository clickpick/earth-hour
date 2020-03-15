import { ReactNode, SyntheticEvent } from 'react';

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

export interface Panel {
    id: string
}

export interface PanelPrimary extends Panel {
    goForward(e: SyntheticEvent<HTMLElement>): void 
}

export interface PanelSecondary extends Panel {
    goBack(): void
}