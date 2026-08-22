import { debounce } from "./utils.js";

import { fetchDashboardData } from "./api.js";


const searchInput =
    document.getElementById("username-search");


const dashboardContainer =
    document.getElementById("dashboard-view");



async function renderDashboard() {

    const username =
        searchInput.value.trim();


    // ==========================================
    // EMPTY STATE
    // ==========================================

    if (!username) {

        dashboardContainer.innerHTML = `

            <div class="empty-state">

                <div class="empty-flower">
                    ✿
                </div>

                <h2>
                    Ready when you are.
                </h2>

                <p>
                    Search for a GitHub developer to assemble
                    their complete dashboard.
                </p>

            </div>

        `;

        return;

    }



    // ==========================================
    // LOADING STATE
    // ==========================================

    dashboardContainer.innerHTML = `

        <div class="loading-state">

            <div class="loading-flower">
                ✿
            </div>

            <h2>
                Assembling your dashboard...
            </h2>

            <p>
                Fetching profile, repositories and followers
                in parallel.
            </p>

        </div>

    `;



    try {

        // ==========================================
        // FETCH EVERYTHING IN PARALLEL
        // ==========================================

        const dashboard =
            await fetchDashboardData(username);



        const {

            profile,

            recentRepos,

            recentFollowers

        } = dashboard;



        // ==========================================
        // PROFILE SECTION
        // ==========================================

        let html = `

            <div class="dashboard-header">

                <img
                    src="${profile.avatar_url}"
                    alt="${profile.login}"
                    class="profile-avatar"
                >


                <div class="profile-content">

                    <h2 class="profile-name">

                        ${
                            profile.name ||
                            profile.login
                        }

                    </h2>


                    <p class="profile-username">

                        @${profile.login}

                    </p>


                    <p class="profile-bio">

                        ${
                            profile.bio ||
                            "This developer hasn't added a bio yet."
                        }

                    </p>


                    <div class="stats">


                        <div class="stat">

                            <div class="stat-number">

                                ${profile.public_repos}

                            </div>

                            <div class="stat-label">

                                Repositories

                            </div>

                        </div>


                        <div class="stat">

                            <div class="stat-number">

                                ${profile.followers}

                            </div>

                            <div class="stat-label">

                                Followers

                            </div>

                        </div>


                        <div class="stat">

                            <div class="stat-number">

                                ${profile.following}

                            </div>

                            <div class="stat-label">

                                Following

                            </div>

                        </div>


                    </div>


                </div>

            </div>

        `;



        // ==========================================
        // REPOSITORIES SECTION
        // ==========================================

        html += `

            <section class="dashboard-section">

                <div class="section-heading">

                    <h3 class="section-title">

                        Recent work

                    </h3>

                    <div class="section-icon">

                        ♢

                    </div>

                </div>


                <div class="repo-grid">

        `;


        if (recentRepos.length === 0) {

            html += `

                <p>
                    No public repositories found.
                </p>

            `;

        } else {

            recentRepos.forEach((repo) => {

                html += `

                    <article class="repo-card">


                        <a
                            href="${repo.html_url}"
                            target="_blank"
                            class="repo-name"
                        >

                            ${repo.name}

                        </a>


                        <p class="repo-description">

                            ${
                                repo.description ||
                                "No description available for this project."
                            }

                        </p>


                        <div class="repo-footer">


                            <span class="language">

                                ${
                                    repo.language ||
                                    "Code"
                                }

                            </span>


                            <span class="stars">

                                ★ ${repo.stargazers_count}

                            </span>


                        </div>


                    </article>

                `;

            });

        }


        html += `

                </div>

            </section>

        `;



        // ==========================================
        // FOLLOWERS SECTION
        // ==========================================

        html += `

            <section class="dashboard-section">

                <div class="section-heading">

                    <h3 class="section-title">

                        Recent followers

                    </h3>

                    <div class="section-icon">

                        ♡

                    </div>

                </div>


                <div class="followers-card">

                    <div class="follower-list">

        `;


        if (recentFollowers.length === 0) {

            html += `

                <p>
                    No followers found.
                </p>

            `;

        } else {

            recentFollowers.forEach((follower) => {

                html += `

                    <div class="follower">

                        <img
                            src="${follower.avatar_url}"
                            alt="${follower.login}"
                        >

                        <p>

                            @${follower.login}

                        </p>

                    </div>

                `;

            });

        }


        html += `

                    </div>

                </div>

            </section>

        `;



        // ==========================================
        // INJECT COMPLETE DASHBOARD
        // ==========================================

        dashboardContainer.innerHTML = html;



    } catch (error) {


        // ==========================================
        // ERROR STATE
        // ==========================================

        dashboardContainer.innerHTML = `

            <div class="error-state">

                <div class="empty-flower">
                    ✿
                </div>

                <h2>
                    Dashboard unavailable
                </h2>

                <p>

                    ${
                        error.message ||
                        "Something went wrong. Please try again."
                    }

                </p>

            </div>

        `;


    }

}



// ==========================================
// DEBOUNCED SEARCH
// ==========================================

const debouncedSearch = debounce(

    renderDashboard,

    600

);


searchInput.addEventListener(

    "input",

    debouncedSearch

);