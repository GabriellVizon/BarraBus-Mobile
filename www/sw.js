<<<<<<< HEAD
const CACHE_NAME = 'barrabus-v19-abas-historico';
=======
const CACHE_NAME = 'barrabus-v7';
>>>>>>> 60bd1045a9203b7e13cdd7581851ec554249c3bb

const PRE_CACHE_URLS = [
  '/index.html',
  '/pontos.html',
  '/css/shared.css',
  '/index.css',
  '/pontos.css',
  '/script.js',
  '/js/utils.js',
  '/js/theme.js',
  '/js/favorites.js',
  '/js/reminders.js',
<<<<<<< HEAD
  '/js/horarios.js',
  '/js/circular-ui.js',
  '/js/modal.js',
  '/js/circular-route.js',
=======
  '/js/install.js',
  '/js/modal.js',
>>>>>>> 60bd1045a9203b7e13cdd7581851ec554249c3bb
  '/js/appShell.js',
  '/js/bootstrap-home.js',
  '/js/bootstrap-points.js',
  '/js/pontos.js',
  '/dados/pontos.json',
  '/dados/horarios.json',
<<<<<<< HEAD
  '/dados/pontos-plena.json',
  '/dados/horarios-plena.json',
=======
>>>>>>> 60bd1045a9203b7e13cdd7581851ec554249c3bb
  '/manifest.json',
  '/img/icon-192.png',
  '/img/icon-512.png',
  '/img/apple-touch-icon.png',
  '/img/realista-point.png',
<<<<<<< HEAD
  '/img/realista-point.modoclaro.png',
  '/img/do-utilizador.png'
=======
  '/img/realista-point.modoclaro.png'
>>>>>>> 60bd1045a9203b7e13cdd7581851ec554249c3bb
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRE_CACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  if (url.hostname === 'tile.openstreetmap.org') {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache =>
        cache.match(request).then(cached => {
          const fetched = fetch(request).then(response => {
            if (response.ok) cache.put(request, response.clone());
            return response;
          }).catch(() => cached);
          return cached || fetched;
        })
      )
    );
    return;
  }

  if (url.pathname.endsWith('.json')) {
    event.respondWith(
      fetch(request).then(response => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        return response;
      }).catch(() => caches.match(request))
    );
    return;
  }

  if (request.mode === 'navigate' || url.pathname.endsWith('.html')) {
    event.respondWith(
      fetch(request).then(response => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        return response;
      }).catch(() => caches.match(request))
    );
    return;
  }

  event.respondWith(
<<<<<<< HEAD
    fetch(request).then(response => {
      const clone = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
      return response;
    }).catch(() => caches.match(request))
=======
    caches.open(CACHE_NAME).then(cache =>
      cache.match(request).then(cached => {
        const fetched = fetch(request).then(response => {
          if (response.ok) cache.put(request, response.clone());
          return response;
        }).catch(() => cached);
        return cached || fetched;
      })
    )
>>>>>>> 60bd1045a9203b7e13cdd7581851ec554249c3bb
  );
});
