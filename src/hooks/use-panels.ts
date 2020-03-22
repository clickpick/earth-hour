import { SyntheticEvent, useState, useCallback, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';

export type GoForward = (e: SyntheticEvent<HTMLElement>) => void;
export type GoBack = () => void;
export type UsePanels = [string, Array<string>, GoForward, GoBack];

export default function usePanels(initialActivePanel: string): UsePanels {
    const [activePanel, setActivePanel] = useState<string>(initialActivePanel);
    const [history, setHistory] = useState<Array<string>>([initialActivePanel]);

    const goForward = useCallback<GoForward>((e: SyntheticEvent<HTMLElement>) => {
        if (!(e.currentTarget instanceof HTMLElement)) {
            return;
        }

        const nextPanel = e.currentTarget.dataset.to as string;

        setActivePanel((activePanel) => {
            if (activePanel === initialActivePanel) {
                bridge.send('VKWebAppEnableSwipeBack');
            }

            return nextPanel;
        });
        setHistory(history => [...history, nextPanel]);
        window.history.pushState({ panel: nextPanel }, nextPanel);
    }, [initialActivePanel]);

    const goBack = useCallback<GoBack>(() => window.history.back(), []);

    const back = useCallback<GoBack>(() => {
        setHistory(history => {
            if (history.length === 1) {
                bridge.send('VKWebAppClose', { status: 'success' });

                return history;
            }

            const nextHistory = [...history].slice(0, history.length - 1);
            setActivePanel(nextHistory[nextHistory.length - 1]);

            return nextHistory;
        });
    }, []);

    useEffect(() => {
        window.addEventListener('popstate', (e: PopStateEvent) => {
            e.preventDefault();
            back();
        });
    }, [back]);

    return [activePanel, history, goForward, goBack];
}