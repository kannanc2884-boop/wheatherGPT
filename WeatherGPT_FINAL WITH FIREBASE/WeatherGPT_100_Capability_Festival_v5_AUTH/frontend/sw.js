const VERSION='weathergpt-v5-auth-no-stale-cache';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const k of await caches.keys())await caches.delete(k);await self.registration.unregister();})()));
self.addEventListener('fetch',()=>{});
