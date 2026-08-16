/* ========================================== */
/* DAY 32: ES6 MODULES                       */
/* api.js: Network Requests                  */
/* ========================================== */


/* ==========================================
   API CONFIGURATION
   ========================================== */

const API_URL =
    "https://jsonplaceholder.typicode.com/posts";


/* ==========================================
   FETCH PAGINATED POSTS
   ========================================== */

/*
    This function is responsible ONLY for
    communicating with the API.

    It does not touch the DOM.

    It returns the data to main.js.
*/

export async function fetchPosts(page, limit = 10) {

    const response = await fetch(
        `${API_URL}?_page=${page}&_limit=${limit}`
    );


    /* ======================================
       RESPONSE CHECK
       ====================================== */

    if (!response.ok) {

        throw new Error(
            "Failed to fetch posts."
        );

    }


    /* ======================================
       CONVERT RESPONSE TO JSON
       ====================================== */

    const data = await response.json();


    /*
        Return the posts to main.js
    */

    return data;

}


/* ==========================================
   DEFAULT EXPORT — BONUS CHALLENGE
   ========================================== */

/*
    Day 32 bonus challenge:

    We also provide a default export.

    This demonstrates that a module can have
    a primary/default export in addition to
    named exports.

    main.js will import this as:

    import fetchPostsDefault from "./api.js";
*/

export default fetchPosts;