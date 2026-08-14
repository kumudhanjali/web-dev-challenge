/* ========================================== */
/* DAY 28: REAL-TIME API SEARCH & THROTTLING  */
/* ========================================== */


/* ========================================== */
/* DOM ELEMENTS                               */
/* ========================================== */

const searchInput =
    document.getElementById('github-username');

const profileContainer =
    document.getElementById('dev-profile-card');

const reposGrid =
    document.getElementById('repos-grid');


/* ========================================== */
/* ABORT CONTROLLER                           */
/* BONUS: CANCEL OLD REQUESTS                 */
/* ========================================== */

let controller = null;


/* ========================================== */
/* DAY 21: DEBOUNCE UTILITY                   */
/* ========================================== */

function debounce(func, delay = 500) {

    let timeoutId;


    return function (...args) {

        clearTimeout(timeoutId);


        timeoutId = setTimeout(() => {

            func.apply(this, args);

        }, delay);

    };

}


/* ========================================== */
/* DAY 28: FETCH CONTRIBUTOR                  */
/* ========================================== */

async function fetchContributor() {


    // ==========================================
    // GET CURRENT INPUT VALUE
    // ==========================================

    const username =
        searchInput.value.trim();


    // ==========================================
    // EMPTY STATE
    // ==========================================

    if (username === '') {

        profileContainer.innerHTML = '';

        reposGrid.innerHTML = '';

        return;

    }


    // ==========================================
    // CANCEL PREVIOUS REQUEST
    // ==========================================

    if (controller) {

        controller.abort();

    }


    controller =
        new AbortController();


    // ==========================================
    // LOADING STATE
    // ==========================================

    profileContainer.innerHTML = `

        <p class="loading-text">

            Searching for
            ${username}...

        </p>

    `;


    reposGrid.innerHTML = '';


    try {


        // ==========================================
        // FETCH GITHUB PROFILE
        // ==========================================

        const response = await fetch(

            `https://api.github.com/users/${username}`,

            {
                signal:
                    controller.signal
            }

        );


        // ==========================================
        // RATE LIMIT GATEKEEPING
        // ==========================================

        if (
            response.status === 403 ||
            response.status === 429
        ) {

            throw new Error(
                "API Rate Limit exceeded. Please wait a moment."
            );

        }


        // ==========================================
        // STANDARD HTTP ERROR
        // ==========================================

        if (!response.ok) {

            throw new Error(
                "Developer not found."
            );

        }


        // ==========================================
        // PARSE JSON
        // ==========================================

        const data =
            await response.json();


        // ==========================================
        // RENDER PROFILE
        // ==========================================

        profileContainer.innerHTML = `

            <div class="profile-card">


                <img
                    src="${data.avatar_url}"
                    alt="GitHub avatar of ${
                        data.name || data.login
                    }">


                <h3>
                    ${
                        data.name ||
                        data.login
                    }
                </h3>


                <p>
                    ${
                        data.bio ||
                        "No bio available."
                    }
                </p>


                <a
                    href="${data.html_url}"
                    target="_blank"
                    class="btn-primary">

                    View GitHub

                </a>


            </div>

        `;


        // ==========================================
        // DAY 27: FETCH REPOSITORIES
        // ==========================================

        fetchRepositories(username);


    }


    catch (error) {


        // ==========================================
        // IGNORE ABORTED REQUESTS
        // ==========================================

        if (
            error.name === 'AbortError'
        ) {

            return;

        }


        // ==========================================
        // ERROR LOG
        // ==========================================

        console.error(
            "API Error:",
            error
        );


        // ==========================================
        // ERROR UI
        // ==========================================

        profileContainer.innerHTML = `

            <p class="error-text">

                ⚠️ ${error.message}

            </p>

        `;


        reposGrid.innerHTML = '';

    }

}


/* ========================================== */
/* DAY 27: FETCH REPOSITORIES                 */
/* ========================================== */

async function fetchRepositories(username) {


    // ==========================================
    // LOADING STATE
    // ==========================================

    if (reposGrid) {

        reposGrid.innerHTML = `

            <p class="loading-text">

                Loading repositories...

            </p>

        `;

    }


    try {


        // ==========================================
        // FETCH REPOSITORY ARRAY
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
        // CONVERT RESPONSE TO JSON
        // ==========================================

        const data =
            await response.json();


        // ==========================================
        // CONSOLE INSPECTION
        // ==========================================

        console.log(
            "Repository Data:",
            data
        );


        // ==========================================
        // CLEAR LOADING STATE
        // ==========================================

        reposGrid.innerHTML = '';


        // ==========================================
        // EMPTY STATE
        // ==========================================

        if (data.length === 0) {

            reposGrid.innerHTML = `

                <p>
                    No public repositories found.
                </p>

            `;

            return;

        }


        // ==========================================
        // ARRAY ITERATION
        // ==========================================

        data.forEach(repo => {


            // ==========================================
            // CREATE REPOSITORY CARD
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
                            ⭐
                            ${repo.stargazers_count}
                        </span>


                        <span>
                            🍴
                            ${repo.forks_count}
                        </span>


                    </div>


                    <a
                        href="${repo.html_url}"
                        target="_blank"
                        class="btn-secondary">

                        View Code

                    </a>


                </div>

            `;


            // ==========================================
            // ADD CARD TO GRID
            // ==========================================

            reposGrid.innerHTML +=
                repoCard;

        });


    }


    catch (error) {


        console.error(
            "Repo Fetch Error:",
            error
        );


        reposGrid.innerHTML = `

            <p class="error-text">

                ⚠️ Failed to load repositories.

            </p>

        `;

    }

}


/* ========================================== */
/* DAY 28: REAL-TIME INPUT LISTENER            */
/* ========================================== */

if (searchInput) {


    // ==========================================
    // WRAP FETCH IN DEBOUNCE
    // ==========================================

    const optimizedSearch =
        debounce(
            fetchContributor,
            500
        );


    // ==========================================
    // LISTEN TO EVERY KEYPRESS
    // ==========================================

    searchInput.addEventListener(
        'input',
        optimizedSearch
    );

}