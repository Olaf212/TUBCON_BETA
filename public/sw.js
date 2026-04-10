const CACHE_NAME = 'tubcon-cache-v2';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/products.html',
  '/ubication.html',
  '/email.html',
  '/catalogo.html',
  '/preloader.html',
  '/src/index.css',
  '/images/logo.png',
  '/images/iconoa.ico',
  // Galería de imágenes (nombres neutrales para evitar ad-blocks)
  '/images/galeria/g1.jpg',
  '/images/galeria/g2.jpg',
  '/images/galeria/g3.jpg',
  '/images/galeria/g4.jpg',
  '/images/galeria/g5.jpg',
  '/images/galeria/g6.jpg',
  '/images/galeria/g7.jpg',
  '/images/galeria/g8.jpg',
  '/images/galeria/g9.jpg',
  '/images/galeria/g10.jpg',
  '/images/galeria/g11.jpg',
  '/images/galeria/g12.jpg',
  '/images/galeria/g13.jpg',
  '/images/galeria/g14.jpg',
  '/images/galeria/11.jpeg',
  '/images/galeria/12.jpeg',
  '/images/galeria/13.jpeg',
  '/images/galeria/14.jpeg',
  '/images/galeria/16.jpeg',
  '/images/galeria/17.jpeg',
  '/images/galeria/18.jpeg',
  '/images/galeria/19.jpeg',
  '/images/galeria/20.jpeg'
];

// Instalar el Service Worker y cachear recursos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching assets...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activar el SW y limpiar caches antiguos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Cleaning old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Estrategia de Fetch: Cache First, fallback to Network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((fetchResponse) => {
        return fetchResponse;
      });
    }).catch(() => {
      if (event.request.mode === 'navigate') {
        return caches.match('/index.html');
      }
    })
  );
});
