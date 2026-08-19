/* ========================================== */
/* api.js: Network Requests & Caching         */
/* ========================================== */

import { fetchWithRetry } from './utils.js';

const apiCache = new Map();

export async function fetchUserData(username) {

    const safeUsername = username.toLowerCase();

    // Check cache first
    if (apiCache.has(safeUsername)) {

        console.log(`⚡ Serving [${safeUsername}] from local cache!`);

        return apiCache.get(safeUsername);
    }

    console.log(`📡 Fetching [${safeUsername}] from external server...`);

    try {

        const response = await fetchWithRetry(
            `https://api.github.com/users/${safeUsername}`
        );

        // Rate limit
        if (response.status === 403 || response.status === 429) {
            throw new Error("API Rate Limit exceeded.");
        }

        // User not found
        if (response.status === 404) {
            throw new Error("User not found.");
        }

        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }

        const data = await response.json();

        // Save successful response in memory
        apiCache.set(safeUsername, data);

        return data;

    } catch (error) {

        throw error;

    }
}