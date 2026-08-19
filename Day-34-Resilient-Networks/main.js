import { fetchUserData } from './api.js';

const usernameInput = document.getElementById('username');
const searchBtn = document.getElementById('searchBtn');
const status = document.getElementById('status');
const result = document.getElementById('result');


searchBtn.addEventListener('click', searchUser);


usernameInput.addEventListener('keydown', (event) => {

    if (event.key === 'Enter') {
        searchUser();
    }

});


async function searchUser() {

    const username = usernameInput.value.trim();

    if (!username) {

        status.textContent = 'Please enter a GitHub username ♡';

        usernameInput.focus();

        return;
    }


    searchBtn.disabled = true;

    result.innerHTML = '';

    status.textContent = 'Connecting to GitHub...';


    try {

        const user = await fetchUserData(username);

        status.textContent = 'Request successful ✦';


        result.innerHTML = `
            <div class="user-card">

                <img
                    src="${user.avatar_url}"
                    alt="${user.login}"
                >

                <h2>
                    ${user.name || user.login}
                </h2>

                <p class="username">
                    @${user.login}
                </p>

                <p class="bio">
                    ${user.bio || 'This user has not added a bio yet.'}
                </p>

                <div class="stats">

                    <div class="stat">
                        <strong>${user.followers}</strong>
                        Followers
                    </div>

                    <div class="stat">
                        <strong>${user.following}</strong>
                        Following
                    </div>

                    <div class="stat">
                        <strong>${user.public_repos}</strong>
                        Repositories
                    </div>

                </div>

            </div>
        `;

    } catch (error) {

        console.error(error);

        status.textContent = 'Something went wrong ♡';


        result.innerHTML = `
            <div class="error-card">

                <span class="error-icon">☁</span>

                <strong>
                    We couldn't complete the request.
                </strong>

                <br>

                <span>
                    ${error.message}
                </span>

            </div>
        `;

    } finally {

        searchBtn.disabled = false;

    }

}