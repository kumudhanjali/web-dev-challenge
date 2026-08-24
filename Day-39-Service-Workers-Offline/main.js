/* ========================================== */
/* DAY 39: SERVICE WORKER REGISTRATION        */
/* ========================================== */


/* ========================================== */
/* DOM ELEMENTS                               */
/* ========================================== */

const networkStatus =
    document.getElementById(
        'network-status'
    );


const networkText =
    document.getElementById(
        'network-text'
    );


const stateTitle =
    document.getElementById(
        'state-title'
    );


const stateDescription =
    document.getElementById(
        'state-description'
    );


const stateBadge =
    document.getElementById(
        'state-badge'
    );


const stateSymbol =
    document.getElementById(
        'state-symbol'
    );


const workerMessage =
    document.getElementById(
        'worker-message'
    );


const checkStatusButton =
    document.getElementById(
        'check-status'
    );


const cacheVersion =
    document.getElementById(
        'cache-version'
    );


/* ========================================== */
/* UI: NETWORK STATUS                         */
/* ========================================== */

function updateNetworkStatus() {

    const isOnline =
        navigator.onLine;


    networkStatus.classList.remove(
        'online',
        'offline'
    );


    if (
        isOnline
    ) {

        networkStatus.classList.add(
            'online'
        );


        networkText.textContent =
            'Online';

    } else {

        networkStatus.classList.add(
            'offline'
        );


        networkText.textContent =
            'Offline';

    }

}


/* ========================================== */
/* UI: SERVICE WORKER READY                   */
/* ========================================== */

function showWorkerReady() {

    stateTitle.textContent =
        'Offline protection is ready.';


    stateDescription.textContent =
        'Your core application shell has been cached and can be served even when the network is unavailable.';


    stateBadge.classList.remove(
        'loading',
        'offline'
    );


    stateBadge.classList.add(
        'ready'
    );


    stateSymbol.textContent =
        '✓';


    workerMessage.textContent =
        'Service Worker active — your core files are protected.';

}


/* ========================================== */
/* UI: OFFLINE MODE                           */
/* ========================================== */

function showOfflineState() {

    stateTitle.textContent =
        'You are currently offline.';


    stateDescription.textContent =
        'The browser can still serve your cached application shell without reaching the network.';


    stateBadge.classList.remove(
        'loading',
        'ready'
    );


    stateBadge.classList.add(
        'offline'
    );


    stateSymbol.textContent =
        '⌁';


    workerMessage.textContent =
        'Offline mode detected — cached assets are doing the work.';

}


/* ========================================== */
/* UI: CHECK STATUS                           */
/* ========================================== */

async function checkWorkerStatus() {

    updateNetworkStatus();


    if (
        !('serviceWorker' in navigator)
    ) {

        stateTitle.textContent =
            'Service Workers are unavailable.';


        stateDescription.textContent =
            'This browser does not support the Service Worker API.';


        workerMessage.textContent =
            'Try opening this project in a modern browser.';


        return;

    }


    const registration =
        await navigator.serviceWorker.getRegistration();


    if (
        registration &&
        navigator.serviceWorker.controller
    ) {

        if (
            navigator.onLine
        ) {

            showWorkerReady();

        } else {

            showOfflineState();

        }

    } else {

        stateTitle.textContent =
            'Waiting for activation...';


        stateDescription.textContent =
            'The Service Worker has been registered and will take control shortly.';


        workerMessage.textContent =
            'Refresh once after the first registration to test offline mode.';

    }

}


/* ========================================== */
/* REGISTER SERVICE WORKER                    */
/* ========================================== */

window.addEventListener(
    'load',
    async () => {

        updateNetworkStatus();


        if (
            'serviceWorker' in navigator
        ) {

            try {

                const registration =
                    await navigator.serviceWorker.register(
                        './sw.js'
                    );


                console.log(
                    '✅ Service Worker registered:',
                    registration.scope
                );


                cacheVersion.textContent =
                    'platform-cache-v2';


                await navigator.serviceWorker.ready;


                checkWorkerStatus();

            } catch (
                error
            ) {

                console.error(
                    '⚠️ Service Worker registration failed:',
                    error
                );


                stateTitle.textContent =
                    'Registration failed.';


                stateDescription.textContent =
                    'The Service Worker could not be installed. Make sure you are running the project through localhost or HTTPS.';


                workerMessage.textContent =
                    'Service Workers require localhost or a secure HTTPS connection.';

            }

        } else {

            stateTitle.textContent =
                'Service Workers are unavailable.';


            stateDescription.textContent =
                'This browser does not support offline Service Worker architecture.';


            workerMessage.textContent =
                'Try opening the project in a modern browser.';

        }

    }
);


/* ========================================== */
/* ONLINE / OFFLINE EVENTS                    */
/* ========================================== */

window.addEventListener(
    'online',
    () => {

        updateNetworkStatus();


        checkWorkerStatus();

    }
);


window.addEventListener(
    'offline',
    () => {

        updateNetworkStatus();


        showOfflineState();

    }
);


/* ========================================== */
/* CHECK BUTTON                               */
/* ========================================== */

if (
    checkStatusButton
) {

    checkStatusButton.addEventListener(
        'click',
        checkWorkerStatus
    );

}