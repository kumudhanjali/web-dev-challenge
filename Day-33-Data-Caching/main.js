/* ========================================== */
/* DAY 33: DATA CACHING                       */
/* ========================================== */

import { fetchUserData } from "./api.js";


const usernameInput =
    document.getElementById("username");

const searchBtn =
    document.getElementById("searchBtn");

const userContainer =
    document.getElementById("user-container");

const message =
    document.getElementById("message");


async function searchUser() {

    const username =
        usernameInput.value.trim();


    if (!username) {

        message.textContent =
            "Please enter a username.";

        return;
    }


    message.textContent = "Loading...";

    userContainer.innerHTML = "";


    try {

        const user =
            await fetchUserData(username);


        userContainer.innerHTML = `

            <div class="user-card">

                <img
                    src="${user.avatar_url}"
                    alt="${user.login}"
                >

                <h2>
                    ${user.name || user.login}
                </h2>

                <p>
                    @${user.login}
                </p>

                <p>
                    ${user.bio || "No bio available."}
                </p>

                <p>
                    Followers: ${user.followers}
                </p>

                <p>
                    Following: ${user.following}
                </p>

                <p>
                    Public Repos: ${user.public_repos}
                </p>

                <a
                    href="${user.html_url}"
                    target="_blank"
                >
                    View GitHub Profile
                </a>

            </div>

        `;


        message.textContent =
            "User loaded successfully.";

    } catch (error) {

        message.textContent =
            error.message;

    }
}


searchBtn.addEventListener(
    "click",
    searchUser
);


usernameInput.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Enter") {

            searchUser();

        }

    }
);


console.log(
    "Day 33: Client-Side Data Caching Initialized."
);