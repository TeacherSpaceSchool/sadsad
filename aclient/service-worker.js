importScripts("/precache-manifest.0ccb4e969ebb47c449dc072ad87a8d63.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

console.log('start-sw')
self.addEventListener('install', event => {
    console.log('install')
})
self.addEventListener('activate', event => {
    console.log('activate')
})
workbox.precaching.precacheAndRoute(self.__precacheManifest || [])
workbox.routing.registerRoute(
    new RegExp('https:.*(jpg|jpeg)'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'cache'
    })
)
workbox.routing.registerRoute(
    new RegExp('https:.*(png)'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'cache'
    })
)
workbox.routing.registerRoute(
    new RegExp('https:.*(js)'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'cache'
    })
)
workbox.routing.registerRoute(
    new RegExp('https:.*(css)'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'cache'
    })
)
