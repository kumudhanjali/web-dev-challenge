/* ========================================== */
/* utils.js: NETWORK UTILITIES                */
/* ========================================== */


/* ========================================== */
/* FETCH WITH RETRY                           */
/* ========================================== */

export async function fetchWithRetry(
    url,
    options = {},
    retries = 2
) {

    try {

        return await fetch(
            url,
            options
        );

    } catch (
        error
    ) {

        if (
            retries <= 0
        ) {

            throw error;

        }


        await new Promise(
            (
                resolve
            ) => {

                setTimeout(
                    resolve,
                    800
                );

            }
        );


        return fetchWithRetry(
            url,
            options,
            retries - 1
        );

    }

}