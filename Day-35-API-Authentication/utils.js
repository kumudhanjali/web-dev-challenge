/* ========================================== */
/* DAY 35: RESILIENT FETCH UTILITY            */
/* ========================================== */

export async function fetchWithRetry(
    url,
    options = {},
    retries = 2
) {

    let lastError;

    for (let attempt = 0; attempt <= retries; attempt++) {

        try {

            const response = await fetch(url, options);

            return response;

        } catch (error) {

            lastError = error;

            if (attempt < retries) {

                await new Promise(resolve => {
                    setTimeout(resolve, 700);
                });

            }

        }

    }

    throw lastError;
}