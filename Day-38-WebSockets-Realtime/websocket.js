/* ========================================== */
/* DAY 38: PERSISTENT DATA STREAMS            */
/* ========================================== */


/* ========================================== */
/* WEBSOCKET CONFIGURATION                    */
/* ========================================== */

const wsUrl =
    'wss://ws.postman-echo.com/raw';


let liveSocket =
    null;


let reconnectTimer =
    null;


let shouldReconnect =
    true;


/* ========================================== */
/* DOM HELPERS                                */
/* ========================================== */

function getLiveFeed() {

    return document.getElementById(
        'live-feed'
    );

}


function getStatusIndicator() {

    return document.getElementById(
        'connection-status'
    );

}


function getStatusText() {

    return document.getElementById(
        'status-text'
    );

}


function getSendButton() {

    return document.getElementById(
        'ws-send'
    );

}


/* ========================================== */
/* CONNECTION STATUS                          */
/* ========================================== */

function updateConnectionStatus(
    status,
    text
) {

    const indicator =
        getStatusIndicator();


    const statusText =
        getStatusText();


    if (
        !indicator ||
        !statusText
    ) {

        return;

    }


    indicator.classList.remove(
        'online',
        'offline',
        'connecting'
    );


    indicator.classList.add(
        status
    );


    statusText.textContent =
        text;

}


/* ========================================== */
/* ADD MESSAGE TO LIVE FEED                   */
/* ========================================== */

function addMessage(
    type,
    sender,
    text
) {

    const feed =
        getLiveFeed();


    if (
        !feed
    ) {

        return;

    }


    const message =
        document.createElement(
            'div'
        );


    message.className =
        `msg ${type}`;


    const meta =
        document.createElement(
            'div'
        );


    meta.className =
        'message-meta';


    meta.textContent =
        sender;


    const bubble =
        document.createElement(
            'div'
        );


    bubble.className =
        'message-bubble';


    /*
        Using textContent instead of innerHTML
        keeps the received WebSocket data safe.
    */

    bubble.textContent =
        text;


    message.appendChild(
        meta
    );


    message.appendChild(
        bubble
    );


    feed.appendChild(
        message
    );


    feed.scrollTop =
        feed.scrollHeight;

}


/* ========================================== */
/* ADD SYSTEM MESSAGE                         */
/* ========================================== */

function addSystemMessage(
    text
) {

    const feed =
        getLiveFeed();


    if (
        !feed
    ) {

        return;

    }


    const message =
        document.createElement(
            'div'
        );


    message.className =
        'msg error';


    message.textContent =
        text;


    feed.appendChild(
        message
    );


    feed.scrollTop =
        feed.scrollHeight;

}


/* ========================================== */
/* ESTABLISH CONNECTION                       */
/* ========================================== */

export function connectWebSocket() {

    /*
        Prevent duplicate connections.
    */

    if (
        liveSocket &&
        (
            liveSocket.readyState ===
            WebSocket.OPEN ||

            liveSocket.readyState ===
            WebSocket.CONNECTING
        )
    ) {

        return;

    }


    console.log(
        '🔌 Attempting to connect to live server...'
    );


    updateConnectionStatus(
        'connecting',
        'Connecting'
    );


    const sendButton =
        getSendButton();


    if (
        sendButton
    ) {

        sendButton.disabled =
            true;

    }


    /* ====================================== */
    /* CREATE WEBSOCKET                       */
    /* ====================================== */

    liveSocket =
        new WebSocket(
            wsUrl
        );


    /* ====================================== */
    /* EVENT: CONNECTION OPEN                 */
    /* ====================================== */

    liveSocket.onopen =
        () => {

            console.log(
                '🟢 Live Connection Established!'
            );


            updateConnectionStatus(
                'online',
                'Online'
            );


            if (
                sendButton
            ) {

                sendButton.disabled =
                    false;

            }


            addMessage(
                'received',
                'SYSTEM · CONNECTED',
                'Secure WebSocket connection established. You can start sending messages.'
            );

        };


    /* ====================================== */
    /* EVENT: MESSAGE RECEIVED                */
    /* ====================================== */

    liveSocket.onmessage =
        (event) => {

            console.log(
                '📥 Incoming Stream:',
                event.data
            );


            addMessage(
                'received',
                'SERVER · ECHO',
                event.data
            );

        };


    /* ====================================== */
    /* EVENT: ERROR                           */
    /* ====================================== */

    liveSocket.onerror =
        (error) => {

            console.error(
                '⚠️ WebSocket Error:',
                error
            );


            addSystemMessage(
                'Connection error detected.'
            );

        };


    /* ====================================== */
    /* EVENT: CONNECTION CLOSED               */
    /* ====================================== */

    liveSocket.onclose =
        () => {

            console.warn(
                '🔴 Connection Lost.'
            );


            updateConnectionStatus(
                'offline',
                'Offline'
            );


            if (
                sendButton
            ) {

                sendButton.disabled =
                    true;

            }


            /*
                BONUS CHALLENGE:
                AUTO RECONNECT AFTER 3 SECONDS
            */

            if (
                shouldReconnect
            ) {

                addSystemMessage(
                    'Connection closed. Reconnecting in 3 seconds...'
                );


                clearTimeout(
                    reconnectTimer
                );


                reconnectTimer =
                    setTimeout(
                        () => {

                            connectWebSocket();

                        },
                        3000
                    );

            }

        };

}


/* ========================================== */
/* TRANSMISSION ENGINE                        */
/* ========================================== */

export function sendLiveMessage(
    payloadText
) {

    /*
        DEFENSIVE CHECK:
        Only send when the socket is open.
    */

    if (
        liveSocket &&
        liveSocket.readyState ===
        WebSocket.OPEN
    ) {

        /* ================================== */
        /* SEND TO SERVER                     */
        /* ================================== */

        liveSocket.send(
            payloadText
        );


        console.log(
            '📤 Outgoing Stream:',
            payloadText
        );


        /* ================================== */
        /* UPDATE USER INTERFACE              */
        /* ================================== */

        addMessage(
            'sent',
            'YOU · SENT',
            payloadText
        );

    }


    else {

        console.error(
            'Cannot transmit: Connection is not open.'
        );


        addSystemMessage(
            'Waiting for the WebSocket connection...'
        );

    }

}


/* ========================================== */
/* CLEAN UP CONNECTION                        */
/* ========================================== */

window.addEventListener(
    'beforeunload',
    () => {

        shouldReconnect =
            false;


        clearTimeout(
            reconnectTimer
        );


        if (
            liveSocket
        ) {

            liveSocket.close();

        }

    }
);