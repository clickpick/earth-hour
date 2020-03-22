export function register() {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
        const publicUrl: URL = new URL(
            process.env.PUBLIC_URL,
            window.location.href
        );

        if (publicUrl.origin !== window.location.origin) {
            return;
        }

        window.addEventListener('load', () => {
            const swUrl: string = `./sw.js`;

            registerSW(swUrl);
        });
    }
}

function registerSW(swUrl: string) {
    navigator.serviceWorker.register(swUrl)
        .then((reg) => {
            console.log('ok', reg);
        })
        .catch((error) => {
            console.log('error', error);
        });
}