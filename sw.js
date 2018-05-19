//define a variable to save the name for our cache
let MyCacheName = 'restaurant review site';
//define an array to keep the data we want to cache
let ThingsToCache = [
  '/',
  'restaurant.html',
  'index.html',
  'css/styles.css',
  'css/max_viewport_550px.css',
  'css/min_viewport_551px.css',
  'css/min_viwport_1024px.css',
  'js/dbhelper.js',
  'js/main.js',
  'js/restaurant_info.js',
  'data/restaurants.json',
  'img/1.jpg',
  'img/2.jpg',
  'img/3.jpg',
  'img/4.jpg',
  'img/5.jpg',
  'img/6.jpg',
  'img/7.jpg',
  'img/8.jpg',
  'img/9.jpg',
  'img/10.jpg'
];
// Perform install stage
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(MyCacheName)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(ThingsToCache);
      })
  );
});
// Perform fetch stage whin the network offline to view the cached data insted
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    ).catch(function(err){
      console.log('faild fetching'+ err);
    });
  );
});
// Perform activate stage
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== MyCacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
