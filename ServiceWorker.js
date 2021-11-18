/**
 * NAO TOQUE EM NADA SE NAO SOUBER O QUE ESTA FAZENDO
 * QUALQUER ERRO PODE DERRUBAR O SISTEMA INTEIRO PERMANENTEMENTE PARA TODOS OS USUARIOS ATIVOS
 */

const debug = false
const version = 'APP-0.1'

const cacheApp = []
cacheApp.push('./')

if (!debug) {
    this.addEventListener("install", event => {
        console.log('Instalando arquivos em cache')
        event.waitUntil(
            caches.open(version).then(cache => {
                return cache.addAll(cacheApp)
            })
        )
    })
}

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            console.warn('Destruindo caches antigos')
            return Promise.all(
                cacheNames.map(cacheName => {
                    return caches.delete(cacheName)
                })
            )
        })
    )
})


self.addEventListener('fetch', event => {
    if (event.request.url.startsWith(self.location.origin)) {
        event.respondWith(
            caches.match(event.request).then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse
                }
                if (debug) {
                    return fetch(event.request, {
                        headers: {
                            'pragma': 'no-cache',
                            'cache-control': 'no-cache'
                        }
                    })
                }
                else {
                    return caches.open(version).then(cache => {
                        return fetch(event.request, {
                            headers: {
                                'pragma': 'no-cache',
                                'cache-control': 'no-cache'
                            }
                        }).then(response => {
                            return cache.put(event.request, response.clone()).then(() => {
                                return response
                            })
                        })
                    })
                }
            })
        )
    }
})