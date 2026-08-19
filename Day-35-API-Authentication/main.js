/* ========================================== */
/* DAY 35: SECURE API CONSOLE                 */
/* ========================================== */

import {
    secureDeleteResource
} from "./api.js";


/* ========================================== */
/* ELEMENTS                                   */
/* ========================================== */

const loginBtn =
    document.getElementById("loginBtn");

const logoutBtn =
    document.getElementById("logoutBtn");

const deleteBtn =
    document.getElementById("deleteBtn");

const clearLogBtn =
    document.getElementById("clearLogBtn");

const resourceId =
    document.getElementById("resourceId");

const previewId =
    document.getElementById("previewId");

const tokenDisplay =
    document.getElementById("tokenDisplay");

const tokenState =
    document.getElementById("tokenState");

const sessionStatus =
    document.getElementById("sessionStatus");

const statusDot =
    document.getElementById("statusDot");

const activityLog =
    document.getElementById("activityLog");


/* ========================================== */
/* MOCK TOKEN                                 */
/* ========================================== */

const MOCK_TOKEN =
    "mock_jwt_12345";


/* ========================================== */
/* LOGGING                                    */
/* ========================================== */

function addLog(message, type = "info") {

    const entry =
        document.createElement("div");

    entry.className =
        `log-entry ${type}`;

    entry.innerHTML = `
        <span class="log-icon">●</span>
        <span>${message}</span>
    `;

    activityLog.prepend(entry);

}


/* ========================================== */
/* SESSION UI                                 */
/* ========================================== */

function updateSessionUI() {

    const token =
        localStorage.getItem("auth_token");


    if (token) {

        statusDot.classList.add("active");

        sessionStatus.textContent =
            "Authenticated session is active.";

        tokenState.textContent =
            "ACTIVE";

        tokenState.classList.add("active");

        tokenDisplay.textContent =
            token;

    } else {

        statusDot.classList.remove("active");

        sessionStatus.textContent =
            "No authenticated session found.";

        tokenState.textContent =
            "NOT FOUND";

        tokenState.classList.remove("active");

        tokenDisplay.textContent =
            "No token stored";

    }

}


/* ========================================== */
/* LOGIN / ADD TOKEN                          */
/* ========================================== */

loginBtn.addEventListener(
    "click",
    () => {

        localStorage.setItem(
            "auth_token",
            MOCK_TOKEN
        );


        updateSessionUI();


        addLog(
            "Mock authentication token stored in LocalStorage.",
            "success"
        );

    }
);


/* ========================================== */
/* LOGOUT / REMOVE TOKEN                      */
/* ========================================== */

logoutBtn.addEventListener(
    "click",
    () => {

        localStorage.removeItem(
            "auth_token"
        );


        updateSessionUI();


        addLog(
            "Authentication token removed. Session locked.",
            "info"
        );

    }
);


/* ========================================== */
/* RESOURCE ID PREVIEW                        */
/* ========================================== */

resourceId.addEventListener(
    "input",
    () => {

        previewId.textContent =
            resourceId.value || "1";

    }
);


/* ========================================== */
/* SECURE DELETE                              */
/* ========================================== */

deleteBtn.addEventListener(
    "click",
    async () => {

        const id =
            resourceId.value.trim();


        if (!id) {

            addLog(
                "Please enter a resource ID.",
                "error"
            );

            return;

        }


        deleteBtn.disabled = true;

        deleteBtn.textContent =
            "Authenticating...";


        addLog(
            `Attempting secure DELETE for resource #${id}...`,
            "info"
        );


        try {

            const token =
                localStorage.getItem(
                    "auth_token"
                );


            if (!token) {

                throw new Error(
                    "Access Denied: No authentication token found."
                );

            }


            addLog(
                "Bearer token detected. Building Authorization header...",
                "info"
            );


            await secureDeleteResource(id);


            addLog(
                `Resource #${id} deleted successfully with authenticated request.`,
                "success"
            );


            addLog(
                "Authorization: Bearer token attached ✓",
                "success"
            );


        } catch (error) {

            addLog(
                error.message,
                "error"
            );

        } finally {

            deleteBtn.disabled = false;

            deleteBtn.textContent =
                "Secure Delete";

            updateSessionUI();

        }

    }
);


/* ========================================== */
/* CLEAR LOG                                  */
/* ========================================== */

clearLogBtn.addEventListener(
    "click",
    () => {

        activityLog.innerHTML = "";

        addLog(
            "Activity log cleared.",
            "info"
        );

    }
);


/* ========================================== */
/* INITIAL STATE                              */
/* ========================================== */

updateSessionUI();