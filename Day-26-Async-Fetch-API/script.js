/* ========================================== */
/* DAY 26: ASYNCHRONOUS JAVASCRIPT & APIs     */
/* ========================================== */

const searchBtn = document.getElementById('search-dev-btn');
const usernameInput = document.getElementById('github-username');
const profileContainer = document.getElementById('dev-profile-card');

// 1. THE ASYNC FETCH FUNCTION
// The 'async' keyword allows us to use 'await' inside this block
async function fetchContributor(username) {
    
    // Step A: Show a loading state so the user knows something is happening
    profileContainer.innerHTML = `<p class="loading-text">Fetching data from GitHub...</p>`;

    // Step B: The Try/Catch block for resilient engineering
    try {
        // 1. Make the network request and WAIT for the response
        // YOUR CODE HERE: const response = await fetch(...)
        const response = await fetch(`https://api.github.com/users/${username}`);        

        // 2. Gatekeeper: Check if the server said "404 Not Found"
        if (!response.ok) {
            throw new Error(`Profile not found (Status: ${response.status})`);
        }

        // 3. Parse the raw response into a usable JSON object
        // YOUR CODE HERE: const data = await response.json();
        const data = await response.json();

        // 4. Inject the data into the DOM
        profileContainer.innerHTML = `
            <div class="profile-card">
                <img src="${data.avatar_url}" alt="${data.name}'s Avatar" style="width: 100px; border-radius: 50%;">
                <h3>${data.name || data.login}</h3>
                <p>${data.bio || "No bio available."}</p>
                <a href="${data.html_url}" target="_blank" class="btn-primary">View GitHub</a>
            </div>
        `;

    } catch (error) {
        // Step C: If ANYTHING fails above, the code instantly jumps here
        console.error("API Error:", error);
        
        // Show a clean error message to the user, not a crashed app!
        profileContainer.innerHTML = `
            <div class="error-state">
                <p>⚠️ ${error.message}</p>
            </div>
        `;
    }
}

// 2. THE EVENT LISTENER
if (searchBtn && usernameInput) {
    searchBtn.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        
        if (username === '') {
            alert("Please enter a username.");
            return;
        }

        // Execute the async function!
        fetchContributor(username);
    });
}