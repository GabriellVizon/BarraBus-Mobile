const CACHE_NAME = 'barrabus-v1';
const URLS_TO_CACHE = [
  'index.html',
  'pontos.html',
  'style.css',
  'script.js',
  'manifest.json',
  'dados/pontos.json',
  'dados/linhas.json',
  'dados/horarios.json',
  'img/icon-192.png',
  'img/icon-512.png',
  'img/Sem fundo.png',
  'img/WhatsApp Image 2026-05-22 at 23.51.26.jpeg',
  'img/ChatGPT Image 22 de mai. de 2026, 23_36_56.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) => {
      return Promise.all(
        names
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) return response;

      return fetch(event.request)
        .then((networkResponse) => {
          if (
            !networkResponse ||
            networkResponse.status !== 200 ||
            networkResponse.type !== 'basic'
          ) {
            return networkResponse;
          }

          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clone);
          });

          return networkResponse;
        })
        .catch(() => {
          if (event.request.destination === 'document') {
            return caches.match('index.html');
          }
          return new Response('Offline', { status: 503 });
        });
    })
  );
});
