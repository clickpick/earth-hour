/* eslint-disable */

self.addEventListener('install', (e) => {    
    e.waitUntil(
        caches.open('v1').then((cache) => {
            return cache.addAll([
                './stories/',
                './stories/preview-1.jpg',
                './stories/preview-2.jpg',
                './stories/preview-3.jpg',
                './stories/preview-4.jpg',
                './stories/preview-5.jpg',
                './stories/stories1_1.jpg',
                './stories/stories1_2.jpg',
                './stories/stories1_3.jpg',
                './stories/stories2_1.jpg',
                './stories/stories2_2.jpg',
                './stories/stories2_3.jpg',
                './stories/stories3_1.jpg',
                './stories/stories4_1.jpg',
                './stories/stories4_2.jpg',
                './stories/stories4_3.jpg',
                './stories/stories5_1.jpg',
                './stories/stories5_2.jpg',
                './stories/stories5_3.jpg',
            ]);
        })
    )
});

self.addEventListener('fetch', (e) => {
    if (e.request.method === 'GET' && !!e.request.url.match(/\.(js|css|woff|jpg|png|webp)/gm)) {        
        e.respondWith(
            caches.match(e.request).then((response) => {
                return response || fetch(e.request).then((response) => {
                    return caches.open('v1').then((cache) => {
                        cache.put(e.request, response.clone());

                        return response;
                    });
                })
            })
        );
    }
});

/* eslint-enable */