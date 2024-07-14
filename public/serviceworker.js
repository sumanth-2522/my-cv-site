//set up cache name and files to add to it

// v1

const CACHE_NAME = 'MyResume-v1';
const CACHE_URLS = [
    'index.html',
    'education.html',
    'skills.html',
    'contact.html',
    'think-of-a-number.html',
    'hangman.html',
    'resources/scripts/hangman.js',
    'resources/scripts/thinkOfANumber.js',
    'resources/scripts/validate.js',
    'resources/css/style.css',
    'resources/images/0.gif',
    'resources/images/1.gif',
    'resources/images/2.gif',
    'resources/images/3.gif',
    'resources/images/4.gif',
    'resources/images/5.gif',
    'resources/images/6.gif',
    'resources/images/7.gif',
    'resources/images/contact.svg',
    'resources/images/hangman-thumbnail_200.webp',
    'resources/images/hangman-thumbnail_400.webp',
    'resources/images/hangman-thumbnail.png',
    'resources/images/hangman-thumbnail1x.jpg',
    'resources/images/hangman-thumbnail2x.jpg',
    'resources/images/land.jpg',
    'resources/images/land.webp',
    'resources/images/land@2X.jpg',
    'resources/images/land@2X.webp',
    'resources/images/port.jpg',
    'resources/images/port.webp',
    'resources/images/port@2X.jpg',
    'resources/images/port@2X.webp',
    'resources/images/square.jpg',
    'resources/images/square.webp',
    'resources/images/square@2X.jpg',
    'resources/images/square@2X.webp',
    'resources/images/think_of_a_number.jpg',
    'resources/images/think_of_a_number.webp',
    'resources/images/think_of_a_number@2X.jpg',
    'resources/images/think_of_a_number@2X.webp',
    'resources/images/think-of-a-number-land.avif',
    'resources/images/think-of-a-number-land@2X.avif',
    'resources/fonts/rubik-bold-webfont.woff',
    'resources/fonts/rubik-bold-webfont.woff2',
    'resources/fonts/sourcesanspro-regular-webfont.woff',
    'resources/fonts/sourcesanspro-regular-webfont.woff2',
    'manifest.webmanifest',
    'android-chrome-192x192.png',
    'android-chrome-512x512.png',
    'apple-touch-icon.png',
    'browserconfig.xml',
    'favicon-16x16.png',
    'favicon-32x32.png',
    'favicon.ico',
    'mstile-150x150.png',
    'safari-pinned-tab.svg'

];


//add all URLs to cache when installed
self.addEventListener("install", function(event){
    console.log("Service worker installed");
    event.waitUntil(
        //create and open cache
        caches.open(CACHE_NAME)
            .then(function(cache){
                console.log("Cache opened");
                //add all URLs to cache
                return cache.addAll(CACHE_URLS);
        })
    );
});

//On activate update the cache with the new version and clean out old caches
self.addEventListener('activate', function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName.startsWith('MyResume-') && CACHE_NAME !== cacheName) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });

  //add all URLs to cache when installed
//...
//user has navigated to page - fetch required assets
self.addEventListener("fetch", function(event){
    event.respondWith(
        caches.match(event.request).then(function(response){
            //check whether asset is in cache
            if(response){
                //asset in cache, so return it
                console.log(`Return ${event.request.url} from cache`);
                return response;
            }
            //asset not in cache so fetch asset from network
            console.log(`Fetch ${event.request.url} from network`);
            return fetch(event.request);
        })
    );
});
