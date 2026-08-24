/* ========================================== */
/* api.js: NETWORK & OFFLINE INTERCEPTION     */
/* ========================================== */


import {

    fetchWithRetry

} from './utils.js';


import {

    saveOfflineData

} from './db.js';


/* ========================================== */
/* SUBMIT INITIATIVE                          */
/* ========================================== */

export async function submitInitiative(
    dataPayload
) {


    /* ====================================== */
    /* OFFLINE GATEKEEPER                    */
    /* ====================================== */

    if (
        !navigator.onLine
    ) {

        console.warn(
            '🌐 Offline detected. Saving proposal locally.'
        );


        await saveOfflineData(
            dataPayload
        );


        throw new Error(
            'OFFLINE_SAVED'
        );

    }


    /* ====================================== */
    /* ONLINE REQUEST                        */
    /* ====================================== */

    const response =
        await fetchWithRetry(
            'https://jsonplaceholder.typicode.com/posts',
            {
                method:
                    'POST',

                headers:
                    {
                        'Content-Type':
                            'application/json'
                    },

                body:
                    JSON.stringify(
                        dataPayload
                    )
            }
        );


    if (
        !response.ok
    ) {

        throw new Error(
            'Server rejected the proposal.'
        );

    }


    return await response.json();

}