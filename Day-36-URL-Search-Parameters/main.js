import { debounce } from "./utils.js";
import { fetchUserData } from "./api.js";


const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");
const profileContainer = document.querySelector("#profile-container");


async function handleSearch(username) {

    username = username.trim();

    if (!username) {
        clearURL();

        profileContainer.innerHTML = `
            <div class="empty-state">

                <div class="empty-flower">❀</div>

                <h2>Who are we looking for?</h2>

                <p>
                    Enter a GitHub username above to discover their profile.
                </p>

            </div>
        `;

        return;
    }


    updateURL(username);

    showLoading();


    try {

        const user = await fetchUserData(username);

        displayUser(user);

    } catch (error) {

        showError();

    }

}


function updateURL(username) {

    const url = new URL(window.location);

    url.searchParams.set("user", username);

    window.history.pushState(
        {},
        "",
        url
    );

}


function clearURL() {

    const url = new URL(window.location);

    url.searchParams.delete("user");

    window.history.pushState(
        {},
        "",
        url
    );

}


function showLoading() {

    profileContainer.innerHTML = `
        <div class="loading">

            <div class="loading-flower">✿</div>

            <p>Finding that developer...</p>

        </div>
    `;

}


function showError() {

    profileContainer.innerHTML = `
        <div class="error">

            <div class="empty-flower">✿</div>

            <h2>User not found</h2>

            <p>
                We couldn't find that GitHub profile.
                Try checking the username and searching again.
            </p>

        </div>
    `;

}


function displayUser(user) {

    const name = user.name || user.login;

    const bio = user.bio ||
        "This developer hasn't added a bio yet.";

    const location = user.location || "Location not listed";

    const company = user.company || "Independent developer";


    profileContainer.innerHTML = `

        <article class="profile-card">

            <div class="profile-top">

                <img
                    src="${user.avatar_url}"
                    alt="${name}"
                    class="avatar"
                >

                <div class="profile-info">

                    <h2 class="profile-name">
                        ${name}
                    </h2>

                    <p class="username">
                        @${user.login}
                    </p>

                    <p class="bio">
                        ${bio}
                    </p>

                </div>

            </div>


            <div class="stats">

                <div class="stat">

                    <div class="stat-number">
                        ${user.public_repos}
                    </div>

                    <div class="stat-label">
                        Repositories
                    </div>

                </div>


                <div class="stat">

                    <div class="stat-number">
                        ${user.followers}
                    </div>

                    <div class="stat-label">
                        Followers
                    </div>

                </div>


                <div class="stat">

                    <div class="stat-number">
                        ${user.following}
                    </div>

                    <div class="stat-label">
                        Following
                    </div>

                </div>

            </div>


            <div class="details">

                <div class="detail">
                    📍 ${location}
                </div>

                <div class="detail">
                    💼 ${company}
                </div>

            </div>


            <a
                href="${user.html_url}"
                target="_blank"
                class="github-link"
            >
                View GitHub Profile →
            </a>

        </article>

    `;

}


const debouncedSearch = debounce((username) => {

    handleSearch(username);

}, 500);


searchInput.addEventListener("input", (event) => {

    const username = event.target.value;

    debouncedSearch(username);

});


searchButton.addEventListener("click", () => {

    handleSearch(searchInput.value);

});


searchInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        handleSearch(searchInput.value);

    }

});


function initApp() {

    const params = new URLSearchParams(
        window.location.search
    );

    const usernameFromURL = params.get("user");


    if (usernameFromURL) {

        searchInput.value = usernameFromURL;

        handleSearch(usernameFromURL);

    }

}


initApp();