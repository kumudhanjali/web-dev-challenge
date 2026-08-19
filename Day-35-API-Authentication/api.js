/* ========================================== */
/* DAY 35: API AUTHENTICATION                 */
/* ========================================== */

import { fetchWithRetry } from "./utils.js";


const API_URL =
    "https://jsonplaceholder.typicode.com/posts";


/* ========================================== */
/* AUTHENTICATION UTILITY                     */
/* BONUS CHALLENGE                            */
/* ========================================== */

export function getAuthHeaders() {

    const token =
        localStorage.getItem("auth_token");


    if (!token) {

        throw new Error(
            "Access Denied: No authentication token found."
        );

    }


    return {

        "Content-Type": "application/json",

        "Authorization":
            "Bearer " + token

    };

}


/* ========================================== */
/* SECURE DELETE                              */
/* ========================================== */

export async function secureDeleteResource(targetId) {

    const token =
        localStorage.getItem("auth_token");


    /* ====================================== */
    /* AUTHENTICATION GATEKEEPER              */
    /* ====================================== */

    if (!token) {

        throw new Error(
            "Access Denied: No authentication token found."
        );

    }


    console.log(
        `🔒 Secure deletion started for resource #${targetId}`
    );


    /* ====================================== */
    /* SECURE REQUEST                         */
    /* ====================================== */

    const response =
        await fetchWithRetry(
            `${API_URL}/${targetId}`,
            {
                method: "DELETE",

                headers: getAuthHeaders()
            }
        );


    /* ====================================== */
    /* 401 UNAUTHORIZED                       */
    /* ====================================== */

    if (response.status === 401) {

        localStorage.removeItem("auth_token");

        throw new Error(
            "Unauthorized: Session expired"
        );

    }


    /* ====================================== */
    /* 403 FORBIDDEN                          */
    /* ====================================== */

    if (response.status === 403) {

        throw new Error(
            "Forbidden: You do not have permission to delete this resource."
        );

    }


    /* ====================================== */
    /* OTHER SERVER ERRORS                    */
    /* ====================================== */

    if (!response.ok) {

        throw new Error(
            `Server Error: ${response.status}`
        );

    }


    console.log(
        `✅ Resource #${targetId} securely deleted.`
    );


    return true;

}