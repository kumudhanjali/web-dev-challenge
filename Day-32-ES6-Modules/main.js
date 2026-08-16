/* ========================================== */
/* DAY 32: ES6 MODULES                       */
/* main.js: Application Engine               */
/* ========================================== */


/* ==========================================
   IMPORT MODULES
   ========================================== */

/*
    Named imports
*/

import {
    debounce,
    createPostCard
} from "./utils.js";


/*
    Default import

    This demonstrates the Day 32 bonus
    challenge using export default.
*/

import fetchPosts from "./api.js";


/* ==========================================
   DOM ELEMENTS
   ========================================== */

const feedContainer =
    document.getElementById("data-feed");

const sentinel =
    document.getElementById("scroll-sentinel");


/* ==========================================
   STATE VARIABLES
   ========================================== */

/*
    Start from page 1.
*/

let currentPage = 1;


/*
    Number of posts requested per page.
*/

const limit = 10;


/*
    Prevent multiple API requests
    from happening simultaneously.
*/

let isLoading = false;


/*
    Keeps track of whether more data exists.
*/

let hasMoreData = true;


/* ==========================================
   FETCH NEXT PAGE
   ========================================== */

async function fetchNextPage() {

    /*
        State lock.

        Do not start another request if
        one is already running.

        Also stop if there is no more data.
    */

    if (isLoading || !hasMoreData) {

        return;

    }


    /*
        Lock the request.
    */

    isLoading = true;


    /*
        Show loading state.
    */

    sentinel.innerHTML = `

        <span class="spinner"></span>

        <span>Loading more...</span>

    `;


    try {

        /* ==================================
           FETCH DATA FROM API MODULE
           ================================== */

        const data =
            await fetchPosts(currentPage, limit);


        /* ==================================
           CHECK FOR END OF DATA
           ================================== */

        if (data.length === 0) {

            /*
                No more posts exist.
            */

            hasMoreData = false;


            /*
                Stop observing the sentinel.
            */

            observer.disconnect();


            /*
                Show end message.
            */

            sentinel.innerHTML = `

                <span class="end-message">
                    You've reached the end! 🎉
                </span>

            `;


            return;

        }


        /* ==================================
           RENDER POSTS
           ================================== */

        data.forEach(post => {

            /*
                createPostCard() comes from
                utils.js.
            */

            const card =
                createPostCard(post);


            /*
                Append without deleting
                previously loaded posts.
            */

            feedContainer.appendChild(card);

        });


        /* ==================================
           MOVE TO NEXT PAGE
           ================================== */

        currentPage++;


    }


    /* ======================================
       ERROR HANDLING
       ====================================== */

    catch (error) {

        console.error(
            "Pagination Error:",
            error
        );


        sentinel.innerHTML = `

            <span class="error-message">
                Failed to load posts.
                Please try again.
            </span>

        `;

    }


    /* ======================================
       FINALLY
       ====================================== */

    finally {

        /*
            Unlock the request.
        */

        isLoading = false;

    }

}


/* ==========================================
   INTERSECTION OBSERVER
   ========================================== */

const observer = new IntersectionObserver(

    (entries) => {

        entries.forEach(entry => {

            /*
                Check if sentinel is visible.
            */

            if (entry.isIntersecting) {

                fetchNextPage();

            }

        });

    },


    {
        /*
            Start loading slightly before
            the user reaches the bottom.
        */

        rootMargin: "100px"

    }

);


/* ==========================================
   BONUS: DEBOUNCED STATUS FUNCTION
   ========================================== */

/*
    We already learned debounce in Day 28.

    Here we import and use the same utility
    from utils.js.

    This demonstrates that utilities can
    be reused across the application.
*/

const logScrollActivity = debounce(() => {

    console.log(
        "Infinite Scroll is active."
    );

}, 500);


/*
    Listen for scrolling.

    The event itself is kept in main.js
    because it belongs to UI/application
    behavior.
*/

window.addEventListener(
    "scroll",
    logScrollActivity
);


/* ==========================================
   INITIAL LOAD
   ========================================== */

/*
    Load the first page.
*/

fetchNextPage();


/*
    Start watching the sentinel.
*/

observer.observe(sentinel);


/* ==========================================
   INITIALIZATION MESSAGE
   ========================================== */

console.log(
    "Day 32: ES6 Modular Architecture Initialized."
);