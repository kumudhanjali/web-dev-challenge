/* ========================================== */
/* DAY 31: DATA SCALING                       */
/* PAGINATION & INFINITE SCROLL               */
/* ========================================== */


/* ==========================================
   DOM ELEMENTS
   ========================================== */

const feedContainer = document.getElementById("data-feed");

const sentinel = document.getElementById("scroll-sentinel");


/* ==========================================
   STATE VARIABLES
   ========================================== */

// Start from page 1
let currentPage = 1;


// Number of posts requested per page
const limit = 10;


// Prevent multiple API requests
// from happening at the same time
let isLoading = false;


// BONUS CHALLENGE
// Keeps track of whether more data exists
let hasMoreData = true;


/* ==========================================
   FETCH NEXT PAGE
   ========================================== */

async function fetchNextPage() {

    /*
        State lock

        If a request is already running,
        don't start another request.

        Also stop if there is no more data.
    */

    if (isLoading || !hasMoreData) {
        return;
    }


    // Lock the request
    isLoading = true;


    try {

        /* ======================================
           FETCH PAGINATED API DATA
           ====================================== */

        const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${limit}`
        );


        /* ======================================
           CHECK RESPONSE
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


        /* ======================================
           BONUS CHALLENGE
           CHECK IF WE REACHED THE END
           ====================================== */

        if (data.length === 0) {

            // No more posts
            hasMoreData = false;


            // Stop observing the sentinel
            observer.disconnect();


            // Change loading message
            sentinel.innerHTML = `
                <span class="end-message">
                    You've reached the end!
                </span>
            `;


            return;
        }


        /* ======================================
           RENDER POSTS
           ====================================== */

        data.forEach(post => {

            // Create a new article
            const card = document.createElement("article");


            // Add CSS class
            card.className = "feed-card";


            /*
                Create the post content
            */

            card.innerHTML = `

                <div class="feed-number">
                    POST #${post.id}
                </div>

                <h2>
                    ${post.title}
                </h2>

                <p>
                    ${post.body}
                </p>

            `;


            /*
                IMPORTANT:

                appendChild() adds the new post
                without deleting previous posts.
            */

            feedContainer.appendChild(card);

        });


    }


    /* ==========================================
       ERROR HANDLING
       ========================================== */

    catch (error) {

        console.error(
            "Pagination Error:",
            error
        );


        sentinel.innerHTML = `
            <span class="error-message">
                Failed to load posts. Please try again.
            </span>
        `;

    }


    /* ==========================================
       FINALLY
       ========================================== */

    finally {

        /*
            Unlock the request.

            This allows another request when
            the user reaches the bottom again.
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
                Check if the sentinel is visible
            */

            if (entry.isIntersecting) {


                /*
                    Move to the next page
                */

                currentPage++;


                /*
                    Fetch the next 10 posts
                */

                fetchNextPage();

            }

        });

    },


    {
        /*
            Start loading slightly before
            the user reaches the very bottom.
        */

        rootMargin: "100px"

    }

);


/* ==========================================
   INITIAL LOAD
   ========================================== */


/*
    Load the first 10 posts
*/

fetchNextPage();


/*
    Start watching the sentinel
*/

observer.observe(sentinel);