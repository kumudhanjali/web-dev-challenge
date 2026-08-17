/* ========================================== */
/* DAY 33: DATA CACHING                       */
/* ========================================== */

const userCache = new Map();

const CACHE_TTL = 5 * 60 * 1000;


export async function fetchUserData(username) {

    const safeUsername = username.trim().toLowerCase();


    // Check cache first
    if (userCache.has(safeUsername)) {

        const cached = userCache.get(safeUsername);

        const age = Date.now() - cached.timestamp;


        // Cache is still valid
        if (age < CACHE_TTL) {

            console.log(
                `⚡ Serving [${safeUsername}] from local cache!`
            );

            return cached.data;
        }


        // Cache expired
        console.log(
            `♻️ Cache expired for [${safeUsername}]`
        );

        userCache.delete(safeUsername);
    }


    // Fetch from GitHub
    console.log(
        `📡 Fetching [${safeUsername}] from GitHub API...`
    );


    try {

        const response = await fetch(
            `https://api.github.com/users/${safeUsername}`
        );


        if (response.status === 403 || response.status === 429) {

            throw new Error("API Rate Limit exceeded.");

        }


        if (!response.ok) {

            throw new Error("User not found.");

        }


        const data = await response.json();


        // Save successful response to cache
        userCache.set(
            safeUsername,
            {
                data: data,
                timestamp: Date.now()
            }
        );


        console.log(
            `💾 [${safeUsername}] saved to cache.`
        );


        return data;

    } catch (error) {

        console.error("API Error:", error);

        throw error;
    }
}