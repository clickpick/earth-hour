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

    const goBack = useCallback<GoBack>(() => {
        setHistory(history => [...history].slice(0, history.length - 1));
        window.history.back();
    }, []);

    useEffect(() => {
        function handlePopState(e: PopStateEvent) {
            e.preventDefault();

            if (e.state) {
                if (e.state.panel === initialActivePanel) {
                    bridge.send('VKWebAppDisableSwipeBack');
                }

                setActivePanel(e.state.panel);
            } else {
                setActivePanel(initialActivePanel);
                bridge.send('VKWebAppDisableSwipeBack');
                window.history.pushState({ panel: initialActivePanel }, initialActivePanel);
            }
        }

        window.addEventListener('popstate', handlePopState);
        window.history.pushState({ panel: initialActivePanel }, initialActivePanel);

        return () => {
            window.history.pushState(null, '');
            window.removeEventListener('popstate', handlePopState);
        };
    }, [initialActivePanel]);

    return [activePanel, history, goForward, goBack];
}