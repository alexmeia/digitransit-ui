var CACHE = 'font-cache-v1';
var FONT_DOMAIN = 'https://cloud.typography.com/';

function fetchAndCache(request, cache) {
  return fetch(request.clone()).then(function (response) {
    if (response.status < 400) {
      cache.put(request, response.clone());
    }

    return response;
  });
}

self.addEventListener('fetch', function (event) {
  // Do not cache other than font assets that need click counting on every request.
  if (!event.request.url.startsWith(FONT_DOMAIN)) {
    return;
  }

  event.respondWith(caches.open(CACHE).then(function (cache) {
    return cache.match(event.request).then(function (cacheResponse) {
      if (cacheResponse) {
        // Required to fetch the fonts for every page load, we also use this to refresh the cache.
        fetchAndCache(event.request, cache);
        return cacheResponse;
      }
      return fetchAndCache(event.request, cache);
    }).catch(function (error) {
      throw error;
    });
  }));
});