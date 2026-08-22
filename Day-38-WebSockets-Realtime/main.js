/* ========================================== */
/* DAY 38: MAIN INTEGRATION                   */
/* ========================================== */

import {

    connectWebSocket,
    sendLiveMessage

} from './websocket.js';


/* ========================================== */
/* DOM ELEMENTS                               */
/* ========================================== */

const wsInput =
    document.getElementById(
        'ws-input'
    );


const wsSendBtn =
    document.getElementById(
        'ws-send'
    );


/* ========================================== */
/* INITIALIZE WEBSOCKET                       */
/* ========================================== */

document.addEventListener(
    'DOMContentLoaded',
    () => {

        connectWebSocket();

    }
);


/* ========================================== */
/* SEND MESSAGE                               */
/* ========================================== */

function handleSend() {

    const text =
        wsInput.value.trim();


    if (
        text === ''
    ) {

        return;

    }


    sendLiveMessage(
        text
    );


    wsInput.value =
        '';


    wsInput.focus();

}


/* ========================================== */
/* BUTTON EVENT                               */
/* ========================================== */

if (
    wsSendBtn &&
    wsInput
) {

    wsSendBtn.addEventListener(
        'click',
        handleSend
    );


    /* ====================================== */
    /* ENTER KEY                              */
    /* ====================================== */

    wsInput.addEventListener(
        'keydown',
        (event) => {

            if (
                event.key === 'Enter'
            ) {

                handleSend();

            }

        }
    );

}