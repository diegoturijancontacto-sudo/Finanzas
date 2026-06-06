const CACHE_NAME = 'v1_cache_pwa';
// Agrega aquí los archivos que quieres que funcionen sin internet
const urlsToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/main.js',
  '/icons/icon-192x192.png'
];

// Evento de instalación: Guarda los archivos en la caché
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Evento de activación: Limpia cachés antiguas
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME];
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Evento fetch: Sirve el contenido desde la caché cuando no hay internet
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          return res; // Devuelve el archivo desde la caché
        }
        return fetch(e.request); // Si no está en caché, lo busca en internet
      })
  );
});
