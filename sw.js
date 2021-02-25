self.addEventListener('install', function(event) {
    event.waitUntil(preLoad());
});

const cacheName = "cache-juststudy-1.0.1";

var preLoad = function(){
    return caches.open(cacheName).then(function(cache) {
        return cache.addAll([ 'index.html', 'style.css', 'script.js', 'assets/break.mp3',  'assets/reset.mp3',  'assets/study.mp3' ]);
    });
};


self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});

var checkResponse = function(request){
    return new Promise(function(fulfill, reject) {
        fetch(request).then(function(response){
            if(response.status !== 404) {
                fulfill(response);
            } else {
                reject();
            }
        }, reject);
    });
};

var addToCache = function(request){
    return caches.open(cacheName).then(function (cache) {
        return fetch(request).then(function (response) {
            return cache.put(request, response);
        });
    });
};

var returnFromCache = function(request){
    return caches.open(cacheName).then(function (cache) {
        return cache.match(request).then(function (matching) {
            if(!matching || matching.status == 404) {
                return cache.match('404.html');
            } else {
                return matching;
            }
        });
    });
};
