/* ========================================== */
/* DAY 39: SERVICE WORKER                     */
/* OFFLINE-FIRST ARCHITECTURE                 */
/* ========================================== */


/* ========================================== */
/* CACHE CONFIGURATION                        */
/* ========================================== */

// Change the version when cached files change.
// This allows the activate event to remove old caches.

const CACHE_NAME =
    'platform-cache-v2';


const ASSETS_TO_CACHE = [

    './',

    './index.html',

    './style.css',

    './main.js'

];


/* ========================================== */
/* INSTALL LIFECYCLE                          */
/* ========================================== */

// Cache the core application shell when the
// Service Worker is installed.

self.addEventListener(
    'install',
    (event) => {

        console.log(
            '[Service Worker] Installing...'
        );


        event.waitUntil(

            caches.open(
                CACHE_NAME
            )
            .then(
                (cache) => {

                    console.log(
                        '[Service Worker] Caching application shell.'
                    );


                    return cache.addAll(
                        ASSETS_TO_CACHE
                    );

                }
            )
            .then(
                () => {

                    return self.skipWaiting();

                }
            )

        );

    }
);


/* ========================================== */
/* ACTIVATE LIFECYCLE                         */
/* BONUS: DELETE OLD CACHE VERSIONS           */
/* ========================================== */

self.addEventListener(
    'activate',
    (event) => {

        console.log(
            '[Service Worker] Activating...'
        );


        event.waitUntil(

            caches.keys()
            .then(
                (cacheNames) => {

                    return Promise.all(

                        cacheNames.map(
                            (cacheName) => {

                                if (
                                    cacheName !==
                                    CACHE_NAME
                                ) {

                                    console.log(
                                        '[Service Worker] Deleting old cache:',
                                        cacheName
                                    );


                                    return caches.delete(
                                        cacheName
                                    );

                                }

                            }
                        )

                    );

                }
            )
            .then(
                () => {

                    return self.clients.claim();

                }
            )

        );

    }
);


/* ========================================== */
/* FETCH INTERCEPT                            */
/* CACHE-FIRST STRATEGY                       */
/* ========================================== */

self.addEventListener(
    'fetch',
    (event) => {

        // Only intercept GET requests.

        if (
            event.request.method !==
            'GET'
        ) {

            return;

        }


        event.respondWith(

            caches.match(
                event.request
            )
            .then(
                (cachedResponse) => {

                    // Return cached files immediately.

                    if (
                        cachedResponse
                    ) {

                        return cachedResponse;

                    }


                    // If the file is not cached,
                    // use the normal network request.

                    return fetch(
                        event.request
                    );

                }
            )
            .catch(
                () => {

                    // If both the cache and network fail,
                    // return the cached application shell.

                    return caches.match(
                        './index.html'
                    );

                }
            )

        );

    }
);