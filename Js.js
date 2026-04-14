const CACHE_NAME = ‘goblin-os-v1’;
const urlsToCache = [
‘./’,
‘./index.html’,
‘./manifest.json’
];

self.addEventListener(‘install’, (event) => {
event.waitUntil(
caches.open(CACHE_NAME).then((cache) => {
return cache.addAll(urlsToCache).catch(() => {
// offline install is ok
});
})
);
self.skipWaiting();
});

self.addEventListener(‘activate’, (event) => {
event.waitUntil(clients.claim());
});

self.addEventListener(‘fetch’, (event) => {
if (event.request.method !== ‘GET’) return;

event.respondWith(
caches.match(event.request).then((response) => {
if (response) {
return response;
}
return fetch(event.request).catch(() => {
return new Response(‘Offline’);
});
})
);
});