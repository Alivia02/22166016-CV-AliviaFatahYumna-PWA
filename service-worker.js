const CACHE_NAME = 'portfolio-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/manifest.json',
    '/images/about.jpg',
    '/images/home.jpg',
    '/images/icon.png',
    '/images/cv-alivia.pdf'
  ];
  

// Install service worker dan cache file
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// Ambil dari cache saat offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

// Update cache saat ada perubahan versi
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  // Mengambil kontrol klien yang sudah ada
  return self.clients.claim();
});


// Fungsi untuk menampilkan notifikasi
function showNotification() {
  const title = 'Hallo!';
  const options = {
      body: 'Selamat Datang di Web Portofolio Alivia. Terimakasih telah mengunjungi',
      icon: '/images/images-icon.png' // Pastikan path gambar ini benar
  };

  // Menampilkan notifikasi
  self.registration.showNotification(title, options);
}

// Menangani klik pada notifikasi
self.addEventListener('notificationclick', event => {
  event.notification.close(); // Menutup notifikasi saat diklik
  event.waitUntil(
      clients.openWindow('https://alivia02.github.io/22166016-CV-AliviaFatahYumna-PWA/')
  );
});

// Menangani pesan dari halaman
self.addEventListener('message', event => {
  console.log('Pesan diterima di service worker:', event.data);
  if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
      showNotification();
  }
});
