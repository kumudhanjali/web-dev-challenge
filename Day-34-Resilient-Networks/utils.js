/* ========================================== */
/* utils.js: Helper Functions                 */
/* ========================================== */

export function debounce(func, delay = 500) {

    let timeoutId;

    return function (...args) {

        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);

    };
}


/* ========================================== */
/* Network Resilience Wrapper                 */
/* ========================================== */

export async function fetchWithRetry(
    url,
    options = {},
    retries = 3,
    backoff = 500
) {

    // Bonus: Check if the browser is completely offline
    if (!navigator.onLine) {
        throw new Error("No internet connection detected.");
    }

    // Retry loop
    for (let i = 0; i < retries; i++) {

        try {

            console.log(`🔄 Attempt ${i + 1} of ${retries}`);

            const response = await fetch(url, options);

            /*
             * Do not retry 400-level errors.
             * These usually mean the request itself is invalid
             * or the resource does not exist.
             */
            if (response.status >= 400 && response.status < 500) {
                return response;
            }

            /*
             * Server errors such as 500 should trigger
             * another attempt.
             */
            if (!response.ok) {
                throw new Error(
                    `Server Error: ${response.status}`
                );
            }

            // Successful request
            console.log("✅ Request successful.");

            return response;

        } catch (error) {

            // Last attempt - give up
            if (i === retries - 1) {

                console.error(
                    `❌ Fetch failed after ${retries} attempts.`
                );

                throw error;
            }

            console.warn(
                `⚠️ Attempt ${i + 1} failed. ` +
                `Retrying in ${backoff}ms...`
            );

            // Wait before retrying
            await new Promise(resolve => {
                setTimeout(resolve, backoff);
            });

            // Exponential backoff
            backoff *= 2;
        }
    }
}