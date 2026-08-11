/* ========================================== */
/* DAY 26 + DAY 27: GITHUB API PROJECT       */
/* ========================================== */


/* ========================================== */
/* DOM ELEMENTS                               */
/* ========================================== */

const searchBtn =
    document.getElementById('search-dev-btn');

const usernameInput =
    document.getElementById('github-username');

const profileContainer =
    document.getElementById('dev-profile-card');

const reposGrid =
    document.getElementById('repos-grid');


/* ========================================== */
/* DAY 26: ASYNC FETCH FUNCTION               */
/* ========================================== */

async function fetchContributor(username) {


    // ==========================================
    // DAY 26 BONUS: LOADING STATE
    // ==========================================

    profileContainer.innerHTML = `
        <p class="loading-text">
            Fetching data from GitHub...
        </p>
    `;


    // ==========================================
    // TRY / CATCH
    // ==========================================

    try {


        // ==========================================
        // DAY 26: FETCH GITHUB PROFILE
        // ==========================================

        const response = await fetch(
            `https://api.github.com/users/${username}`
        );


        // ==========================================
        // DAY 26: ERROR GATEKEEPING
        // ==========================================

        if (!response.ok) {

            throw new Error(
                `Profile not found (Status: ${response.status})`
            );

        }


        // ==========================================
        // DAY 26: PARSE JSON
        // ==========================================

        const data =
            await response.json();


        // ==========================================
        // DAY 26: RENDER PROFILE
        // ==========================================

        profileContainer.innerHTML = `
            <div class="profile-card">

                <img
                    src="${data.avatar_url}"
                    alt="${data.name || data.login}'s Avatar"
                >

                <h3>
                    ${data.name || data.login}
                </h3>

                <p>
                    ${data.bio || "No bio available."}
                </p>

                <a
                    href="${data.html_url}"
                    target="_blank"
                    class="btn-primary"
                >
                    View GitHub
                </a>

            </div>
        `;


        // ==========================================
        // DAY 27: CHAIN REPOSITORY FETCH
        // ==========================================
        // If the profile succeeds, fetch the repos!

        fetchRepositories(username);


    }


    catch (error) {


        // ==========================================
        // DAY 26: ERROR HANDLING
        // ==========================================

        console.error(
            "API Error:",
            error
        );


        profileContainer.innerHTML = `
            <div class="error-state">

                <p>
                    ⚠️ ${error.message}
                </p>

            </div>
        `;


        // Clear old repository results
        reposGrid.innerHTML = '';

    }

}


/* ========================================== */
/* DAY 27: API ARRAY ITERATION & FEEDS        */
/* ========================================== */


async function fetchRepositories(username) {


    // ==========================================
    // STEP A: LOADING STATE
    // ==========================================

    if (reposGrid) {

        reposGrid.innerHTML =
            `<p class="loading-text">
                Loading repositories...
            </p>`;

    }


    try {


        // ==========================================
        // STEP B: FETCH REPOSITORY ARRAY
        // ==========================================

        const response = await fetch(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`
        );


        // ==========================================
        // CHECK RESPONSE
        // ==========================================

        if (!response.ok) {

            throw new Error(
                "Could not fetch repositories."
            );

        }


        // ==========================================
        // PARSE JSON ARRAY
        // ==========================================

        const data =
            await response.json();


        // ==========================================
        // INSPECT API RESPONSE
        // ==========================================

        console.log(
            "Repository Data:",
            data
        );


        // ==========================================
        // STEP C: CLEAR THE GRID
        // ==========================================

        reposGrid.innerHTML = '';


        // ==========================================
        // STEP D: EMPTY STATE
        // ==========================================

        if (data.length === 0) {

            reposGrid.innerHTML =
                `<p>
                    No public repositories found.
                </p>`;

            return;

        }


        // ==========================================
        // STEP E: ARRAY ITERATION
        // ==========================================

        data.forEach(repo => {


            // ==========================================
            // BUILD REPOSITORY CARD
            // ==========================================

            const repoCard = `

                <div class="initiative-card">

                    <h3>
                        ${repo.name}
                    </h3>


                    <p>
                        ${
                            repo.description ||
                            "No description provided."
                        }
                    </p>


                    <div class="repo-meta">

                        <span>
                            ⭐ ${repo.stargazers_count}
                        </span>


                        <span>
                            🍴 ${repo.forks_count}
                        </span>

                    </div>


                    <a
                        href="${repo.html_url}"
                        target="_blank"
                        class="btn-secondary"
                    >
                        View Code
                    </a>

                </div>

            `;


            // ==========================================
            // INJECT CARD INTO GRID
            // ==========================================

            reposGrid.innerHTML +=
                repoCard;

        });

    }


    catch (error) {


        // ==========================================
        // ERROR HANDLING
        // ==========================================

        console.error(
            "Repo Fetch Error:",
            error
        );


        reposGrid.innerHTML =
            `<p class="error-text">
                ⚠️ Failed to load repositories.
            </p>`;

    }

}


/* ========================================== */
/* SEARCH EVENT LISTENER                      */
/* ========================================== */

if (searchBtn && usernameInput) {

    searchBtn.addEventListener(
        'click',
        () => {


            // Get username
            const username =
                usernameInput.value.trim();


            // ==========================================
            // EMPTY INPUT CHECK
            // ==========================================

            if (username === '') {

                alert(
                    "Please enter a username."
                );

                return;

            }


            // ==========================================
            // START API REQUEST
            // ==========================================

            fetchContributor(username);

        }
    );

}


/* ========================================== */
/* ENTER KEY SUPPORT                          */
/* ========================================== */

if (usernameInput) {

    usernameInput.addEventListener(
        'keydown',
        (event) => {

            if (event.key === 'Enter') {

                searchBtn.click();

            }

        }
    );

}