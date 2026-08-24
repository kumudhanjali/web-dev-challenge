/* ========================================== */
/* db.js: INDEXEDDB DATABASE MODULE           */
/* ========================================== */


const DB_NAME =
    'PlatformDB';


const DB_VERSION =
    1;


const STORE_NAME =
    'offline_proposals';


/* ========================================== */
/* INITIALIZE DATABASE                        */
/* ========================================== */

function initDB() {

    return new Promise(
        (
            resolve,
            reject
        ) => {

            const request =
                indexedDB.open(
                    DB_NAME,
                    DB_VERSION
                );


            request.onupgradeneeded =
                (event) => {

                    const db =
                        event.target.result;


                    if (
                        !db.objectStoreNames.contains(
                            STORE_NAME
                        )
                    ) {

                        db.createObjectStore(
                            STORE_NAME,
                            {
                                keyPath:
                                    'id',

                                autoIncrement:
                                    true
                            }
                        );


                        console.log(
                            `🗄️ Object store "${STORE_NAME}" created.`
                        );

                    }

                };


            request.onsuccess =
                (event) => {

                    resolve(
                        event.target.result
                    );

                };


            request.onerror =
                (event) => {

                    console.error(
                        'IndexedDB Error:',
                        event.target.error
                    );


                    reject(
                        event.target.error
                    );

                };

        }
    );

}


/* ========================================== */
/* SAVE OFFLINE DATA                          */
/* ========================================== */

export async function saveOfflineData(
    payload
) {

    const db =
        await initDB();


    return new Promise(
        (
            resolve,
            reject
        ) => {

            const transaction =
                db.transaction(
                    [STORE_NAME],
                    'readwrite'
                );


            const store =
                transaction.objectStore(
                    STORE_NAME
                );


            const request =
                store.add(
                    {
                        ...payload,

                        savedAt:
                            Date.now()
                    }
                );


            request.onsuccess =
                () => {

                    console.log(
                        '💾 Proposal saved safely in IndexedDB.'
                    );


                    resolve(
                        request.result
                    );

                };


            request.onerror =
                () => {

                    console.error(
                        'Failed to save proposal:',
                        request.error
                    );


                    reject(
                        request.error
                    );

                };


            transaction.oncomplete =
                () => {

                    db.close();

                };

        }
    );

}


/* ========================================== */
/* BONUS: GET ALL OFFLINE DATA                */
/* ========================================== */

export async function getOfflineData() {

    const db =
        await initDB();


    return new Promise(
        (
            resolve,
            reject
        ) => {

            const transaction =
                db.transaction(
                    [STORE_NAME],
                    'readonly'
                );


            const store =
                transaction.objectStore(
                    STORE_NAME
                );


            const request =
                store.getAll();


            request.onsuccess =
                () => {

                    console.log(
                        '📦 Offline proposals recovered:',
                        request.result
                    );


                    resolve(
                        request.result
                    );

                };


            request.onerror =
                () => {

                    console.error(
                        'Failed to retrieve offline data:',
                        request.error
                    );


                    reject(
                        request.error
                    );

                };


            transaction.oncomplete =
                () => {

                    db.close();

                };

        }
    );

}


/* ========================================== */
/* DELETE A SAVED RECORD                      */
/* ========================================== */

export async function deleteOfflineData(
    id
) {

    const db =
        await initDB();


    return new Promise(
        (
            resolve,
            reject
        ) => {

            const transaction =
                db.transaction(
                    [STORE_NAME],
                    'readwrite'
                );


            const store =
                transaction.objectStore(
                    STORE_NAME
                );


            const request =
                store.delete(
                    id
                );


            request.onsuccess =
                () => {

                    resolve();

                };


            request.onerror =
                () => {

                    reject(
                        request.error
                    );

                };


            transaction.oncomplete =
                () => {

                    db.close();

                };

        }
    );

}